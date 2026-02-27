let globalVar = "Intro";
let globalPart = "AGuitarr";
let globalBses = "Base";
let pendingBses = "";
let pendingVar = "";

let variacion = ["Intro", "Verso", "Coro"];
let part = ["AGuitarr", "Bass", "Drums"];
let bses = ["Base", "Var_1", "Var_2", "Fill_in", "Fill"];
let data = ["dats", "nots"];

let channels = [8, 9, 10];
let ranges = {
	"Bass": [40, 77]
}
let style = {};
let mode = ["guitarrM_VstAGML2", "noteM", "drumM"];
let modes = ["guitarrM_VstAGML2", "drumM", "noteM"];
var notesNames = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
var guitarrM_VstAGML2 = {pitches: [62, 64, 65, 67, 69, 71, 72, 74, 76, 78, 77, 79, 81, 83], namesKeys: ['1','2','3','4','5','6','↓','↓','↑','||','|||','↓|','↓|', '↑|']};
var drumM = {pitches: [35, 36, 37, 38, 42, 44, 46, 41, 43, 45, 47, 48, 50, 49, 57, 51, 59, 53, 52, 55], namesKeys: ['aB','B','sC','C','cHH','pHH','aHH','lFT','hFT','lT','lMT','hMT', 'HT', 'Cr1', 'Cr2', 'R1', 'R2', 'Bll', 'Chn', 'Spl']};

var noteM;
let isPlay = false;
let fillPending = false;
let varPending = false;