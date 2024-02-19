const {Activity} = require ('../db')

async function getActivitiesById(req, res){
    const {idActivity} = req.params;
    try{
        const country = await Activity.findOne({
            where:{
                id: idActivity.toUpperCase()
            },
        });

        if (!country){
            return res.status(404).send("No se ha encontrado algún país con ese ID...");
        }
        return res.status(200).send(country);
    }catch (error){
        return res.status(500).send(error.message)
    }
}

module.exports = {getActivitiesById};