// Cargar desde archivo JSON
	const btnLP = document.getElementById("loadPatron");
const inputLP = document.getElementById("fileInput");

btnLP.addEventListener("click", () => {
  // Simula el click en el input oculto
  inputLP.click();
});
	
 document.getElementById("fileInput").addEventListener("change", function(e) {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.onload = function(event) {
		const testo0 = JSON.stringify(event.target.result);
		const testo1 = testo0.slice(171);
		if(testo1.charAt(0)=== "<") {
		
function envolverTexto(texto, inicio, fin) {
	return inicio + texto + fin;
}

const testo2 = testo1
.replace(/</g, "{")
.replace(/>/g, "}")
.replace(/Note Note/g, "pitch")
.replace(/Velocity/g, "velocity")
.replace(/Begin/g, "start")
.replace(/End/g, "length")
.replace(/\\/g, "")
.replace(/\//g, "")
.replace(/"/g, "")
.replace(/=/g, ":")
.replace(/\b[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\b/g, '"$&"')
.replace(/\d+/g, "$&,")
.replace(/,}/g, "},")
.replace(/"rn"/g, "")
.replace(/,{"Pattern"}/, "")
.replace(/ /g, "");

const testo3 = envolverTexto(testo2, "[", "]");
const newJSON = JSON.parse(testo3);
	for (let i = 0; i < newJSON.length; i++) {
		const newPitch = style[globalVar][globalPart].dats.pitches.indexOf(newJSON[i].pitch);
		newJSON[i].pitch = newPitch;	
		const newLength = ((newJSON[i].length)-(newJSON[i].start))+1;
		newJSON[i].length = newLength
		const newStart = (newJSON[i].start)-1;
		newJSON[i].start = newStart;
		newJSON[i].channel = channels[part.indexOf(globalPart)];
	}; 
	let OnewJSON = newJSON.map(n => ({
  channel: n.channel,
  pitch: n.pitch,
  velocity: n.velocity,
  start: n.start,
  length: n.length
}));
	style[globalVar][globalPart].nots[globalBses] = [];
	for (const [i, v] of OnewJSON.entries()) {
  style[globalVar][globalPart].nots[globalBses][i] = v;
}
 render();
		} else {
const newJSON = JSON.parse(event.target.result);
		console.log(newJSON)
	for (const v of newJSON ) {
		notes.push(v);
	}
 render();
}
	};
	reader.readAsText(file);
 }
);

// Descargar como archivo JSON
function downloadNotes() {
	const data = JSON.stringify(style);
	const blob = new Blob([data], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "style.json";
	a.click();
	// URL.revokeObjectU433RL(url);
}


// Cargar Styles

const btn = document.getElementById("saveStyle");
const input = document.getElementById("zfileInput");

btn.addEventListener("click", () => {
  // Simula el click en el input oculto
  input.click();
});

input.addEventListener("change", () => {
  Array.from(input.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          inicializarConStyle(data);
        } catch (err) {
          alert("Error leyendo JSON: " + err);
        }
      };
      reader.readAsText(file);
    });
  });

function inicializarConStyle(data) {
  console.log("Style cargado:", data);
style = data;
  drawNotes()
}
	