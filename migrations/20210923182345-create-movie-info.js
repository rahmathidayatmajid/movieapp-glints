'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movie_Infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      release_date: {
        type: Sequelize.STRING
      },
      budget: {
        type: Sequelize.STRING
      },
      director: {
        type: Sequelize.STRING
      },
      featured_song: {
        type: Sequelize.STRING
      },
      movieId: {
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movie_Infos');
  }
};