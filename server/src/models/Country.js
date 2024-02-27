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
    nameO: {
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
    languages:{
      type: DataTypes.STRING,
      allowNull: true,
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
    escudo:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    timezones:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    borders:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    maps:{
      type: DataTypes.JSON,
      allowNull: true,
    },
    currencies:{
      type: DataTypes.JSON,
      allowNull: true,
    },
    idd: {
      type: DataTypes.TEXT, // Cambiado a TEXT para almacenar datos JSON
      allowNull: true,
      get() {
        const value = this.getDataValue('idd');
        return value ? JSON.parse(value) : null; // Convertir la cadena JSON almacenada en un objeto
      },
      set(value) {
        this.setDataValue('idd', JSON.stringify(value)); 
              },
          },
    // currencies:{
    //   type: DataTypes.TEXT, // Cambiado a TEXT para almacenar datos JSON
    //   allowNull: true,
    //   get() {
    //     const value = this.getDataValue('currencies');
    //     return value ? JSON.parse(value) : null; // Convertir la cadena JSON almacenada en un objeto
    //   },
    //   set(value) {
    //     this.setDataValue('currencies', JSON.stringify(value)); 
    //   },
    // },
    // languages: {
    //   type: DataTypes.TEXT, // Cambiado a TEXT para almacenar datos JSON
    //   allowNull: true,
    //   get() {
    //     const value = this.getDataValue('languages');
    //     return value ? JSON.parse(value) : null; // Convertir la cadena JSON almacenada en un objeto
    //   },
    //   set(value) {
    //     this.setDataValue('languages', JSON.stringify(value)); 
    //           },
    //        },
    // timezones: {
    //   type: DataTypes.TEXT, // Cambiado a TEXT para almacenar datos JSON
    //   allowNull: true,
    //   get() {
    //     const value = this.getDataValue('timezones');
    //     return value ? JSON.parse(value) : null; // Convertir la cadena JSON almacenada en un objeto
    //   },
    //   set(value) {
    //     this.setDataValue('timezones', JSON.stringify(value)); 
    //           },
    //       },
    // borders: {
    //   type: DataTypes.TEXT, // Cambiado a TEXT para almacenar datos JSON
    //   allowNull: true,
    //   get() {
    //     const value = this.getDataValue('borders');
    //     return value ? JSON.parse(value) : null; // Convertir la cadena JSON almacenada en un objeto
    //   },
    //   set(value) {
    //     this.setDataValue('borders', JSON.stringify(value)); 
    //           },
    //       },
  });
};