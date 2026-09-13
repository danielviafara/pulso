# Pulso — Monitoreo de peso, carga y condición física

Microproyecto de la asignatura **Arquitectura de Software** — Universidad Manuela Beltrán.

Pulso digitaliza el registro diario de **peso** y **percepción de esfuerzo (RPE)** de cada
jugador de un plantel de fútbol, junto con los resultados de las **pruebas físicas semanales**,
y consolida un informe por jugador sobre el cual el cuerpo técnico deja anotaciones.

Esta entrega corresponde a la **primera etapa (Front-End)**. No incluye base de datos, backend,
APIs ni despliegue: son fases posteriores del proyecto.

## Pantallas

- **Inicio** (`index.html`) — identidad del proyecto y acceso por rol.
- **Registro diario** (`registro.html`) — el jugador registra peso y RPE (escala 1–10).
- **Panel del CT** (`panel.html`) — lista del plantel, informe semanal por jugador y anotaciones.
- **Pruebas físicas** (`pruebas.html`) — carga de la batería de pruebas de la semana.

## Cómo ejecutarlo

No requiere instalación ni build. Abre `frontend/index.html` en el navegador,
o sírvelo con cualquier servidor estático:

```bash
cd frontend
python3 -m http.server 5173
# luego abre http://localhost:5173
```

## Estructura

```
Pulso/
└── frontend/
    ├── index.html        # inicio
    ├── registro.html     # registro diario del jugador
    ├── panel.html        # panel del cuerpo técnico
    ├── pruebas.html      # pruebas físicas semanales
    ├── css/styles.css    # sistema de diseño
    ├── js/               # comportamiento por pantalla
    └── assets/           # favicon e íconos
```

## Tecnología

HTML, CSS y JavaScript sin dependencias ni framework de build. Tipografías Inter y
Space Grotesk (Google Fonts). Los datos que se ven son de muestra; la persistencia
llegará en las siguientes entregas.

## Autor

Daniel Eduardo Viafara Guacaneme — Ingeniería de Software, quinto semestre.
