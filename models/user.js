'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Review, { foreignKey: 'userId', sourceKey: 'id' })
      User.hasMany(models.Watchlist, { foreignKey: 'userId', sourceKey: 'id' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    profilePict: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};