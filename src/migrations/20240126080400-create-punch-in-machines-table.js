'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('punch_in_machines', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN,
        default: 1
      },
      lastChecked: {
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('punch_in_machines')
  }
}