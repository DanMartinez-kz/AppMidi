export default async function handler(req, res) {
  const TOKEN = process.env.GITHUB_TOKEN;
  const REPO = "DanMartinez-kz/AppMidi";
  const FOLDER = "presets"; // Carpeta donde están los JSON

  try {
    const response = await fetch(`https://api.github.com/repos/DanMartinez-kz/AppMidi/contents/${FOLDER}`, {
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    // Solo devolvemos los archivos .json
   // const archivosJson = data.filter(file => file.name.endsWith('.json'));
    const archivosJson = data.filter(file => {
  return file.type === "dir" || file.name.endsWith(".json")});
    res.status(200).json(archivosJson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


