'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      coursesId: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex(
      'Likes',{
        fields: ['coursesId']
      })
    await queryInterface.addIndex(
      'Likes', {
        fields: ['userId']
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }
};