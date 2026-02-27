require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express(); // ← aquí defines app

app.use(express.json());

// Endpoint para guardar preset en GitHub
app.post('/api/guardar', async (req, res) => {
  const { nombre, contenidoJson } = req.body;
  const urlGuardar = `https://api.github.com/repos/DanMartinez-kz/ArrMidi/contents/presets/${nombre}`;
  const token = process.env.TOKEN_GITHUB;

  const data = {
    message: "Añadir preset " + nombre,
    content: Buffer.from(JSON.stringify(contenidoJson, null, 2)).toString('base64'),
  };

  const response = await fetch(urlGuardar, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  res.json(result);
});

// Servir index.html en la raíz
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));