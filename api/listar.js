async function listarContenido(repo, path, token) {
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github.v3+json"
    }
  });
  if (!response.ok) throw new Error("Error al listar contenido");
  const data = await response.json();

  const resultado = [];
  for (const item of data) {
    if (item.type === "dir") {
      const subContenido = await listarContenido(repo, item.path, token);
      resultado.push({ carpeta: item.name, contenido: subContenido });
    } else if (item.name.endsWith(".json")) {
      resultado.push({ archivo: item.name, download_url: item.download_url });
    }
  }
  return resultado;
}

export default async function handler(req, res) {
  const TOKEN = process.env.GITHUB_TOKEN;
  const REPO = "DanMartinez-kz/AppMidi";
  const FOLDER = "presets";

  try {
    const resultado = await listarContenido(REPO, FOLDER, TOKEN);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}