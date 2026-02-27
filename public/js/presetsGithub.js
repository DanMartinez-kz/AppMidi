async function cargarListaPresets() {
  try {
    const response = await fetch('/api/listar');
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    console.log("Presets recibidos:", data);
    renderPresets(data); // aquí usas tu función
  } catch (error) {
    console.error('Error al obtener archivos desde la API:', error);
  }
}

function renderPresets(data) {
  const select = document.getElementById("mi-select");
  select.innerHTML = "";

  data.forEach(grupo => {
    if (grupo.carpeta) {
      const optgroup = document.createElement("optgroup");
      optgroup.label = grupo.carpeta;

      grupo.contenido.forEach(file => {
        const option = document.createElement("option");
        option.value = file.download_url;
        option.textContent = file.archivo.replace(".json", "");
        optgroup.appendChild(option);
      });

      select.appendChild(optgroup);
    } else {
      const option = document.createElement("option");
      option.value = grupo.download_url;
      option.textContent = grupo.archivo.replace(".json", "");
      select.appendChild(option);
    }
  });
}

// Llamar al cargar la página
cargarListaPresets();

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