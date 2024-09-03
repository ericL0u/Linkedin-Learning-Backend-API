'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chapters', {
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
      title: {
        allowNull:false,
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      video: {
        type: Sequelize.STRING  
      },
      rank: {
        allowNull:false,
        defaultValue:1,
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
      'Chapters',{
        fields:['courseId']
      }
    )
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chapters');
  }
};