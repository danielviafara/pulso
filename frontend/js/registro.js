// Pulso — pantalla de registro diario del jugador

// Descriptores de la escala RPE (percepción de esfuerzo, 1 a 10)
const RPE = [
  { n: 1, label: "Muy suave", color: "#1E7A46" },
  { n: 2, label: "Suave", color: "#2E8B4E" },
  { n: 3, label: "Moderado", color: "#5C9A3A" },
  { n: 4, label: "Algo duro", color: "#8FA22B" },
  { n: 5, label: "Duro", color: "#C0A11E" },
  { n: 6, label: "Duro+", color: "#E0A21B" },
  { n: 7, label: "Muy duro", color: "#E8791F" },
  { n: 8, label: "Muy duro+", color: "#E85E2A" },
  { n: 9, label: "Casi máximo", color: "#E8483F" },
  { n: 10, label: "Máximo", color: "#C13429" },
];

let rpeValue = null;
const rpeGrid = document.getElementById("rpe");
const rpeRead = document.getElementById("rpeRead");

RPE.forEach((item) => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = item.n;
  b.setAttribute("aria-pressed", "false");
  b.setAttribute("aria-label", `${item.n}, ${item.label}`);
  b.addEventListener("click", () => selectRpe(item, b));
  rpeGrid.appendChild(b);
});

function selectRpe(item, btn) {
  rpeValue = item.n;
  rpeGrid.querySelectorAll("button").forEach((el) => {
    el.setAttribute("aria-pressed", "false");
    el.style.background = "";
  });
  btn.setAttribute("aria-pressed", "true");
  btn.style.background = item.color;
  rpeRead.innerHTML =
    `<span class="lvl" style="color:${item.color}">${item.n}/10</span>` +
    `<span class="desc">${item.label}</span>`;
}

// Fecha de hoy por defecto
const fecha = document.getElementById("fecha");
if (fecha) fecha.value = new Date().toISOString().slice(0, 10);

// Guardar (sin backend en esta entrega: valida y confirma en pantalla)
document.getElementById("guardar").addEventListener("click", () => {
  const peso = document.getElementById("peso").value;
  if (!peso) {
    document.getElementById("peso").focus();
    window.showToast("Falta el peso de hoy");
    return;
  }
  if (rpeValue === null) {
    window.showToast("Marca tu percepción de esfuerzo");
    return;
  }
  window.showToast(`Día registrado · ${peso} kg · RPE ${rpeValue}`);
});
