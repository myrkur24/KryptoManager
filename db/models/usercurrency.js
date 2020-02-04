'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCurrency = sequelize.define('UserCurrency', {
    personId: DataTypes.INTEGER,
    currencyId: DataTypes.INTEGER
  }, {});
  UserCurrency.associate = function (models) {
    // associations can be defined here
  };
  return UserCurrency;
};