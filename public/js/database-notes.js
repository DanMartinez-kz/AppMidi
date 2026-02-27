function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

function generarStyle() {
  // mapa de modos para acceder a los objetos
  const modeMap = {
    guitarrM_VstAGML2,
    drumM,
    noteM // este se generará dinámicamente si corresponde
  };

  style = Object.fromEntries(
    variacion.map(nombreVar => [
      nombreVar,
      Object.fromEntries(
        part.map((nombrePart, i) => {
          return [
            nombrePart,
            Object.fromEntries(
              data.map(nombreData => {
                if (nombreData === "dats") {
                  // si el modo es noteM, crear un objeto nuevo con rango
                  if (mode[i] === "noteM") {
                    return [
                      nombreData,
                      {
                        pitches: range(...ranges[nombrePart]),
                        namesKeys: notesNames
                      }
                    ];
                  } else {
                    return [nombreData, modeMap[mode[i]]];
                  }
                } else {
                  // notas por base
                  return [
                    nombreData,
                    Object.fromEntries(
                      bses.map(nombreBses => {
                        let existenteP =
                          style?.[nombreVar]?.[nombrePart]?.[nombreData]?.[nombreBses];
                        return [nombreBses, existenteP || []];
                      })
                    )
                  ];
                }
              })
            )
          ];
        })
      )
    ])
  );

  // regenerar botones después de actualizar style
  btnsPart();
}

// inicializar al cargar
generarStyle();

// validar antes de usar
if (style[globalVar] && style[globalVar][globalPart]) {
  console.log(style[globalVar][globalPart].dats.pitches.length);
}