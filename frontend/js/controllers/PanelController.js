// Pulso — CONTROLADOR: Panel del CT. Usa el modelo Informe (motor de agregación).
window.Pulso = window.Pulso || {}; Pulso.controllers = Pulso.controllers || {};

Pulso.controllers.Panel = {
  mount(root) {
    const { Jugador, Informe, Anotacion } = Pulso.models;
    root.innerHTML = Pulso.views.Panel.render();

    const plantel = Jugador.listar();
    let activo = plantel[0].id;

    const squad = root.querySelector("#squad");
    const report = root.querySelector("#report");

    const pintarLista = () => {
      squad.innerHTML = plantel.map(j => Pulso.views.Panel.itemPlantel(j, j.id === activo)).join("");
      squad.querySelectorAll(".squad__item").forEach(btn =>
        btn.addEventListener("click", () => { activo = btn.dataset.id; pintarTodo(); })
      );
    };

    const pintarInforme = () => {
      report.innerHTML = Pulso.views.Panel.informe(Informe.semanal(activo));
      report.querySelector("#addNota").addEventListener("click", () => {
        const ta = report.querySelector("#nota");
        const res = Anotacion.agregar(activo, ta.value);
        Pulso.toast(res.msg);
        if (res.ok) pintarInforme();
      });
    };

    const pintarTodo = () => { pintarLista(); pintarInforme(); };
    pintarTodo();
  },
};
