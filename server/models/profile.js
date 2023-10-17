'use strict';
const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
const Profile = sequelize.define('Profiles', {
  id: {
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    type: DataTypes.UUID,
},
  image: {
    type: DataTypes.STRING,
    defaultvalue: "https://res.cloudinary.com/dluwizg51/image/upload/v1652250733/AVATARS/no-pic-ava_golenz.jpg",
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Profile.associate = (models) => {
  Profile.belongsTo(models.Users, {
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};

/* Profile.beforeCreate((profile, _ ) => {
  return profile.id = uuid.v4();
}) */
return Profile;
};