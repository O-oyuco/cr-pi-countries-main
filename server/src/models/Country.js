const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Country', {
    id:{ 
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent:{
      type: DataTypes.ENUM('North America', 'South America', 'Asia', 'Antarctica', 'Africa', 'Europe', 'Oceania')
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area:{
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    poblacion:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};