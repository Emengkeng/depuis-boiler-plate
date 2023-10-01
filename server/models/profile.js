module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profiles', {
    image: {
      type: DataTypes.STRING,
      defaultvalue: "https://res.cloudinary.com/dluwizg51/image/upload/v1652250733/AVATARS/no-pic-ava_golenz.jpg",
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Profile;
};
