// Interacción: crear/mover/resize
	let isDown = false, dragNote = null, modeD = null, startCell = null;

	function posToCell(x,y) {
		return { col: Math.floor(x / cellW), row: Math.floor(y / cellH) };
	}

	roll.addEventListener('pointerdown', (e) => {
		e.preventDefault();
		const rect = roll.getBoundingClientRect();
		const x = e.clientX - rect.left, y = e.clientY - rect.top;
		isDown = true;

		// ¿clic sobre nota?
		for (const n of style[globalVar][globalPart].nots[globalBses]) {
			const row = pitchToRow(n.pitch);
			const nx = n.start * cellW, ny = row * cellH;
			const nw = n.length * cellW, nh = cellH - 2;
			if (x>=nx && x<=nx+nw && y>=ny && y<=ny+nh) {
				dragNote = n;
				modeD = (x >= nx + nw - 20) ? 'resize' : 'move';
				startCell = posToCell(x,y);
				return;
			}
		}
		// crear
		const channel = channels[part.indexOf(globalPart)];
		const cell = posToCell(x,y);
		const pitch = maxPitch - cell.row;
		const newNote = { channel, pitch, start: cell.col, length: 1, velocity: 100};
		style[globalVar][globalPart].nots[globalBses].push(newNote);
		// ordenar primero por start, luego por pitch
		style[globalVar][globalPart].nots[globalBses].sort((a, b) => {
  			if (a.start === b.start) {
    			return a.pitch - b.pitch; // si empiezan igual, ordena por pitch
  			}
  			return a.start - b.start;   // si no, ordena por start
		});
		dragNote = newNote; modeD = 'create'; startCell = cell;
		render();
		console.log(style[globalVar][globalPart].nots[globalBses]);
	},
{ passive: false }
);

	roll.addEventListener('pointermove', (e) => {
		e.preventDefault(); 
		if (!isDown || !dragNote) return;
		const rect = roll.getBoundingClientRect();
		const x = e.clientX - rect.left, y = e.clientY - rect.top;
		const cell = posToCell(x,y);

		if (modeD === 'move') {
			const dx = cell.col - startCell.col;
			const dy = cell.row - startCell.row;
			dragNote.start = Math.max(0, Math.min(cols-1, dragNote.start + dx));
			const np = Math.min(maxPitch, Math.max(minPitch, dragNote.pitch - dy));
			dragNote.pitch = np;
			startCell = cell;
			render();
		} else if (modeD === 'resize' || modeD === 'create') {
			const deltaY = e.movementY;
		// mover arriba = más velocity, abajo = menos
			dragNote.velocity = Math.max(0, Math.min(127, dragNote.velocity - deltaY));

			dragNote.length = Math.max(1, Math.min(cols - dragNote.start, cell.col - dragNote.start));
			render();
		}
	},
{ passive: false }
);

	window.addEventListener('pointerup', () => {isDown=false; dragNote=null; modeD=null; startCell=null; });

let lastClickTime = 0;
let lastClickX = 0;
let lastClickY = 0;
const DOUBLE_CLICK_DELAY = 300; // ms
const DOUBLE_CLICK_DISTANCE = 10; // px

roll.addEventListener('pointerdown', e => {
	const now = Date.now();
	const rect = roll.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	const timeDiff = now - lastClickTime;
	const dist = Math.hypot(x - lastClickX, y - lastClickY);
	if (timeDiff < DOUBLE_CLICK_DELAY && dist < DOUBLE_CLICK_DISTANCE) {    
	for (let i = 0; i < style[globalVar][globalPart].nots[globalBses].length; i++) {
		const n = style[globalVar][globalPart].nots[globalBses][i];
		const row = pitchToRow(n.pitch);
		const nx = n.start * cellW;
		const ny = row * cellH;
		const nw = n.length * cellW;
		const nh = cellH - 2;

			if (x >= nx && x <= nx + nw && y >= ny && y <= ny + nh) {
			style[globalVar][globalPart].nots[globalBses].splice(i, 1); // elimina la nota
			render();           // redibuja el piano roll
			return;
		 }
	}

	}

	// actualizar referencia
	lastClickTime = now;
	lastClickX = x;
	lastClickY = y;
});
const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', () => {
	style[globalVar][globalPart].nots[globalBses] = [];   // vacía el arreglo de notas
	render();           // redibuja el piano roll vacío
});