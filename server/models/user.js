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
  role: {
    type: DataTypes.ENUM({
      values: ['ADMIN', 'USER', 'AMBASADOR', 'SUPERADMIN', 'BONUS']
    }),
    defaultValue: 'USER',
  }
});

User.associate = (models) => {
  User.hasMany(models.Transactions, {
    onDelete: 'CASCADE',
  });
  User.hasOne(models.Wallets, {
    onDelete: 'CASCADE',
  });
  User.hasOne(models.Profiles, {
    onDelete: 'CASCADE',
  });
  User.hasMany(models.Cards, {
    onDelete: 'CASCADE',
  });
  User.hasMany(models.CardTypes,{
    onDelete: 'CASCADE',
  });
  User.hasMany(models.CardFees,{
    onDelete: 'CASCADE',
  });
  User.hasMany(models.GiftCards,{
    onDelete: 'CASCADE',
  });
};

/* User.beforeCreate((user, _ ) => {
  return user.id = uuid.v4();
}) */

return User;
};
