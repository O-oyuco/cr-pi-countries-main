const {Country} = require('../db');
const {Op} = require ('sequelize');

async function getCountriesByName(req, res){
    const {name} = req.query;

    try{
        const countries = await Country.findAll({
            where: {
                name:{
                    [Op.iLike]: `%${name}%`,
                },
            },
        });

        if (!countries){
            return res.status(400).send("No se ha encontrado ningún país con ese nombre.");
        }
        return res.status(200).send(countries);
    }catch(error){
        return res.status(500).send(error.message);
    }
};

module.exports = {getCountriesByName};