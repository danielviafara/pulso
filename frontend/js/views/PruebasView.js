// Pulso — VISTA: Pruebas físicas semanales.
window.Pulso = window.Pulso || {}; Pulso.views = Pulso.views || {};

Pulso.views.Pruebas = {
  render(jugadores) {
    const opts = jugadores.map(j => `<option value="${j.id}">${j.nombre} · ${j.pos}</option>`).join("");
    return `
    <section class="view">
      <div class="section page-head"><div class="container">
        <p class="ey">Cuerpo técnico</p><h1>Pruebas físicas semanales</h1>
        <p>Carga los resultados de la batería de pruebas de la semana. Alimentan el informe de cada jugador.</p>
      </div></div>
      <div class="section container">
        <div class="form" style="max-width:760px; margin-bottom:32px;">
          <div class="field"><label for="pjugador">Jugador</label><select id="pjugador" class="input">${opts}</select></div>
          <div class="field"><label for="sprint">Sprint 30 m</label><div class="input-affix"><input id="sprint" class="input" type="number" step="0.01" placeholder="4.12" /><span class="unit">s</span></div></div>
          <div class="field"><label for="salto">Salto vertical (CMJ)</label><div class="input-affix"><input id="salto" class="input" type="number" step="0.1" placeholder="48.5" /><span class="unit">cm</span></div></div>
          <div class="field"><label for="yoyo">Resistencia (Yo-Yo IR1)</label><div class="input-affix"><input id="yoyo" class="input" type="number" step="10" placeholder="1840" /><span class="unit">m</span></div></div>
          <button class="btn btn--primary btn--block" id="cargarPrueba" type="button">Guardar pruebas de la semana</button>
        </div>
        <h2 style="font-size:20px; margin-bottom:16px;">Registros de esta semana</h2>
        <div class="table-wrap">
          <table class="data">
            <thead><tr><th>Jugador</th><th class="num">Sprint 30 m (s)</th><th class="num">Salto CMJ (cm)</th><th class="num">Yo-Yo IR1 (m)</th></tr></thead>
            <tbody id="tablaPruebas"></tbody>
          </table>
        </div>
      </div>
    </section>`;
  },

  fila(nombre, sprint, cmj, yoyo) {
    return `<tr><td>${nombre}</td><td class="num">${sprint.toFixed(2)}</td><td class="num">${cmj.toFixed(1)}</td><td class="num">${yoyo}</td></tr>`;
  },
};
