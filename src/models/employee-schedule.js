module.exports = function (sequelize, DataTypes) {
  const EmployeeSchedule = sequelize.define('EmployeeSchedule', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
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
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The schedule is required.'
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
        name: 'employee_schedules_employeeId_fk',
        using: 'BTREE',
        fields: [
          { name: 'employeeId' }
        ]
      },
      {
        name: 'employee_schedules_scheduleId_fk',
        using: 'BTREE',
        fields: [
          { name: 'scheduleId' }
        ]
      }
    ]
  })

  EmployeeSchedule.associate = function (models) {
    EmployeeSchedule.belongsTo(models.Employee, { as: 'employee', foreignKey: 'employeeId' })
    EmployeeSchedule.belongsTo(models.Schedule, { as: 'schedule', foreignKey: 'scheduleId' })
  }

  return EmployeeSchedule
}