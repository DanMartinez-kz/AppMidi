function crearBotones(array, contenedorId, clase, callback, opcionesExtra = []) {
  const cont = document.getElementById(contenedorId);
  if (!cont) {
    console.error(`Contenedor ${contenedorId} no encontrado`);
    return;
  }

  // Limpiar el contenedor
  cont.innerHTML = "";

  // Crear botones a partir del array
  if (Array.isArray(array)) {
    array.forEach((texto, i) => {
      const boton = document.createElement("button");
        boton.id = texto;
        boton.innerText = texto;
        boton.className = clase;
     // console.log(boton.className);
      boton.addEventListener("click", () => callback(boton.id));
      cont.appendChild(boton);
    });
  }

  // Agregar botones extra (ej. +, -, Llenar)
  opcionesExtra.forEach(op => {
    const boton = document.createElement("button");
    boton.innerText = op.texto;
    boton.id = op.id;
    boton.className = clase;
    if (op.dataset) {
      Object.keys(op.dataset).forEach(key => {
        boton.dataset[key] = op.dataset[key];
      });
    }
    boton.addEventListener("click", op.onClick);
    cont.appendChild(boton);
  });
}

function btnsPart() {
  crearBotones(part, "partes", "part", declPart, [
    { texto: "+", id: "newPart", onClick: abrirDialogo },
    { texto: "-", id: "ePart", onClick: eliminarPrt }
  ]);

  crearBotones(bses, "bases", "bses", declBase, [
    { texto: "Llenar", id: "copyB", dataset: { ocultar: "true" }, onClick: copyB }
  ]);

  crearBotones(variacion, "variaciones", "var", declVar, [
    { texto: "+", id: "newVar", dataset: { ocultar: "true" }, onClick: abrirDialVar },
    { texto: "-", id: "eVar", dataset: { ocultar: "true" }, onClick: eliminarVar }
  ]);

  // Activar primeros botones de cada categoría
  const primerPart = document.querySelector("#partes button.part");
  if (primerPart) { primerPart.classList.add("activo"); declPart(primerPart.id); }

  const primerBase = document.querySelector("#bases button.bses");
  if (primerBase) { primerBase.classList.add("activo"); declBase(primerBase.id); }

  const primerVar = document.querySelector("#variaciones button.var");
  if (primerVar) { primerVar.classList.add("activo"); declVar(primerVar.id); }
}