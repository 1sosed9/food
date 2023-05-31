const fs = require('fs');
const path = require('path');

const DB = require('./database');


function seedData() {
  const restaurantMenus = fs.readdirSync('./resources');

  let seedInstructions = [];
  for (const menuFile of restaurantMenus) {
    const menuItems = JSON.parse(fs.readFileSync('./resources/' + menuFile, 'utf-8'));
    const restaurant = path.basename(menuFile, path.extname(menuFile));
    const queryInstructions = menuItems.map(item => {
      const insertRow = { restaurant, name: item.name, img: item.img, price: item.price };
      return DB.insertIntoTable('restaurants', insertRow);
    });
    seedInstructions = seedInstructions.concat(queryInstructions);
  }

  return Promise.all(seedInstructions);
}

DB.connect(() => {
  seedData().then(() => {
    console.log('Migrations Done!')
    process.exit();
  }).catch((err) => {
    console.error('Migrations Failed: ' + err.message);
    process.exit(1);
  });
});
