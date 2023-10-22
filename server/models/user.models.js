'use strict';
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('Users', {
  id: {
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    type: DataTypes.UUID,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kyc: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull:  false,
  },
  activationLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM({
      values: ['admin', 'user', 'superadmin']
    }),
    defaultValue: 'USER',
  },
});

User.associate = (models) => {
  User.hasOne(models.Profiles, {
    onDelete: 'CASCADE',
  });
};

/* User.beforeCreate((user, _ ) => {
  return user.id = uuid.v4();
}) */

return User;
};
