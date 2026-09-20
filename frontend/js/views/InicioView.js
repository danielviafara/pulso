// Pulso — VISTA: Inicio. Render puro (devuelve HTML), sin lógica de negocio.
window.Pulso = window.Pulso || {}; Pulso.views = Pulso.views || {};

Pulso.views.Inicio = {
  render() {
    return `
    <section class="view">
      <div class="hero container">
        <p class="hero__kicker">Monitoreo de condición física · Fútbol</p>
        <h1>El pulso de tu plantel, día a día.</h1>
        <p class="hero__tag">Registra el peso y la percepción de esfuerzo de cada jugador todos los días, suma las pruebas físicas semanales y consulta la evolución en un solo lugar.</p>
        <div class="hero__cta">
          <a class="btn btn--primary" href="#/registro">Registrar mi día</a>
          <a class="btn btn--ghost" href="#/panel">Ver panel del cuerpo técnico</a>
        </div>
        <svg class="ecg" viewBox="0 0 1200 150" preserveAspectRatio="none" aria-hidden="true">
          <path class="base" d="M0 75 H1200" />
          <path class="ecg__draw" d="M0 75 H150 l20 0 l14 -46 l22 92 l18 -120 l16 154 l14 -80 l12 20 H520 l18 0 l12 -34 l20 68 l16 -92 l14 118 l12 -60 l10 0 H900 l16 0 l12 -40 l20 80 l16 -108 l14 138 l12 -70 l10 0 H1200" />
        </svg>
      </div>

      <div class="section container">
        <h2 style="font-size:22px; margin-bottom:18px;">Módulos del sistema</h2>
        <div class="modules">
          <a class="module" href="#/registro">
            <span class="tag">Jugador</span>
            <h3>Registro diario</h3>
            <p>Captura de peso y percepción de esfuerzo (RPE) en menos de un minuto.</p>
            <span class="layer">Capa: Interfaz · Lógica de negocio</span>
          </a>
          <a class="module" href="#/panel">
            <span class="tag">Cuerpo técnico</span>
            <h3>Panel e informe</h3>
            <p>Informe semanal por jugador con tendencias y anotaciones del CT.</p>
            <span class="layer">Capa: Motor de informes · Interfaz</span>
          </a>
          <a class="module" href="#/pruebas">
            <span class="tag">Cuerpo técnico</span>
            <h3>Pruebas físicas</h3>
            <p>Carga de la batería semanal (sprint, salto, resistencia).</p>
            <span class="layer">Capa: Interfaz · Acceso a datos</span>
          </a>
          <a class="module" href="#/arquitectura">
            <span class="tag">Arquitectura</span>
            <h3>Vista de arquitectura</h3>
            <p>Cómo se organizan las capas y el patrón MVC del prototipo.</p>
            <span class="layer">Documentación del diseño</span>
          </a>
        </div>
      </div>
    </section>`;
  },
};
