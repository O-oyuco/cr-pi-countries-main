const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Activity', {
        id:{ 
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        difficult:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        season:{
            type: DataTypes.ENUM('Invierno', 'Primavera','Verano', 'Otoño'),
            allowNull:false
        },
        imageUrl:{
            type: DataTypes.STRING, // Cambiar al tipo de datos adecuado para la URL de la imagen
            allowNull: false // Puedes establecerlo como true si la foto es opcional
        },
    });
};
