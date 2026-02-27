async function cargarListaPresets() {
  try {
    const response = await fetch('/api/listar');
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    console.log("Presets recibidos:", data);
    const lista = document.getElementById('mi-lista');
    lista.innerHTML = "";

    data.forEach(grupo => {
      if (grupo.carpeta) {
        // Crear un <li> para la carpeta
        const carpetaLi = document.createElement('li');
        carpetaLi.textContent = grupo.carpeta;
        carpetaLi.style.fontWeight = "bold";

        // Crear una sublista para los presets dentro de la carpeta
        const subLista = document.createElement('ul');
        grupo.contenido.forEach(file => {
          const li = document.createElement('li');
          li.textContent = file.archivo.replace('.json', '');
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
          subLista.appendChild(li);
        });

        carpetaLi.appendChild(subLista);
        lista.appendChild(carpetaLi);
      } else {
        // Archivos sueltos en la raíz
        const li = document.createElement('li');
        li.textContent = grupo.archivo.replace('.json', '');
        li.addEventListener("click", async () => {
          try {
            const r = await fetch(grupo.download_url);
            const json = await r.json();
            aplicarPreset(json);
          } catch (e) {
            console.error("Error al descargar preset:", e);
          }
        });
        lista.appendChild(li);
      }
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