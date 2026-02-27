// Cambia la URL para que apunte a tu nueva API interna
const urlLocal = 'https://api.github.com/repos/DanMartinez-kz/AppMidi/contents/presets/'; 

async function cargarListaPresets() {
  try {
    const response = await fetch("/api/listar"); // tu API interna
    const archivos = await response.json();

    console.log("Respuesta completa:", archivos);

    const lista = document.getElementById('mi-lista');
    lista.innerHTML = "";

    for (const file of archivos) {
      if (file.type === "dir") {
        // Es carpeta: mostrar nombre y luego pedir su contenido
        const carpetaLi = document.createElement('li');
        carpetaLi.textContent = file.name;
        carpetaLi.style.fontWeight = "bold";

        // Llamada extra para ver dentro de la carpeta
        const subRes = await fetch(`https://api.github.com/repos/DanMartinez-kz/AppMidi/contents/presets/?path=${file.path}`);
        const subArchivos = await subRes.json();

        const subLista = document.createElement('ul');
        subArchivos.forEach(subFile => {
          if (subFile.name.endsWith(".json")) {
            const li = document.createElement('li');
            li.textContent = subFile.name.replace(".json", "");
            li.addEventListener("click", async () => {
              const r = await fetch(subFile.download_url);
              const json = await r.json();
              aplicarPreset(json);
            });
            subLista.appendChild(li);
          }
        });

        carpetaLi.appendChild(subLista);
        lista.appendChild(carpetaLi);
      } else if (file.name.endsWith(".json")) {
        // Es archivo suelto
        const li = document.createElement('li');
        li.textContent = file.name.replace(".json", "");
        li.addEventListener("click", async () => {
          const r = await fetch(file.download_url);
          const json = await r.json();
          aplicarPreset(json);
        });
        lista.appendChild(li);
      }
    }
  } catch (error) {
    console.error('Error al obtener archivos desde la API:', error);
  }
}//Como adaptaría esto
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