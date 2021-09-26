'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieCategory.belongsTo(models.Movie, { foreignKey: "movieId", sourceKey: "id" })
      MovieCategory.belongsTo(models.Category, { foreignKey: "categoryId", sourceKey: "id" })
    }
  };
  MovieCategory.init({
    movieId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MovieCategory',
  });
  return MovieCategory;
};