'use strict';
/* 
*Use to handle the fee for each card that is created
 */

module.exports = (sequelize, DataTypes) => {
const CardFee = sequelize.define('CardFees', {
    id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
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
CardFee.associate = (models) => {
    CardFee.belongsTo(models.Users, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
    CardFee.belongsTo(models.CardTypes, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
};

/* CardFee.beforeCreate((cardfee, _ ) => {
    return cardfee.id = uuid.v4();
})  */
return CardFee;
};