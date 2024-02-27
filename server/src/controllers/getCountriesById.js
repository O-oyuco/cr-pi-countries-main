const {Country, Activity} = require ('../db')

async function getCountriesById(req, res){
    const {idPais} = req.params;
    try{
        const country = await Country.findOne({
            where:{
                id: idPais.toUpperCase()
            },
            include: [Activity]
        });

        if (!country){
            return res.status(404).send("No se ha encontrado algún país con ese ID...");
        }
        return res.status(200).send(country);
    }catch (error){
        return res.status(500).send(error.message)
    }
}

module.exports = {getCountriesById};