const { Router } = require("express");

const {getAllActivities} = require("../controllers/getAllActivities");
const {postActivity} = require("../controllers/postActivity");
const {getAllCountries} = require("../controllers/getAllCountries");
const {getCountriesById} = require("../controllers/getCountriesById");
const {getCountriesByName} = require("../controllers/getCountriesByName");


const router = Router();
router.post("/activities", postActivity);
router.get("/activities", getAllActivities);
router.get("/countries", getAllCountries);
router.get("/countries/name", getCountriesByName);
router.get("/countries/:idPais", getCountriesById);



module.exports = router;
