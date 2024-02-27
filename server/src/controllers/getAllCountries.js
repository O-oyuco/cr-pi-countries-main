const {Country, Activity} = require("../db");

async function getAllCountries(req, res){
    try{
        const countries = await Country.findAll({
            include: [Activity]
        });
        return res.status(200).json(countries);
    }catch (error){
        console.error("Error fetching countries:", error);
        return res.status(500).send("Error fetching countries")
    }
}

module.exports ={getAllCountries};