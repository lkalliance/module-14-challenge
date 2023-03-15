const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedPost = require('./postData');
const seedComment = require('./commentData')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedGallery();

  await seedPaintings();

  process.exit(0);
};

seedAll();
