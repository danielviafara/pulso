// Pulso — Capa de acceso a datos (simulada)
// En la arquitectura, esta capa aísla el origen de los datos. En la Fase 2 usa
// datos en memoria; en fases posteriores se reemplaza por la base de datos real.

window.Pulso = window.Pulso || {};

Pulso.Store = {
  jugadores: [
    { id: "rincon", nombre: "Juan David Rincón", pos: "Delantero", estado: "ok" },
    { id: "mora",   nombre: "Carlos Andrés Mora", pos: "Volante", estado: "watch" },
    { id: "rios",   nombre: "Santiago Ríos", pos: "Defensa central", estado: "ok" },
    { id: "pena",   nombre: "Miguel Ángel Peña", pos: "Lateral", estado: "ok" },
    { id: "ospina", nombre: "Julián Ospina", pos: "Arquero", estado: "alert" },
  ],

  // Peso (kg) + RPE (1-10) por jugador, últimos 7 días (Lun..Dom)
  mediciones: {
    rincon: [ {p:73.1,r:5},{p:72.9,r:6},{p:73.0,r:5},{p:72.8,r:7},{p:72.7,r:6},{p:72.6,r:7},{p:72.6,r:8} ],
    mora:   [ {p:74.1,r:7},{p:74.3,r:8},{p:74.4,r:7},{p:74.6,r:8},{p:74.7,r:6},{p:74.8,r:7},{p:74.9,r:9} ],
    rios:   [ {p:80.4,r:5},{p:80.3,r:6},{p:80.3,r:5},{p:80.2,r:6},{p:80.2,r:5},{p:80.3,r:6},{p:80.2,r:6} ],
    pena:   [ {p:70.6,r:6},{p:70.5,r:5},{p:70.4,r:7},{p:70.3,r:6},{p:70.2,r:6},{p:70.2,r:5},{p:70.1,r:7} ],
    ospina: [ {p:77.5,r:4},{p:77.8,r:3},{p:78.0,r:5},{p:78.3,r:4},{p:78.5,r:4},{p:78.7,r:5},{p:78.9,r:4} ],
  },

  // Pruebas físicas de la semana
  pruebas: [
    { jugadorId: "rincon", sprint: 4.12, cmj: 48.5, yoyo: 1840 },
    { jugadorId: "mora",   sprint: 4.28, cmj: 44.0, yoyo: 2120 },
    { jugadorId: "rios",   sprint: 4.41, cmj: 41.2, yoyo: 1760 },
    { jugadorId: "pena",   sprint: 4.19, cmj: 46.8, yoyo: 1980 },
    { jugadorId: "ospina", sprint: 4.70, cmj: 39.4, yoyo: 1520 },
  ],

  // Anotaciones del cuerpo técnico
  anotaciones: {
    rincon: [ { autor: "Prep. físico", fecha: "Lun", texto: "Buena semana de carga, peso estable dentro del rango." } ],
    mora:   [ { autor: "Entrenador", fecha: "Mar", texto: "RPE alto varios días seguidos; vigilar volumen esta semana." } ],
    rios:   [],
    pena:   [],
    ospina: [ { autor: "Prep. físico", fecha: "Mié", texto: "Subida sostenida de peso; revisar alimentación y carga aeróbica." } ],
  },
};
