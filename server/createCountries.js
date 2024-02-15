const  axios = require('axios');
const {Country} = require('./src/db');

const URL = 'http://localhost:5000/countries'

async function createCountries(){
    try{
        const response = await axios.get(URL);
        
        if(response.data.error){
            console.log("Error: No se pudo obtener datos de los paises.");
            return;
        }
        const countriesData = response.data;
        let createdCountries = 0;

        for (let countryData of countriesData){
            const {
                cca3: id,
                name: {common},
                flags:{png: image},
                capital,
                subregion,
                area,
                population: poblacion,
            } = countryData
        try{
            const defaultCapital = "No tiene capital";
            const countryContinent = countryData.continents[0];
            const countryName = common || countryData.name.official;
            const countryCapital = Array.isArray(capital) ? capital[0]: capital || defaultCapital;

            await Country.create({
                id,
                name: countryName,
                image,
                continent: countryContinent,
                capital: countryCapital,
                subregion,
                area,
                poblacion,
            });
            createdCountries++;
        }catch (error){
            console.error("Error creating country:", error)
        }
    }
        console.log(`Se han creado ${createdCountries} countries`);
    }catch (error){
    console.error("Error:", error.message )
    }
}   

module.exports = createCountries