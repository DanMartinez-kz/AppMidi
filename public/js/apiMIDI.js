// MIDI----------------------------------------------------------------------

let midiAccess = null;
let midiIn = null;
let midiOut = null;
let rootP;

const inputSelect = document.getElementById("midiIn");
const outputSelect = document.getElementById("midiOut");

// Inicializar acceso MIDI
navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

// Listar salidas
  async function dev_midi() {
      // Limpiar selects
  inputSelect.innerHTML = "";
  outputSelect.innerHTML = "";
    midiAccess.outputs.forEach((output) => {
    const option = document.createElement("option");
    option.value = output.id;
    option.text = output.name;
    outputSelect.appendChild(option);
  });
      // Listar entradas
  midiAccess.inputs.forEach((input) => {
    const option = document.createElement("option");
    option.value = input.id;
    option.text = input.name;
    inputSelect.appendChild(option);
  });
  };

function onMIDISuccess(access) {
  midiAccess = access;
  
  dev_midi();

  // Seleccionar automáticamente la primera entrada
  if (inputSelect.options.length > 0) {
    inputSelect.selectedIndex = 0;
    const selectedId = inputSelect.value;
    midiIn = midiAccess.inputs.get(selectedId);
    if (midiIn) {
      midiIn.onmidimessage = handleMIDIMessage;
      console.log("Escuchando mensajes de entrada:", midiIn.name);
    }
  }

  // Manejar cambio manual de entrada
  inputSelect.addEventListener("change", () => {
    const selectedId = inputSelect.value;
    midiIn = midiAccess.inputs.get(selectedId);
    if (midiIn) {
      midiIn.onmidimessage = handleMIDIMessage;
      console.log("Cambiado a entrada:", midiIn.name);
    }
  });

  
  // Seleccionar automáticamente la primera salida
  if (outputSelect.options.length > 0) {
    outputSelect.selectedIndex = 0;
    const selectedIdo = outputSelect.value;
    midiOut = midiAccess.outputs.get(selectedIdo);
    if (midiOut) {
      console.log("Usando salida MIDI:", midiOut.name);
    }
  }

  // Manejar cambio manual de salida
  outputSelect.addEventListener("change", () => {
    const selectedId = outputSelect.value;
    midiOut = midiAccess.outputs.get(selectedId);
    if (midiOut) {
      console.log("Cambiado a salida:", midiOut.name);
    }
  });

  // Buscar salida "Bth Midi"
  for (let output of midiAccess.outputs.values()) {
    console.log("ID:", output.id, "Nombre:", output.name);
    if (output.name.includes("Bth Midi")) {
      let Bth = output;
      break;
    }
  }
}

// Función para manejar mensajes MIDI
function handleMIDIMessage(event) {
  const [status, data1, data2] = event.data;
  //console.log(`MIDI recibido: status=${status}, data1=${data1}, data2=${data2}`);
}

function onMIDIFailure() {
  console.error("No se pudo acceder a MIDI");
}