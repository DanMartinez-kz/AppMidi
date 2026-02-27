// Importar dotenv y cargar el archivo .env
require('dotenv').config();

// Ahora puedes acceder a las variables
const token = process.env.TOKEN_GITHUB;
console.log("Token activo:", token);

