'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
      	allowNull: false,
        type: Sequelize.STRING
      },
      auteur: {
      	allowNull: false,
        type: Sequelize.STRING
      },
      date: {
      	allowNull: false,
        type: Sequelize.DATE
      },
      categorie: {
      	allowNull: false,
        type: Sequelize.STRING
      },
      tags: {
      	allowNull: false,
        type: Sequelize.STRING
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Articles');
  }
};
