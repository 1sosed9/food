const fs = require('fs');

function readConfig() {
  return JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
}

module.exports = { readConfig };
