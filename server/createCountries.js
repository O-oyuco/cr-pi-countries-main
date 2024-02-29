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
                name: {official},
                flags:{svg: image},
                capital,
                subregion,
                area,
                population: poblacion,
                coatOfArms:{png: escudo},
                currencies,
                languages,
                timezones,
                borders,
                idd,
                capitalInfo:{latlng}
            } = countryData
        try{
            const defaultCapital = "No tiene capital";
            const countryLanguages =  languages ? Object.values(languages).join(', ') : null;
            const countryTimezones =  timezones ? Object.values(timezones).join(', ') : null;
            const countryBorders =  borders ? Object.values(borders).join(', ') : null;
            const countryContinent = countryData.continents[0];
            const countryName = common || countryData.name.official;
            const countryNameO = official || countryData.name.official;
            const countryMaps = latlng || countryData.capitalInfo.latlng;
            const countryCapital = Array.isArray(capital) ? capital[0]: capital || defaultCapital;
            const countryCurrencies = currencies ? Object.entries(currencies).map(([code, data]) => ({
                code,
                name: data.name,
                symbol: data.symbol,
            })) : [];
            const countryIdd = idd ? [{
                root: idd.root,
                suffixes: idd.suffixes
            }] : [];

            // const countryLanguages = languages ? Object.entries(languages).map(([code, name]) => ({
            //     code,
            //     name,
            // })) : [];

            await Country.create({
                id,
                name: countryName,
                nameO: countryNameO,
                image,
                escudo,
                continent: countryContinent,
                capital: countryCapital,
                subregion,
                area,
                poblacion,
                currencies: countryCurrencies,
                languages: countryLanguages,
                timezones: countryTimezones,
                borders: countryBorders,
                idd: countryIdd,
                maps: countryMaps,
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