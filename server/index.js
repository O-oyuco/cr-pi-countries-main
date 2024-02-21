const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
// const PORT = 3001;
const PORT = 5432;
const createCountries = require('./createCountries.js');

conn.sync({ force: true }).then(async() => {
  await createCountries( );
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
