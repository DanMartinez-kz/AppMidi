const url = 'https://api.github.com/repos/DanMartinez-kz/AppMidi/contents/presets/';

async function cargarListaPresets() {
  try {
    const response = await fetch(url);
    const data = await response.json();
console.log("Respuesta de GitHub:", data);
    const archivosJson = data.filter(file => file.name.endsWith('.json'));
    const lista = document.getElementById('mi-lista');
    lista.innerHTML = "";

    archivosJson.forEach(file => {
      const li = document.createElement('li');
      li.textContent = file.name;
      li.addEventListener("click", () => {
        fetch(file.download_url)
          .then(r => r.json())
          .then(json => {
            console.log("Preset cargado:", json);
            aplicarPreset(json);
          });
      });
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Error al obtener archivos:', error);
  }
}

function aplicarPreset(data) {
  console.log("Style cargado:", data);
  style = data;
  drawNotes();
}

cargarListaPresets();

// Guardar preset (frontend)
async function guardarPreset(nombre, contenidoJson) {
  const response = await fetch("/api/guardar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, contenidoJson })
  });

  const result = await response.json();
  console.log(result);

  // 🔄 Recargar lista después de guardar
  cargarListaPresets();
}

function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

// Abrir el diálogo
const dialogo = document.getElementById("dialogo-preset");
document.getElementById("abrir-dialogo").addEventListener("click", () => {
  dialogo.showModal();
});

// Guardar cuando se confirma
document.getElementById("guardar").addEventListener("click", () => {
  const nombre = document.getElementById("nombre-preset").value.trim();
  if (nombre) {
    guardarPreset(nombre, style);
  }
});