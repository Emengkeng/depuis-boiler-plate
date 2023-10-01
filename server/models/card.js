module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('Card', {
        cardIds: {                       // To avoid name clash i added an s
            type: DataTypes.STRING, // Holds the id from the flutterwave card
        },
    });
    Card.associate = (models) => {
        Card.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false,
            },
        });
        Card.belongsTo(models.CardType, {
            foreignKey: {
                allowNull: false,
            },
        });
    };
    return Card;
};
