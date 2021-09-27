'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Watchlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Watchlist.belongsTo(models.Movie, { foreignKey: "movieId", sourceKey: "id" })
      Watchlist.belongsTo(models.User, { foreignKey: "userId", sourceKey: "id" })
    }
  };
  Watchlist.init({
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Watchlist',
  });
  return Watchlist;
};