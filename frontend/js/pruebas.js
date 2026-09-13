// Pulso — carga de pruebas físicas semanales (sin backend en esta entrega)

document.getElementById("cargarPrueba").addEventListener("click", () => {
  const jugador = document.getElementById("pjugador").value.split(" · ")[0];
  const sprint = document.getElementById("sprint").value;
  const salto = document.getElementById("salto").value;
  const yoyo = document.getElementById("yoyo").value;

  if (!sprint || !salto || !yoyo) {
    window.showToast("Completa las tres pruebas");
    return;
  }

  const tbody = document.getElementById("tablaPruebas");
  const tr = document.createElement("tr");
  tr.innerHTML =
    `<td>${jugador}</td>` +
    `<td class="num">${Number(sprint).toFixed(2)}</td>` +
    `<td class="num">${Number(salto).toFixed(1)}</td>` +
    `<td class="num">${Number(yoyo)}</td>`;
  tbody.prepend(tr);

  document.getElementById("sprint").value = "";
  document.getElementById("salto").value = "";
  document.getElementById("yoyo").value = "";
  window.showToast(`Pruebas de ${jugador} guardadas`);
});
