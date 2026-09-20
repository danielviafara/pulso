// Pulso — CONTROLADOR: Registro diario. Conecta modelo Medicion con la vista.
window.Pulso = window.Pulso || {}; Pulso.controllers = Pulso.controllers || {};

Pulso.controllers.Registro = {
  mount(root) {
    const { Jugador, Medicion } = Pulso.models;
    root.innerHTML = Pulso.views.Registro.render(Jugador.listar());

    // Fecha de hoy
    root.querySelector("#fecha").value = new Date().toISOString().slice(0, 10);

    // Escala RPE 1..10 con color verde→rojo
    const colores = ["#1E7A46","#2E8B4E","#5C9A3A","#8FA22B","#C0A11E","#E0A21B","#E8791F","#E85E2A","#E8483F","#C13429"];
    let rpe = null;
    const grid = root.querySelector("#rpe");
    const read = root.querySelector("#rpeRead");
    for (let n = 1; n <= 10; n++) {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = n; b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", `${n}, ${Medicion.descriptorRpe(n)}`);
      b.addEventListener("click", () => {
        rpe = n;
        grid.querySelectorAll("button").forEach(el => { el.setAttribute("aria-pressed", "false"); el.style.background = ""; });
        b.setAttribute("aria-pressed", "true"); b.style.background = colores[n - 1];
        read.innerHTML = `<span class="lvl" style="color:${colores[n-1]}">${n}/10</span><span class="desc">${Medicion.descriptorRpe(n)}</span>`;
      });
      grid.appendChild(b);
    }

    // Historial del jugador seleccionado
    const jugadorSel = root.querySelector("#jugador");
    const tbody = root.querySelector("#historial");
    const etiquetas = ["Hace 6 días","Hace 5 días","Hace 4 días","Hace 3 días","Anteayer","Ayer","Hoy"];
    const pintarHistorial = () => {
      const med = Medicion.porJugador(jugadorSel.value).slice(-4);
      const base = etiquetas.slice(-med.length);
      tbody.innerHTML = med.map((m, i) =>
        Pulso.views.Registro.filaHistorial(base[i], m.p, m.r, Medicion.descriptorRpe(m.r))
      ).reverse().join("");
    };
    jugadorSel.addEventListener("change", pintarHistorial);
    pintarHistorial();

    // Guardar (delega la validación al modelo)
    root.querySelector("#guardar").addEventListener("click", () => {
      const res = Medicion.registrar(jugadorSel.value, root.querySelector("#peso").value, rpe);
      Pulso.toast(res.msg);
      if (res.ok) { root.querySelector("#peso").value = ""; pintarHistorial(); }
    });
  },
};
