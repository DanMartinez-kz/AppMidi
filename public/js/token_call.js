const toktok = document.getElementById("toktok");

toktok.addEventListener("click", async () => {
  try {
    const res = await fetch("http://localhost:3000/api/data");
    const data = await res.json();
    alert(data.token);
  } catch (err) {
    console.error("Error en fetch:", err);
  }
});