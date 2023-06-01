const sequelize = require('../config/connections');
const { User, Post, Comment } = require('../models');

const usersData = require('./userData.json');
const blogPostData = require('./PostData.json');
const commentsData = require('./CommentsData.json');

const seedDatabase = async () => {
  console.log("IN PROGRESS");
  await sequelize.sync({ force: true });
  console.log("SYNC");

  await User.bulkCreate(usersData, {
    individualHooks: true,
    returning: true,
  });
  console.log("USERS CREATED");

  await Post.bulkCreate(blogPostData);
  console.log("BLOGS CREATED");

  await Comment.bulkCreate(commentsData, {
    returning: true,
  });
  console.log("COMMENTS CREATED");

  process.exit(0);
};

seedDatabase();