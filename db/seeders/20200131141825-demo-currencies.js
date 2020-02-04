'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Currencies', [{
      code: 'USD',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'COP',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'EUR',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Currencies', null, {});
  }
};
