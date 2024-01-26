module.exports = function (sequelize, DataTypes) {
  const PunchIn = sequelize.define('PunchIn', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    machineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The machine is required.'
        }
      }
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The employee is required.'
        }
      }
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The action is required.'
        }
      }
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The time is required.'
        }
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The date is required.'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  }, {
    sequelize,
    tableName: 'dial_codes',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'punch_ins_employeeId_fk',
        using: 'BTREE',
        fields: [
          { name: 'employeeId' }
        ]
      },
      {
        name: 'punch_ins_machineId_fk',
        using: 'BTREE',
        fields: [
          { name: 'machineId' }
        ]
      }
    ]
  })

  PunchIn.associate = function (models) {
    PunchIn.belongsTo(models.Employee, { as: 'employee', foreignKey: 'employeeId' })
    PunchIn.belongsTo(models.PunchInMachine, { as: 'machine', foreignKey: 'machineId' })
  }

  return PunchIn
}