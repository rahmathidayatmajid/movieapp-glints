'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie_Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie_Info.belongsTo(models.Movie, { foreignKey: "movieId", targetKey: "id" } );
    }
  };
  Movie_Info.init({
    release_date: DataTypes.STRING,
    budget: DataTypes.STRING,
    director: DataTypes.STRING,
    featured_song: DataTypes.STRING,
    movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie_Info',
  });
  return Movie_Info;
};