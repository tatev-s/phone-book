/**
 * Sequelize Mod
 *
 * el's definition documentation
 * @see https://sequelize.org/master/manual/models-definition.html
 */
/** Sequelize Model's usage documentation
 * @see https://sequelize.org/master/manual/models-usage.html
 * */
module.exports = (sequelize, DataTypes) => {
  const PhoneBook = sequelize.define(
    'PhoneBook',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        required: true,
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName: {
        required: true,
        allowNull: false,
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
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
          fields: ['firstName', 'lastName']
        },
        {
          unique: true,
          fields: ['phoneNumber']
        }
      ]
    }
  );

  PhoneBook.associate = (models) => {
    PhoneBook.belongsToMany(models.Group, {
      through: 'PhoneBookGroups',
      as: 'groups',
      foreignKey: 'phoneBookId',
      otherKey: 'groupId'
    });
  };
  return PhoneBook;
};
