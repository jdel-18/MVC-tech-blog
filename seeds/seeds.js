const sequelize = require('../config/connection');
const { Users, BlogPost, Comments } = require('../models');

const usersData = require('./usersData.json');
const blogPostData = require('./PostData.json');
const CommentsData = require('./CommentsData.json')

const seedDatabase = async () => {
  console.log(" IN PROGRESS ")
  await sequelize.sync({ force: true });
console.log(" SYNC ")
await Users.bulkCreate(usersData, {
    individualHooks: true,
    returning: true,
  });
  console.log(" USERS CREATED ")

  await BlogPost.bulkCreate(blogPostData)
  console.log(" BLOGS CREATED ")
 await Comments.bulkCreate(CommentsData, {
    returning: true,
  });
  console.log(" COMMENTS CREATED ")
  process.exit(0);
};

seedDatabase();