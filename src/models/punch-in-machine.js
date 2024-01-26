module.exports = function (sequelize, DataTypes) {
  const PunchInMachine = sequelize.define('PunchInMachine', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      default: 1
    },
    lastChecked: {
      type: DataTypes.DATE
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
      }
    ]
  })

  PunchInMachine.associate = function (models) {
    PunchInMachine.hasMany(models.PunchIn, { as: 'punchIns', foreignKey: 'machineId' })
  }

  return PunchInMachine
}