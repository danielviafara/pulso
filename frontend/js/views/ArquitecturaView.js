// Pulso — VISTA: Arquitectura. Representación visual de módulos, capas y patrón MVC.
window.Pulso = window.Pulso || {}; Pulso.views = Pulso.views || {};

Pulso.views.Arquitectura = {
  render() {
    const capas = [
      { n: 1, h: "Interfaz de usuario", p: "Pantallas de registro, panel y pruebas.", mvc: "Vista" },
      { n: 2, h: "Lógica de negocio", p: "Reglas y validaciones (rangos de peso y RPE).", mvc: "Modelo" },
      { n: 3, h: "Motor de informes", p: "Agrega peso, RPE y pruebas en el informe semanal.", mvc: "Modelo" },
      { n: 4, h: "Acceso a datos", p: "Aísla el origen de los datos (hoy en memoria).", mvc: "Modelo / Store" },
      { n: 5, h: "Base de datos", p: "Persistencia. Se implementa en fases posteriores.", mvc: "— pendiente" },
    ];
    const barras = capas.map((c, i) =>
      `<div class="layer-bar"><span class="n">${c.n}</span><div class="body"><h4>${c.h}</h4><p>${c.p}</p></div><span class="mvc">${c.mvc}</span></div>` +
      (i < capas.length - 1 ? `<div class="layer-arrow">▼</div>` : "")
    ).join("");

    return `
    <section class="view">
      <div class="section page-head"><div class="container">
        <p class="ey">Diseño</p><h1>Arquitectura del prototipo</h1>
        <p>Pulso sigue una arquitectura por capas con control de acceso transversal. La interfaz se organiza con el patrón Modelo–Vista–Controlador (MVC).</p>
      </div></div>

      <div class="section container">
        <h2 style="font-size:20px; margin-bottom:16px;">Capas del sistema</h2>
        <div class="arch">
          <div class="layers">${barras}</div>
          <div class="aside-sec"><h4>Seguridad y roles</h4><p>Capa transversal: autenticación y permisos (jugador / cuerpo técnico) sobre todas las capas.</p></div>
        </div>

        <h2 style="font-size:20px; margin:36px 0 16px;">Organización MVC del código</h2>
        <div class="mvc-map">
          <div class="mvc-card">
            <div class="cap">Modelo</div>
            <div><code>js/models/</code> · <code>js/data/</code></div>
            <ul><li>Datos y reglas de negocio.</li><li>Motor de informes (agregación).</li><li>No conoce el DOM.</li></ul>
          </div>
          <div class="mvc-card">
            <div class="cap">Vista</div>
            <div><code>js/views/</code></div>
            <ul><li>Renderiza HTML.</li><li>Sin lógica de negocio.</li><li>Una vista por pantalla.</li></ul>
          </div>
          <div class="mvc-card">
            <div class="cap">Controlador</div>
            <div><code>js/controllers/</code> · <code>js/router.js</code></div>
            <ul><li>Conecta modelo y vista.</li><li>Escucha eventos de usuario.</li><li>Gestiona la navegación.</li></ul>
          </div>
        </div>
      </div>
    </section>`;
  },
};
