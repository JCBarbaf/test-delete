'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('punch_ins', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      machineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'punch_in_machines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      // Si el fichaje ha sido de salida o de entrada
      action: {
        type: Sequelize.STRING,
        allowNull: false
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
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
    await queryInterface.addIndex('punch_ins', ['employeeId'], {
      name: 'punch_ins_employeeId_fk'
    })
    await queryInterface.addIndex('punch_ins', ['machineId'], {
      name: 'punch_ins_machineId_fk'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('punch_ins')
  }
}
