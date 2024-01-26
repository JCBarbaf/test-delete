module.exports = function (sequelize, DataTypes) {
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    lastnames: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The lastnames are required.'
        }
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The surname is required.'
        }
      }
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The department is required.'
        }
      }
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The rol is required.'
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
        name: 'employees_departmentId_fk',
        using: 'BTREE',
        fields: [
          { name: 'departmentId' }
        ]
      }
    ]
  })

  Employee.associate = function (models) {
    Employee.belongsTo(models.Department, { as: 'department', foreignKey: 'departmentId' })
    Employee.hasMany(models.Employeeshift, { as: 'employeeshifts', foreignKey: 'employeeId' })
    Employee.hasMany(models.PunchIn, { as: 'punchIns', foreignKey: 'employeeId' })
    Employee.belongsToMany(models.shift, { through: models.Employeeshift, as: 'shifts', foreignKey: 'employeeId' })
  }

  return Employee
}