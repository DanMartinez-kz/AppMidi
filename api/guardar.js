// api/guardar.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { nombre, contenidoJson } = req.body;
  const TOKEN = process.env.GITHUB_TOKEN; // La variable que agregaste en Termux
  const REPO = "DanMartinez-kz/AppMidi"; // Tu repo
  const PATH = `presets/${nombre}`; // Carpeta donde se guardarán

  try {
    // 1. Convertir JSON a Base64 (requerido por GitHub API)
    const content = Buffer.from(JSON.stringify(contenidoJson, null, 2)).toString('base64');

    // 2. Subir a GitHub
    const response = await fetch(`https://api.github.com{REPO}/contents/${PATH}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Añadir preset: ${nombre}`,
        content: content
      })
    });

    const data = await response.json();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


