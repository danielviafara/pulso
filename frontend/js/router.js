// Pulso — ROUTER. Navegación básica entre pantallas (SPA por hash).
window.Pulso = window.Pulso || {};

Pulso.router = {
  routes: {
    "/":            (app) => { app.innerHTML = Pulso.views.Inicio.render(); },
    "/registro":    (app) => Pulso.controllers.Registro.mount(app),
    "/panel":       (app) => Pulso.controllers.Panel.mount(app),
    "/pruebas":     (app) => Pulso.controllers.Pruebas.mount(app),
    "/arquitectura":(app) => { app.innerHTML = Pulso.views.Arquitectura.render(); },
  },

  resolve() {
    const app = document.getElementById("app");
    const path = (location.hash.replace(/^#/, "") || "/");
    const render = this.routes[path] || this.routes["/"];
    render(app);
    window.scrollTo(0, 0);
    this.marcarActivo(path);
    // Cierra el menú móvil al navegar
    document.getElementById("nav")?.classList.remove("open");
  },

  marcarActivo(path) {
    document.querySelectorAll("#nav a").forEach(a => {
      const r = a.getAttribute("href").replace(/^#/, "") || "/";
      a.setAttribute("aria-current", r === path ? "page" : "false");
    });
  },

  start() {
    window.addEventListener("hashchange", () => this.resolve());
    this.resolve();
  },
};
