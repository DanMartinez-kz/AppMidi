export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { nombre } = req.body;
  const TOKEN = process.env.GITHUB_TOKEN; // tu token seguro en .env
  const REPO = "DanMartinez-kz/AppMidi"; // tu repo
  const PATH = `presets/${nombre}`; // ruta del preset a eliminar

  try {
    // 1. Obtener el SHA del archivo (GitHub requiere el SHA para borrarlo)
    const getResponse = await fetch(`https://api.github.com/repos/DanMartinez-kz/AppMidi/contents/${PATH}`, {
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      }
    });

    if (!getResponse.ok) {
      return res.status(404).json({ success: false, error: "Preset no encontrado" });
    }

    const fileData = await getResponse.json();
    const sha = fileData.sha;

    // 2. Hacer DELETE (en realidad es un PUT con `sha` y `content: null`)
    const deleteResponse = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}`, {
      method: "DELETE", // GitHub API usa DELETE para borrar
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Eliminar preset: ${nombre}`,
        sha: sha
      })
    });

    const data = await deleteResponse.json();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}