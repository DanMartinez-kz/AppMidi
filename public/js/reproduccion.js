	// referencias a elementos del DOM
const bpmRange = document.getElementById("bpm");
const bpmValue = document.getElementById("bpmValue");

	 // cada vez que mueves el slider
  bpmRange.addEventListener("input", () => {
    bpmValue.textContent = bpmRange.value;
  });

function playNote(ch, p, dur, velocity) {
		sendNote(ch, p, dur, velocity)
	}

	function drawPlayhead(x) {
		render();
		rctx.strokeStyle = '#ffcc00';
		rctx.lineWidth = 2;
		rctx.beginPath();
		rctx.moveTo(x, 0);
		rctx.lineTo(x, H);
		rctx.stroke();
	}

	// Secuencia de pasos (ejemplo: 8 pasos)
	const beatLabel = document.getElementById("contBPM");

const steps = [
  { action: (x) => {drawPlayhead((W/16)*x); playMidi(x); 
    if (beatLabel) {
      // Cada beat dura 4 pasos (16 pasos / 4 beats)
      const beatNumber = (Math.floor(x / 4)%4)+1;
      beatLabel.innerText = beatNumber;

      // Cambiar color según el beat
      if (beatNumber === 1) {
        beatLabel.style.backgroundColor = "green"; // relleno verde
        beatLabel.style.color = "white";           // texto blanco para contraste
      } else {
          beatLabel.style.backgroundColor = "transparent"; // sin relleno
      }
    }
  }
  },
];

let loopTimer = null; // aquí guardamos el ID del intervalo

function startLoop() {
  document.getElementById("play").style.color = "red";
  isPlay = true;

  // Si ya hay un loop activo, lo detenemos primero
  if (loopTimer !== null) {
    clearTimeout(loopTimer);
    loopTimer = null;
  }

  let col = 1;

  function loopStep() {
    let bpm = parseInt(bpmInput.value, 10);
    const interval = (60 / bpm) / 4 * 1000; // ms por paso

    steps[0].action(col);
    col++;
    if (col >= 16) col = 0;

    loopTimer = setTimeout(loopStep, interval);
  }

  // Ejecuta la primera acción de inmediato
 // steps[0].action(col);
  loopTimer = setTimeout(loopStep, (60 / parseInt(bpmInput.value, 10)) / 4 * 1000);
}

function stopLoop() {
	document.getElementById("play").style.color="white";
	isPlay=false;
    drawPlayhead(-1);
    beatLabel.innerText="1";
  if (loopTimer !== null) {
    clearInterval(loopTimer);
    loopTimer = null;
    console.log("Loop detenido");
  }
}

function playMidi(col){
	const currentStyle = style[globalVar]; // nivel variación
  for (const [nombrePart, datosPart] of Object.entries(currentStyle)) {
	for (const [nombreData, datosData] of Object.entries(datosPart)) {
      for (const [nombreBses, notas] of Object.entries(datosData)) {
		if (nombreBses === globalBses) {
	    for (const n of notas) {
          if (n.start + 1 === col) {
	        	let partActual = part[channels.indexOf(n.channel)];
			let notaNumer = datosPart.dats.pitches;
			let notaTocar;
			if (nombrePart=="AGuitarr") {
			    selOut = Bth
			} else {
			    selOut = midiAccess.outputs.get(outputSelect.value)
			};
			if (datosPart.dats.namesKeys[0]=="C") {
			    const ju = datosPart.nots[globalBses][0].pitch;
			    notaTocar = notaNumer[n.pitch]+(rootP-(notaNumer[ju]%12));	
			} else {
			    notaTocar = notaNumer[n.pitch];
			}
              playNote(n.channel, notaTocar, (n.length*0.125), n.velocity);
          }
	    }
		  // inicio del loop: activar si está pendiente
if (col === 1 && varPending) {
	globalVar = pendingVar;
  varPending = false;
  document.getElementById(globalVar).classList.remove("blink"); // quitar parpadeo
      document.querySelectorAll(".var").forEach(b => b.classList.remove("active"));
    // activar solo el que se presionó
    document.getElementById(globalVar).classList.add("active");
	const boton = document.getElementById("Fill_in");
    boton.click();
}
// inicio del loop: activar si está pendiente
if (col === 1 && fillPending) {
	globalBses = pendingBses;
  fillPending = false;
  document.getElementById(globalBses).classList.remove("blink"); // quitar parpadeo
      document.querySelectorAll(".bses").forEach(b => b.classList.remove("active"));
    // activar solo el que se presionó
    document.getElementById(globalBses).classList.add("active");
}
// fin del loop: regresar a base
if (col === 2 && globalBses!=="Base") {
//	if (globalBses !== "Base") {
		const boton = document.getElementById("Base");
    boton.click();
}
		}
	}
}
  }
}

document.getElementById("play").addEventListener("click", startLoop);
document.getElementById("stop").addEventListener("click", stopLoop);

const btnR = document.getElementById("reproduccion");
btnR.addEventListener("click", () => {
	btnR.classList.toggle("edicion");
  if (btnR.classList.contains("edicion")) {
    btnR.textContent = "Modo edición";
  	document.querySelectorAll('[data-ocultar]').forEach(el => el.style.display='none')
    } else {
    btnR.textContent = "Modo reproducción";
    document.querySelectorAll('[data-ocultar]').forEach(el => el.style.display='flex')	
    }
});