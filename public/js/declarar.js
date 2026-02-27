function declVar(id) {
if (isPlay) {
	  // reproducción activa → no cambiar, solo esperar
      varPending = true;
      document.getElementById(id).classList.add("blink"); // clase CSS para parpadeo
	  pendingVar = id;
    } else {
		// quitar el estado activo de todos
    document.querySelectorAll(".var").forEach(b => b.classList.remove("active"));
    // activar solo el que se presionó
    document.getElementById(id).classList.add("active");
	globalVar = id;
	if (typeof drawNotes === "function") {
  drawNotes();
}
    }}

function declPart(id) {
	  document.querySelectorAll(".part").forEach(b => b.classList.remove("active"));
    document.getElementById(id).classList.add("active");
	  document.getElementById(id).addEventListener("dblclick", () => {
    abrirDialogoOP(id);
  });
	globalPart = id;
if (typeof drawNotes === "function") {
  drawNotes();
}
}

function declBase(id) {
if (isPlay) {
	  // reproducción activa → no cambiar, solo esperar
      fillPending = true;
      document.getElementById(id).classList.add("blink"); // clase CSS para parpadeo
	  pendingBses = id;
    } else {
	// 	// quitar el estado activo de todos
    document.querySelectorAll(".bses").forEach(b => b.classList.remove("active"));
    // activar solo el que se presionó
    document.getElementById(id).classList.add("active");
	globalBses = id;
	if (typeof drawNotes === "function") {
  drawNotes();
}
	}
}

function copyB() {
const baseNotes = style[globalVar][globalPart].nots.Base;
  bses.forEach(part => {
    style[globalVar][globalPart].nots[part] = JSON.parse(JSON.stringify(baseNotes));
  });
}

function abrirDialogo() {
  const modosSelect   = document.getElementById("modo");
    modosSelect.innerHTML= "";
  modes.forEach(m => {
    let opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
	modosSelect.appendChild(opt);
  });

  document.getElementById("dlg").showModal();
}

 function cerrarDialogoP() {
  let instrumento = document.getElementById("instrumento").value;
  let can = document.getElementById("can").value;
  let mod = document.getElementById("modo").value;
  ranges[instrumento] = [+document.getElementById("rangI").value, +document.getElementById("rangF").value];
//   console.log(mod);
  part.push(instrumento);
  channels.push(can);
  mode.push(mod);
  console.log(mode);
  generarStyle();
    console.log(instrumento, can);
	document.getElementById("instrumento").value = "";
    document.getElementById("can").value = "";
	mod = "";
	document.getElementById("dlg").close();
  console.log(ranges);
	console.log(style)
};

let idActual = null;

function abrirDialogoOP(id) {
	idActual = id;
  document.getElementById("opcP").showModal();

    let x = document.getElementById("chn");
  x.value = channels[part.indexOf(id)];
}

function cerrarDialogoOP() {
  let x = document.getElementById("chn").value;
  channels[part.indexOf(idActual)] = x;
document.getElementById("opcP").close();

  Object.values(style[globalVar][idActual].nots).forEach(n => {
	Object.values(n).forEach(inner => {
    inner.channel = Number(x);
  });
  });
};

function abrirDialVar() {
  document.getElementById("dlgV").showModal();
}

function cerrarDialogoV() {
  let variant = document.getElementById("variant").value;
  variacion.push(variant); 
  generarStyle();
  console.log(style);
    document.getElementById("variant").value = "";
	document.getElementById("dlgV").close();
};

function eliminarPrt() {
	delete style[globalVar][globalPart];
	mode.splice(1, [part.indexOf(globalPart)]);
	part.splice(1, [part.indexOf(globalPart)]);
	btnsPart();
}

function eliminarVar() {
	delete style[globalVar];
	variacion.splice(1, [variacion.indexOf(globalVar)]);
	btnsPart();
}