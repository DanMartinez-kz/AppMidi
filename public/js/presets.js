fetch("https://raw.githubusercontent.com/DanMartinez-kz/ArrMidi/main/presets/default.json")
  .then(res => {
    if (!res.ok) throw new Error("Error HTTP: " + res.status);
    return res.json();
  })
  .then(data => {
    console.log("Presets cargados:", data);
    aplicarPreset(data);
  })
  .catch(err => console.error("Error cargando presets:", err));

function aplicarPreset(data) {
  console.log("Style cargado:", data);
  style = data;
  drawNotes();
}