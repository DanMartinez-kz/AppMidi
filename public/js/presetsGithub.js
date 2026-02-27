// Cambia la URL para que apunte a tu nueva API interna
const urlLocal = '/api/listar'; 

async function cargarListaPresets() {
  try {
    const response = await fetch(urlLocal);
    const archivosJson = await response.json();
    
    if (archivosJson.error) throw new Error(archivosJson.error);

    console.log("Presets recibidos:", archivosJson);
    const lista = document.getElementById('mi-lista');
    lista.innerHTML = "";

    archivosJson.forEach(file => {
      const li = document.createElement('li');
      li.textContent = file.name.replace('.json', ''); // Quita la extensión para que se vea limpio
      
      li.addEventListener("click", async () => {
        try {
          const r = await fetch(file.download_url);
          const json = await r.json();
          console.log("Preset cargado:", json);
          aplicarPreset(json);
        } catch (e) {
          console.error("Error al descargar preset:", e);
        }
      });
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Error al obtener archivos desde la API:', error);
  }
}

function aplicarPreset(data) {
  console.log("Style cargado:", data);
  style = data;
  drawNotes();
}

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

// Eliminar preset (frontend)
async function eliminarPreset(nombre) {
  const response = await fetch("/api/eliminar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre })
  });

  const result = await response.json();
  console.log(result);

  // 🔄 Recargar lista después de eliminar
  cargarListaPresets();
}

// Abrir el diálogo
const dialogoE = document.getElementById("dialogo-eliminarpre");
document.getElementById("abrir-dialogoE").addEventListener("click", () => {
  dialogoE.showModal();
});

// Asociar el botón de eliminar
document.getElementById("eliminar-pre").addEventListener("click", () => {
  const nombre = document.getElementById("nom-eliminarpre").value.trim();
  if (nombre) {
    eliminarPreset(nombre);
  }
});