// Pulso — MODELOS (capa de datos + lógica de negocio)
// Los modelos NO tocan el DOM. Consultan/modifican el Store y aplican reglas.

window.Pulso = window.Pulso || {};
Pulso.models = Pulso.models || {};

// --- Jugadores ---
Pulso.models.Jugador = {
  listar() { return Pulso.Store.jugadores.slice(); },
  obtener(id) { return Pulso.Store.jugadores.find(j => j.id === id) || null; },
};

// --- Mediciones diarias (peso + RPE) ---
Pulso.models.Medicion = {
  DESCRIPTORES: ["Muy suave","Suave","Moderado","Algo duro","Duro","Duro+","Muy duro","Muy duro+","Casi máximo","Máximo"],
  porJugador(id) { return (Pulso.Store.mediciones[id] || []).slice(); },
  descriptorRpe(r) { return this.DESCRIPTORES[r - 1] || ""; },
  // Regla de negocio: valida rangos antes de registrar
  registrar(id, peso, rpe) {
    const p = parseFloat(peso);
    if (isNaN(p) || p < 40 || p > 130) return { ok: false, msg: "Peso fuera de rango (40–130 kg)" };
    if (!rpe || rpe < 1 || rpe > 10) return { ok: false, msg: "El RPE debe estar entre 1 y 10" };
    (Pulso.Store.mediciones[id] = Pulso.Store.mediciones[id] || []).push({ p, r: rpe });
    return { ok: true, msg: `Día registrado · ${p.toFixed(1)} kg · RPE ${rpe}` };
  },
};

// --- Pruebas físicas semanales ---
Pulso.models.PruebaFisica = {
  listar() { return Pulso.Store.pruebas.slice(); },
  registrar(jugadorId, sprint, cmj, yoyo) {
    if (!sprint || !cmj || !yoyo) return { ok: false, msg: "Completa las tres pruebas" };
    Pulso.Store.pruebas.unshift({
      jugadorId,
      sprint: parseFloat(sprint),
      cmj: parseFloat(cmj),
      yoyo: parseInt(yoyo, 10),
    });
    return { ok: true, msg: "Pruebas de la semana guardadas" };
  },
};

// --- Anotaciones ---
Pulso.models.Anotacion = {
  porJugador(id) { return (Pulso.Store.anotaciones[id] || []).slice(); },
  agregar(id, texto) {
    if (!texto || !texto.trim()) return { ok: false, msg: "Escribe la anotación primero" };
    (Pulso.Store.anotaciones[id] = Pulso.Store.anotaciones[id] || [])
      .unshift({ autor: "Cuerpo técnico", fecha: "Hoy", texto: texto.trim() });
    return { ok: true, msg: "Anotación guardada" };
  },
};

// --- Informe (MOTOR DE AGREGACIÓN) ---
// Cruza mediciones + pruebas + anotaciones en el informe semanal por jugador.
Pulso.models.Informe = {
  semanal(id) {
    const jug = Pulso.models.Jugador.obtener(id);
    const med = Pulso.models.Medicion.porJugador(id);
    const pesos = med.map(m => m.p);
    const rpes = med.map(m => m.r);
    const pesoActual = pesos.length ? pesos[pesos.length - 1] : 0;
    const pesoDelta = pesos.length ? +(pesoActual - pesos[0]).toFixed(1) : 0;
    const rpeProm = rpes.length ? +(rpes.reduce((a, b) => a + b, 0) / rpes.length).toFixed(1) : 0;
    const pf = Pulso.models.PruebaFisica.listar().find(x => x.jugadorId === id);
    const pruebas = pf ? `Sprint ${pf.sprint.toFixed(2)} s · CMJ ${pf.cmj.toFixed(1)} cm · Yo-Yo ${pf.yoyo} m` : "Sin datos esta semana";
    return {
      jugador: jug, pesos, pesoActual, pesoDelta, rpeProm, pruebas,
      anotaciones: Pulso.models.Anotacion.porJugador(id),
    };
  },
};
