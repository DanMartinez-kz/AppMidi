// Cambia la URL para que apunte a tu nueva API interna
const urlLocal = 'https://api.github.com/repos/DanMartinez-kz/AppMidi/contents/presets/'; 

async function cargarListaPresets() {
  try {
    const response = await fetch('api/listar); // tu API interna
    const archivos = await response.json();

    console.log("Respuesta completa:", archivos);

    const select = document.getElementById('mi-select');
    select.innerHTML = "";

    for (const file of archivos) {
      if (file.type === "dir") {
        // Es carpeta: crear un optgroup
        const optgroup = document.createElement("optgroup");
        optgroup.label = file.name;

        // Llamada extra para ver dentro de la carpeta
        const subRes = await fetch(`/api/listar?path=${file.path}`);
        const subArchivos = await subRes.json();

        subArchivos.forEach(subFile => {
          if (subFile.name.endsWith(".json")) {
            const option = document.createElement("option");
            option.value = subFile.download_url;
            option.textContent = subFile.name.replace(".json", "");
            optgroup.appendChild(option);
          }
        });

        select.appendChild(optgroup);
      } else if (file.name.endsWith(".json")) {
        // Es archivo suelto en la raíz
        const option = document.createElement("option");
        option.value = file.download_url;
        option.textContent = file.name.replace(".json", "");
        select.appendChild(option);
      }
    }

    // Evento para aplicar preset al seleccionar
    select.addEventListener("change", async (e) => {
      const url = e.target.value;
      if (!url) return;
      try {
        const r = await fetch(url);
        const json = await r.json();
        console.log("Preset cargado:", json);
        aplicarPreset(json);
      } catch (err) {
        console.error("Error al descargar preset:", err);
      }
    });
  } catch (error) {
    console.error('Error al obtener archivos desde la API:', error);
  }
}
//Como adaptaría esto
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