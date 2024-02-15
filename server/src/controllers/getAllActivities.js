const {Activity} = require('../db')

async function getAllActivities(req, res){
    try{
        const activities = await Activity.findAll();
        return res.status(200).json(activities);
    }catch (error){
        console.error("Error fetching countries:", error);
        return res.status(500).send("Error fetching countries");
    }
}

module.exports = {getAllActivities};