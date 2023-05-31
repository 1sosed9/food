const Config = require('./config');
const mysql = require('mysql');

const dbConfig = Config.readConfig().database;
const db = mysql.createConnection(dbConfig);

function connect(onSuccess) {
  db.connect(function(err) {
    if (err) throw err;
    console.log("MySQL connected successfully.");
    onSuccess();
  });
}

function runSQLQuery(sql) {
  return new Promise((onSuccess, onFailure) => {
    db.query(sql, (err, result) => {
      if (err) {
        onFailure(err);
        return;
      }
      onSuccess(result);
    });
  });
}

function mapObjectKeysToSQLColumns(keys) {
  return keys.map((k) => ('`' + k + '`'));
}

function mapObjectValuesToSQLValues(values) {
  return values.map(el => ((typeof el === 'string') ? ('\'' + el + '\'') : el));
}

function insertIntoTable(table, ojb) {
  const tableName = dbConfig.database + '.' + table;

  const columns = mapObjectKeysToSQLColumns(Object.keys(ojb)).join(', ');
  const values  = mapObjectValuesToSQLValues(Object.values(ojb)).join(', ');

  return runSQLQuery('INSERT INTO ' + tableName + '(' + columns + ') VALUES (' + values + ');');
}

function selectFromTable(table, condition, callback) {
  const tableName = dbConfig.database + '.' + table;
  let sql = 'SELECT * FROM ' + tableName;

  if (condition && typeof condition === 'object' && Object.keys(condition).length) {
    const columns = mapObjectKeysToSQLColumns(Object.keys(condition));
    const values  = mapObjectValuesToSQLValues(Object.values(condition));

    sql += ' ' + columns.map((k, idx) => ('WHERE ' + k + ' = ' + values[idx])).join(' AND ');
  }

  return runSQLQuery(sql + ';')
    .then((res) => callback(null, res))
    .catch((err) => callback(err));
}

module.exports = { connect, insertIntoTable, selectFromTable }
