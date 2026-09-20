// Pulso — VISTA: Registro diario del jugador.
window.Pulso = window.Pulso || {}; Pulso.views = Pulso.views || {};

Pulso.views.Registro = {
  render(jugadores) {
    const opts = jugadores.map(j => `<option value="${j.id}">${j.nombre} · ${j.pos}</option>`).join("");
    return `
    <section class="view">
      <div class="section page-head"><div class="container">
        <p class="ey">Jugador</p><h1>Registro diario</h1>
        <p>Anota tu peso apenas te peses y marca qué tan exigente sentiste el día. Un registro por día.</p>
      </div></div>

      <div class="section container" style="max-width:720px;">
        <div class="form">
          <div class="field">
            <label for="jugador">Jugador</label>
            <select id="jugador" class="input">${opts}</select>
          </div>
          <div class="field">
            <label for="fecha">Fecha</label>
            <input id="fecha" class="input" type="date" />
            <p class="hint">Se toma la fecha de hoy automáticamente.</p>
          </div>
          <div class="field">
            <label for="peso">Peso de hoy</label>
            <div class="input-affix"><input id="peso" class="input" type="number" inputmode="decimal" step="0.1" min="40" max="130" placeholder="72.4" /><span class="unit">kg</span></div>
          </div>
          <div class="field">
            <label>Percepción de esfuerzo (RPE)</label>
            <div class="rpe" id="rpe" role="group" aria-label="Escala de esfuerzo de 1 a 10"></div>
            <div class="rpe__read" id="rpeRead" aria-live="polite"><span class="desc">Toca un valor del 1 (muy suave) al 10 (máximo).</span></div>
          </div>
          <button class="btn btn--primary btn--block" id="guardar" type="button">Registrar día</button>
        </div>

        <div class="stack" style="margin-top:32px;">
          <h2 style="font-size:20px;">Tus últimos registros</h2>
          <div class="table-wrap">
            <table class="data">
              <thead><tr><th>Día</th><th class="num">Peso (kg)</th><th class="num">RPE</th><th>Sensación</th></tr></thead>
              <tbody id="historial"></tbody>
            </table>
          </div>
        </div>
      </div>
    </section>`;
  },

  // Fragmentos que el controlador usa para actualizar la tabla / escala
  filaHistorial(dia, peso, rpe, desc) {
    return `<tr><td>${dia}</td><td class="num">${peso.toFixed(1)}</td><td class="num">${rpe}</td><td>${desc}</td></tr>`;
  },
};
