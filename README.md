# Pulso — Monitoreo de peso, carga y condición física

Microproyecto de la asignatura **Arquitectura de Software** — Universidad Manuela Beltrán.

Pulso digitaliza el registro diario de **peso** y **percepción de esfuerzo (RPE)** de cada
jugador de un plantel de fútbol, junto con los resultados de las **pruebas físicas semanales**,
y consolida un informe por jugador sobre el cual el cuerpo técnico deja anotaciones.

## Avance — Fase 2 (prototipo estructurado)

Sobre la interfaz de la Fase 1, esta fase evoluciona el prototipo hacia una estructura de
software coherente con la arquitectura seleccionada:

- La interfaz se reorganizó bajo el patrón **Modelo–Vista–Controlador (MVC)**.
- Se unificó en una sola aplicación con **navegación por rutas** (router SPA por hash).
- Se implementaron las **pantallas principales**: inicio, registro diario, panel del CT y pruebas físicas.
- Se añadió una vista de **Arquitectura** que representa visualmente las capas y el mapeo MVC.
- Un **motor de informes** (modelo) agrega peso, RPE y pruebas en el informe semanal por jugador.
- Los **datos de prueba** viven en una capa de acceso a datos simulada (`js/data/store.js`).

No incluye todavía base de datos ni lógica de negocio completa: llegan en fases posteriores.

**Trazabilidad:** Fase 1 (idea y prototipo inicial) -> **Fase 2 (prototipo estructurado en MVC)** -> Fases posteriores (implementación funcional).

## Pantallas

- **Inicio** (`#/`) — identidad del proyecto y mapa de módulos.
- **Registro diario** (`#/registro`) — el jugador registra peso y RPE (escala 1–10).
- **Panel del CT** (`#/panel`) — plantel, informe semanal por jugador y anotaciones.
- **Pruebas físicas** (`#/pruebas`) — carga de la batería de pruebas de la semana.
- **Arquitectura** (`#/arquitectura`) — capas del sistema y organización MVC del código.

## Arquitectura

Arquitectura **por capas** con seguridad transversal, y la interfaz organizada en **MVC**:

| Capa | Rol | En el código |
|------|-----|--------------|
| Interfaz de usuario | Pantallas | `js/views/` (Vista) |
| Lógica de negocio | Reglas y validaciones | `js/models/` (Modelo) |
| Motor de informes | Agregación del informe semanal | `js/models/` (Modelo) |
| Acceso a datos | Aísla el origen de los datos | `js/data/store.js` |
| Base de datos | Persistencia (fase posterior) | pendiente |
| Seguridad y roles | Transversal a todas las capas | pendiente |

La coordinación (eventos + navegación) vive en `js/controllers/` y `js/router.js` (Controlador).

## Estructura del proyecto

```
Pulso/
└── frontend/
    ├── index.html            # shell de la app (SPA)
    ├── css/styles.css        # sistema de diseño
    └── js/
        ├── app.js            # bootstrap
        ├── router.js         # navegación por rutas
        ├── data/store.js     # acceso a datos (datos de prueba)
        ├── models/           # Modelo: datos, reglas, motor de informes
        ├── views/            # Vista: render de cada pantalla
        └── controllers/      # Controlador: conecta modelo y vista
```

## Cómo ejecutarlo

No requiere instalación ni build:

```bash
cd frontend
python3 -m http.server 5173
# abre http://localhost:5173
```

## Tecnología

HTML, CSS y JavaScript sin dependencias ni framework de build. Tipografías Inter y
Space Grotesk (Google Fonts). Los datos son de prueba; la persistencia llegará en las
siguientes entregas.

## Autor

Daniel Viafara — Ingeniería de Software, quinto semestre.
Juan Quijano - Ingenieria de Software, quinto semestre.
