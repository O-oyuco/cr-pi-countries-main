const {Activity, Country} = require ('../db');

async function getActivitiesById(req, res){
    const {idActivity} = req.params;
    try{
        const activity = await Activity.findOne({
            where:{
                id: idActivity.toUpperCase()
            },
            include: [Country] 
        });

        if (!activity){
            return res.status(404).send("No se ha encontrado Actividades con ese ID...");
        }
        return res.status(200).send(activity);
    }catch (error){
        return res.status(500).send(error.message);
    }
}

module.exports = {getActivitiesById};