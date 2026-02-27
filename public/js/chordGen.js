// Chord Generator

function generateChord(root, type) {
    // Define chord structures
    const chords = {
        "major": [root, "maj3", "perf5"],
        "minor": [root, "min3", "perf5"],
        // Add more chord types as needed
    };

    return chords[type] || [];
}

function displayChord(chord) {
    console.log(`Chord: ${chord.join(", ")}`);
}

// Example Usage
const myChord = generateChord("C", "major");
displayChord(myChord);