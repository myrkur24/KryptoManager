'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCrypto = sequelize.define('UserCrypto', {
    personId: DataTypes.INTEGER,
    cryptoId: { type: DataTypes.STRING, allowNull: false }
  }, {});
  UserCrypto.associate = function(models) {
    // associations can be defined here
  };
  return UserCrypto;
};