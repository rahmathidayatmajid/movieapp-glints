'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCharacter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        MovieCharacter.belongsTo(models.Movie, { foreignKey: "movieId", sourceKey: "id" })
        MovieCharacter.belongsTo(models.Character, { foreignKey: "characterId", sourceKey: "id" })
    }
  };
  MovieCharacter.init({
    movieId: DataTypes.INTEGER,
    characterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MovieCharacter',
  });
  
  return MovieCharacter;
};