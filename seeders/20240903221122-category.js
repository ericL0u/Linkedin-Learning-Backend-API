'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Categories', [
      {name: "react", rank: 1, createdAt: new Date(), updatedAt:new Date()},
      {name: "express", rank: 2, createdAt: new Date(), updatedAt:new Date()},
      {name: "react native", rank: 3, createdAt: new Date(), updatedAt:new Date()},
      {name: "mysql", rank: 4, createdAt: new Date(), updatedAt:new Date()},
      {name: "nodemon", rank: 5, createdAt: new Date(), updatedAt:new Date()},
      {name: "sequelize", rank: 6, createdAt: new Date(), updatedAt:new Date()},
    
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
