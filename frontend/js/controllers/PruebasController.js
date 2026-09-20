// Pulso — CONTROLADOR: Pruebas físicas.
window.Pulso = window.Pulso || {}; Pulso.controllers = Pulso.controllers || {};

Pulso.controllers.Pruebas = {
  mount(root) {
    const { Jugador, PruebaFisica } = Pulso.models;
    root.innerHTML = Pulso.views.Pruebas.render(Jugador.listar());

    const tbody = root.querySelector("#tablaPruebas");
    const nombre = id => (Jugador.obtener(id) || {}).nombre || id;
    const pintar = () => {
      tbody.innerHTML = PruebaFisica.listar()
        .map(p => Pulso.views.Pruebas.fila(nombre(p.jugadorId), p.sprint, p.cmj, p.yoyo)).join("");
    };
    pintar();

    root.querySelector("#cargarPrueba").addEventListener("click", () => {
      const id = root.querySelector("#pjugador").value;
      const res = PruebaFisica.registrar(id, root.querySelector("#sprint").value, root.querySelector("#salto").value, root.querySelector("#yoyo").value);
      Pulso.toast(res.ok ? `Pruebas de ${nombre(id).split(" ")[0]} guardadas` : res.msg);
      if (res.ok) { ["#sprint","#salto","#yoyo"].forEach(s => root.querySelector(s).value = ""); pintar(); }
    });
  },
};
