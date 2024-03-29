module.exports = function (sequelize, DataTypes) {
  const Employeeshift = sequelize.define('Employeeshift', {
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
    shiftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The shift is required.'
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
        name: 'employee_shifts_employeeId_fk',
        using: 'BTREE',
        fields: [
          { name: 'employeeId' }
        ]
      },
      {
        name: 'employee_shifts_shiftId_fk',
        using: 'BTREE',
        fields: [
          { name: 'shiftId' }
        ]
      }
    ]
  })

  Employeeshift.associate = function (models) {
    Employeeshift.belongsTo(models.Employee, { as: 'employee', foreignKey: 'employeeId' })
    Employeeshift.belongsTo(models.shift, { as: 'shift', foreignKey: 'shiftId' })
  }

  return Employeeshift
}