module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
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
    wallet_id: {
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
      allowNull:  true,
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
      onDelete: 'cascade',
    });
    User.hasOne(models.Wallet, {
      onDelete: 'cascade',
    });
    User.hasOne(models.Profiles, {
      onDelete: 'cascade',
    });
    User.hasMany(models.Card, {
      onDelete: 'cascade',
    });
    User.hasMany(models.CardType,{
      onDelete: 'cascade',
    });
    User.hasMany(models.CardFee,{
      onDelete: 'cascade',
    });
  };

  return User;
};
