/**
 * Sequelize Mod
 *
 * el's definition documentation
 * @see https://sequelize.org/master/manual/models-definition.html
 */
/** Sequelize Model's usage documentation
 * @see https://sequelize.org/master/manual/models-usage.html
 * */
module.exports = (sequelize, DataTypes) => sequelize.define(
  'Group',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      required: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
      {
        unique: true,
        fields: ['name']
      }
    ]
  }
);
