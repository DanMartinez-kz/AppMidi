// Dibujar----------------------------------------------------------------
	// Tamaño mini
	const cellW = 55;   // ancho por paso
	const cellH = 30;   // alto por nota
	const W = 880;
	let H = (style[globalVar][globalPart].dats.pitches.length)*cellH;
	const cols = Math.floor(W / cellW); // ~25 pasos
	let rows = style[globalVar][globalPart].dats.pitches.length; // 20 notas

	// Rango de pitch
	let minPitch = 0, maxPitch = style[globalVar][globalPart].dats.pitches.length-1; // viene del mode
	let pitchToRow = (p) => (maxPitch - p);

	const roll = document.getElementById('roll');
	const keys = document.getElementById('keys');
	const rctx = roll.getContext('2d');
	const kctx = keys.getContext('2d');

	// const playBtn = document.getElementById('play');
	// const stopBtn = document.getElementById('stop');
	const bpmInput = document.getElementById('bpm');

	// Dibujar cuadrícula
	function drawGrid() {
	H = (style[globalVar][globalPart].dats.pitches.length)*cellH;
	rows = style[globalVar][globalPart].dats.pitches.length;
		roll.height = cellH*style[globalVar][globalPart].dats.pitches.length;
		keys.height = cellH*style[globalVar][globalPart].dats.pitches.length;
		rctx.clearRect(0,0,W,H);
		rctx.fillStyle = '#141414';
		rctx.fillRect(0,0,W,H);

		// vertical (tiempo)
		for (let c=0; c<=cols; c++) {
			rctx.strokeStyle = (c % 4 === 0) ? '#333' : '#262626';
			rctx.beginPath();
			rctx.moveTo(c*cellW, 0);
			rctx.lineTo(c*cellW, H);
			rctx.stroke();
		}
		// horizontal (notas)
		for (let r=0; r<=rows; r++) {
			rctx.strokeStyle = '#1f1f1f';
			rctx.beginPath();
			rctx.moveTo(0, r*cellH);
			rctx.lineTo(W, r*cellH);
			rctx.stroke();
		}
	}
		
	drawNotes = function() {
		rctx.clearRect(0, 0, rctx.canvas.width, rctx.canvas.height);
		drawGrid();
		kctx.clearRect(0,0,keys.width,keys.height);
		drawKeys();
	
		if (style[globalVar][globalPart].nots[globalBses].length !== 0) {
			
	for (const n of style[globalVar][globalPart].nots[globalBses]) {
			const row = pitchToRow(n.pitch);
			const x = n.start * cellW;
			const y = row * cellH;
			const w = n.length * cellW;
			const h = cellH - 2;

			const intensity = Math.floor((n.velocity / 127) * 255);
		rctx.fillStyle = `rgb(${255-intensity}, ${255-intensity}, 255)`;
			rctx.fillRect(x+1, y+1, w-2, h);
			rctx.strokeStyle = '#0f6bd8';
			rctx.lineWidth = 2;
			rctx.strokeRect(x+1, y+1, w-2, h);
			rctx.fillStyle= "black";
			rctx.font = "20px Arial";
			rctx.fillText(`${n.velocity}`, x + 5, y + 20);

			// handle de resize
			rctx.fillStyle = '#0f6bd8';
			rctx.fillRect(x + w - 20, y + 1, 20, h);
		}
	}
	}

	function drawKeys() {
		kctx.clearRect(0,0,keys.width,keys.height);
		maxPitch = style[globalVar][globalPart].dats.pitches.length-1;
		const names = style[globalVar][globalPart].dats.namesKeys;
		for (let p=maxPitch; p>=minPitch; p--) {
			const r = pitchToRow(p);
			const y = r*cellH;
			const isBlack = [1,3,5,7,9,13,15,17].includes(p % 6);
			kctx.fillStyle = isBlack ? '#222' : '#eee';
			kctx.fillRect(0, y+1, keys.width-1, cellH-2);
			kctx.strokeStyle = '#444';
			kctx.beginPath(); kctx.moveTo(0,y); kctx.lineTo(keys.width,y); kctx.stroke();
		if (style[globalVar][globalPart].dats.namesKeys[0] === "C") {
			let startPitch = style[globalVar][globalPart].dats.pitches[0];
			let rel = p + startPitch;
			const namesKeys = style[globalVar][globalPart].dats.namesKeys;
			const noteName = namesKeys[rel % namesKeys.length];
			const octave = Math.floor(rel / 12)-2;
			const name = `${noteName}${octave}`;
			kctx.fillStyle = isBlack ? '#ddd' : '#111';
			kctx.font = 'bold 18px system-ui';
			kctx.fillText(name, 6, y + cellH - 4);
			} else {
			const name = names[p%names.length];
			kctx.fillStyle = isBlack ? '#ddd' : '#111';
			kctx.font = 'bold 18px system-ui';
			kctx.fillText(name, 6, y + cellH - 4);
		}
	}
}

	function render() { drawGrid(); drawNotes(); drawKeys();}
	render();