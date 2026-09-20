// Pulso — VISTA: Panel del cuerpo técnico (lista + informe).
window.Pulso = window.Pulso || {}; Pulso.views = Pulso.views || {};

Pulso.views.Panel = {
  render() {
    return `
    <section class="view">
      <div class="section page-head"><div class="container">
        <p class="ey">Cuerpo técnico</p><h1>Panel de seguimiento</h1>
        <p>Selecciona un jugador para ver su informe de la semana: peso, carga percibida, pruebas físicas y anotaciones.</p>
      </div></div>
      <div class="section container">
        <div class="panel">
          <aside class="squad">
            <div class="squad__head">Plantel</div>
            <ul class="squad__list" id="squad"></ul>
          </aside>
          <div class="report" id="report"></div>
        </div>
      </div>
    </section>`;
  },

  itemPlantel(j, activo) {
    const dot = j.estado === "ok" ? "ok" : j.estado === "watch" ? "watch" : "alert";
    const est = j.estado === "ok" ? "Dentro de rango" : j.estado === "watch" ? "En observación" : "Requiere atención";
    return `<li><button class="squad__item" data-id="${j.id}" aria-current="${activo ? "true" : "false"}">
      <span><span class="nm">${j.nombre}</span><br><span class="pos">${j.pos}</span></span>
      <span class="dot dot--${dot}" title="${est}"></span>
    </button></li>`;
  },

  informe(inf) {
    const DIAS = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];
    const max = Math.max(...inf.pesos), min = Math.min(...inf.pesos), span = (max - min) || 1;
    const barras = inf.pesos.map((p, i) => {
      const h = 30 + ((p - min) / span) * 100;
      return `<div class="week__day"><div class="week__bar" style="height:${h}px" title="${DIAS[i]}: ${p} kg"></div><span class="week__lbl">${DIAS[i]}</span></div>`;
    }).join("");
    const dCls = inf.pesoDelta > 0 ? "up" : inf.pesoDelta < 0 ? "down" : "flat";
    const dTxt = (inf.pesoDelta > 0 ? "+" : "") + inf.pesoDelta.toFixed(1) + " kg vs. inicio de semana";
    const notas = inf.anotaciones.length
      ? inf.anotaciones.map(n => `<li><div class="meta"><b>${n.autor}</b> · ${n.fecha}</div>${n.texto}</li>`).join("")
      : `<li style="color:var(--muted);border:none;padding-top:0;">Aún no hay anotaciones para este jugador.</li>`;
    return `
      <div class="report__head"><h2>${inf.jugador.nombre}</h2><span class="pos">${inf.jugador.pos}</span></div>
      <div class="tiles">
        <div class="tile"><div class="k">Peso actual</div><div class="v num">${inf.pesoActual.toFixed(1)} <small>kg</small></div><div class="delta ${dCls}">${dTxt}</div></div>
        <div class="tile"><div class="k">RPE promedio (semana)</div><div class="v num">${inf.rpeProm.toFixed(1)} <small>/10</small></div><div class="delta flat">Carga percibida media</div></div>
        <div class="tile"><div class="k">Pruebas físicas</div><div class="v" style="font-size:16px;line-height:1.5;margin-top:10px;">${inf.pruebas}</div></div>
      </div>
      <div class="week"><h3>Peso · últimos 7 días</h3><div class="week__grid">${barras}</div></div>
      <div class="notes">
        <h3>Anotaciones del cuerpo técnico</h3>
        <textarea class="input" id="nota" placeholder="Escribe una observación sobre ${inf.jugador.nombre.split(" ")[0]}…"></textarea>
        <div style="margin-top:12px;"><button class="btn btn--primary" id="addNota" type="button">Guardar anotación</button></div>
        <ul class="note-list" id="notaList">${notas}</ul>
      </div>`;
  },
};
