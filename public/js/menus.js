// Toggle menú Presets
document.getElementById("toggle-explorador").addEventListener("click", () => {
  const menu = document.getElementById("menu-presets");
  menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "block" : "none";
});

// Toggle menú MIDI
document.getElementById("toggle-midi").addEventListener("click", () => {
  dev_midi();
  const menu = document.getElementById("menu-midi");
  menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "block" : "none";
});