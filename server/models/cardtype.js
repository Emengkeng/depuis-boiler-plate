'use strict';
const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
  // What type of card does the user have
  // Is it premuim or standard, etc
const CardType = sequelize.define('CardTypes', {
    id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
    },
    name: {
        type: DataTypes.STRING, // card types can be premuim, standard, etc
        allowNull: false,
    },
    loadable: {
        type: DataTypes.INTEGER,    // Number of time you can load card
        defaultValue: '0',
    },
    uLoadable: {                    // Unlimited Loadable
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isFreezable: {
        type: DataTypes.BOOLEAN,    // Can user freeze his card
        defaultValue: false,
    },
    isfroozen: {                    //we only update this after we freeze from Flutterwave
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isWithdrawable:{
        type: DataTypes.BOOLEAN,   //Can user withdraw from card
        defaultValue: false,
    },
    creationFee: {
        type: DataTypes.DECIMAL,
        defaultValue: '8',
    },
    monthlyFee: {
        type: DataTypes.DECIMAL,
        defaultValue: '2'
    },
    expired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});
CardType.associate = (models) => {
    CardType.belongsTo(models.Users, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
    /* CardType.hasMany(models.CardFee,{
        onDelete: 'cascade',
    }); */
/*         CardType.belongsTo(models.Card, {
        foreignKey: {
            allowNull: false,
        },
    }); */
};

/* CardType.beforeCreate((cardtype, _ ) => {
    return cardtype.id = uuid.v4();
})  */

return CardType;
};