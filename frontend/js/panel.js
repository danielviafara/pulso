// Pulso — panel del cuerpo técnico (datos de muestra, sin backend)

const PLANTEL = [
  {
    id: "rincon", nombre: "Juan David Rincón", pos: "Delantero", estado: "ok",
    pesoActual: 72.6, pesoDelta: -0.5, rpeProm: 6.1,
    pesos: [73.1, 72.9, 73.0, 72.8, 72.7, 72.6, 72.6],
    pruebas: "Sprint 4.12 s · CMJ 48.5 cm · Yo-Yo 1840 m",
    notas: [
      { autor: "Prep. físico", fecha: "Lun", texto: "Buena semana de carga, peso estable dentro del rango." },
    ],
  },
  {
    id: "mora", nombre: "Carlos Andrés Mora", pos: "Volante", estado: "watch",
    pesoActual: 74.9, pesoDelta: +0.8, rpeProm: 7.4,
    pesos: [74.1, 74.3, 74.4, 74.6, 74.7, 74.8, 74.9],
    pruebas: "Sprint 4.28 s · CMJ 44.0 cm · Yo-Yo 2120 m",
    notas: [
      { autor: "Entrenador", fecha: "Mar", texto: "RPE alto varios días seguidos; vigilar volumen esta semana." },
    ],
  },
  {
    id: "rios", nombre: "Santiago Ríos", pos: "Defensa central", estado: "ok",
    pesoActual: 80.2, pesoDelta: -0.1, rpeProm: 5.6,
    pesos: [80.4, 80.3, 80.3, 80.2, 80.2, 80.3, 80.2],
    pruebas: "Sprint 4.41 s · CMJ 41.2 cm · Yo-Yo 1760 m",
    notas: [],
  },
  {
    id: "pena", nombre: "Miguel Ángel Peña", pos: "Lateral", estado: "ok",
    pesoActual: 70.1, pesoDelta: -0.3, rpeProm: 6.0,
    pesos: [70.6, 70.5, 70.4, 70.3, 70.2, 70.2, 70.1],
    pruebas: "Sprint 4.19 s · CMJ 46.8 cm · Yo-Yo 1980 m",
    notas: [],
  },
  {
    id: "ospina", nombre: "Julián Ospina", pos: "Arquero", estado: "alert",
    pesoActual: 78.9, pesoDelta: +1.4, rpeProm: 4.2,
    pesos: [77.5, 77.8, 78.0, 78.3, 78.5, 78.7, 78.9],
    pruebas: "Sprint 4.70 s · CMJ 39.4 cm · Yo-Yo 1520 m",
    notas: [
      { autor: "Prep. físico", fecha: "Mié", texto: "Subida sostenida de peso; revisar alimentación y carga aeróbica." },
    ],
  },
];

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
let actual = PLANTEL[0].id;

// ---- Lista del plantel ----
const squad = document.getElementById("squad");
PLANTEL.forEach((j) => {
  const li = document.createElement("li");
  const b = document.createElement("button");
  b.className = "squad__item";
  b.setAttribute("aria-current", j.id === actual ? "true" : "false");
  b.innerHTML =
    `<span><span class="nm">${j.nombre}</span><br><span class="pos">${j.pos}</span></span>` +
    `<span class="dot dot--${j.estado === "ok" ? "ok" : j.estado === "watch" ? "watch" : "alert"}" title="${estadoTexto(j.estado)}"></span>`;
  b.addEventListener("click", () => { actual = j.id; render(); });
  li.appendChild(b);
  squad.appendChild(li);
});

function estadoTexto(e) {
  return e === "ok" ? "Dentro de rango" : e === "watch" ? "En observación" : "Requiere atención";
}

// ---- Informe del jugador seleccionado ----
function render() {
  squad.querySelectorAll(".squad__item").forEach((el, i) => {
    el.setAttribute("aria-current", PLANTEL[i].id === actual ? "true" : "false");
  });

  const j = PLANTEL.find((p) => p.id === actual);
  const max = Math.max(...j.pesos);
  const min = Math.min(...j.pesos);
  const span = max - min || 1;

  const deltaCls = j.pesoDelta > 0 ? "up" : j.pesoDelta < 0 ? "down" : "flat";
  const deltaTxt = (j.pesoDelta > 0 ? "+" : "") + j.pesoDelta.toFixed(1) + " kg vs. semana pasada";

  const barras = j.pesos.map((p, i) => {
    const h = 30 + ((p - min) / span) * 100; // 30–130 px
    return `<div class="week__day"><div class="week__bar" style="height:${h}px" title="${DIAS[i]}: ${p} kg"></div><span class="week__lbl">${DIAS[i]}</span></div>`;
  }).join("");

  const notas = j.notas.length
    ? j.notas.map((n) => `<li><div class="meta"><b>${n.autor}</b> · ${n.fecha}</div>${n.texto}</li>`).join("")
    : `<li style="color:var(--muted);border:none;padding-top:0;">Aún no hay anotaciones para este jugador.</li>`;

  document.getElementById("report").innerHTML = `
    <div class="report__head">
      <h2>${j.nombre}</h2><span class="pos">${j.pos}</span>
    </div>

    <div class="tiles">
      <div class="tile">
        <div class="k">Peso actual</div>
        <div class="v num">${j.pesoActual.toFixed(1)} <small>kg</small></div>
        <div class="delta ${deltaCls}">${deltaTxt}</div>
      </div>
      <div class="tile">
        <div class="k">RPE promedio (semana)</div>
        <div class="v num">${j.rpeProm.toFixed(1)} <small>/10</small></div>
        <div class="delta flat">Carga percibida media</div>
      </div>
      <div class="tile">
        <div class="k">Pruebas físicas</div>
        <div class="v" style="font-size:16px; line-height:1.5; margin-top:10px;">${j.pruebas}</div>
      </div>
    </div>

    <div class="week">
      <h3>Peso · últimos 7 días</h3>
      <div class="week__grid">${barras}</div>
    </div>

    <div class="notes">
      <h3>Anotaciones del cuerpo técnico</h3>
      <textarea class="input" id="nota" placeholder="Escribe una observación sobre ${j.nombre.split(" ")[0]}…"></textarea>
      <div style="margin-top:12px;"><button class="btn btn--primary" id="addNota" type="button">Guardar anotación</button></div>
      <ul class="note-list" id="notaList">${notas}</ul>
    </div>
  `;

  document.getElementById("addNota").addEventListener("click", () => {
    const ta = document.getElementById("nota");
    const txt = ta.value.trim();
    if (!txt) { ta.focus(); window.showToast("Escribe la anotación primero"); return; }
    j.notas.unshift({ autor: "Cuerpo técnico", fecha: "Hoy", texto: txt });
    window.showToast("Anotación guardada");
    render();
  });
}

render();
