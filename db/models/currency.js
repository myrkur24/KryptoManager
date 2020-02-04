'use strict';
module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define('Currency', {
    code: { type: DataTypes.STRING, allowNull: false },
  }, {});
  Currency.associate = function(models) {
    // associations can be defined here
  };
  return Currency;
};