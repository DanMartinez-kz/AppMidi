// Función para enviar una nota
function sendNote(ch, noteNumber, duration, velocidad) {
	midiOut = midiAccess.outputs.get(outputSelect.value);
	const channel = 0x90 + (ch - 1);
	const noteOff1 = 0x80 + (ch - 1);
	const noteOff2 = 0x90 + (ch - 1);
	if (!midiOut) return;
	// Note On (canal 1 → 0x90)
	selOut.send([channel, noteNumber, velocidad]);
	// Note Off después de 'duration' ms
	setTimeout(() => {
		// 0x80
		selOut.send([noteOff1, noteNumber, 0]);
		selOut.send([noteOff2, noteNumber, 0]);
	}, duration*1000);
}