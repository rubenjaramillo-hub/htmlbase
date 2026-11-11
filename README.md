# AULA/LAB — Proyecto base HTML, CSS y JavaScript

Plantilla de interfaz moderna y adaptable para construir un objeto de aprendizaje interactivo, un micrositio académico o un recurso digital para Moodle.

## Vista general

- Diseño editorial contemporáneo con navegación lateral.
- Composición visual con SVG propios, sin imágenes de stock.
- Animaciones suaves al entrar en pantalla y elementos flotantes.
- Diseño responsive para escritorio, tablet y móvil.
- Tema claro/nocturno con preferencia guardada.
- Buscador dinámico de módulos.
- Ventanas de detalle para módulos.
- Acordeón accesible y navegación por anclas.
- Indicador de progreso de secciones.
- Soporte para `prefers-reduced-motion`.
- HTML semántico y controles con etiquetas accesibles.

## Estructura

```text
Proyecto_Base_HTML_CSS_JS_Moderno/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   ├── base.css
    │   └── style.css
    ├── js/
    │   └── main.js
    └── img/
        └── mark.svg
```

## Cómo ejecutar

1. Descomprime el ZIP.
2. Abre `index.html` en un navegador moderno.
3. Para trabajar con recarga automática, abre la carpeta en Visual Studio Code y usa Live Server.

No requiere Node, npm, frameworks ni compilación. Google Fonts se carga desde CDN; si el recurso debe funcionar completamente sin conexión, descarga las fuentes y cambia las referencias del `<head>` por archivos locales.

## Dónde personalizar

- **Identidad visual:** variables CSS al inicio de `assets/css/base.css`.
- **Diseño y componentes:** `assets/css/style.css`.
- **Contenido y estructura:** `index.html`.
- **Interacciones:** `assets/js/main.js`.
- **Gráficos:** SVG incluidos directamente en el HTML o en `assets/img/`.

## Cómo añadir una nueva estación

Duplica un bloque `<article class="module-card">` en `#moduleGrid`, asigna `data-title` y `data-tags`, agrega su botón `data-open` y registra su contenido en el objeto `details` de `main.js`.

## Preparación para Moodle / SCORM

Esta es una base de interfaz front-end, todavía no contiene `imsmanifest.xml` ni un adaptador SCORM. Puedes desarrollar el contenido y, en una siguiente etapa, integrar la API SCORM 1.2 o 2004 y generar el manifiesto correspondiente.

## Licencia y referencia visual

Proyecto original creado para esta solicitud. Toma como referencia general el enfoque de sitios multipágina modernos, navegación clara, animaciones discretas, jerarquía tipográfica y componentes personalizables descritos por el repositorio [AHMAD-JX/Website-Template](https://github.com/AHMAD-JX/Website-Template). No reutiliza su código, imágenes ni recursos propietarios.
