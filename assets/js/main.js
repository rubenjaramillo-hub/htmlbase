/* AULA/LAB — interacciones sin dependencias externas. */
(() => {
  "use strict";
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const menuToggle = $("#menuToggle");
  const sidebar = $("#sidebar");
  menuToggle?.addEventListener("click", () => {
    const open = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar navegación" : "Abrir navegación");
  });
  $$(".side-link").forEach(link => link.addEventListener("click", () => {
    sidebar.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  // Cambio de tema con preferencia guardada localmente.
  const themeToggle = $("#themeToggle");
  const storedTheme = localStorage.getItem("aula-theme");
  if (storedTheme === "dark") document.body.classList.add("dark-theme");
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("aula-theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    toast(document.body.classList.contains("dark-theme") ? "Tema nocturno activado" : "Tema claro activado");
  });

  // Revelado progresivo al entrar en pantalla.
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(item => revealObserver.observe(item));
  } else revealItems.forEach(item => item.classList.add("is-visible"));

  // Seguimiento de secciones visitadas.
  const sections = $$("[data-track]");
  const visited = new Set(["inicio"]);
  const progressLabel = $("#sideProgress");
  const progressBar = $("#sideProgressBar");
  const navLinks = $$(".side-link");
  const updateProgress = () => {
    const count = visited.size;
    progressLabel.textContent = `${String(count).padStart(2, "0")} / 04`;
    progressBar.style.width = `${count / 4 * 100}%`;
  };
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.track;
          visited.add(id);
          navLinks.forEach(link => link.classList.toggle("is-active", link.dataset.section === id));
          updateProgress();
        }
      });
    }, { threshold: 0.35 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Buscador de tarjetas.
  const search = $("#moduleSearch");
  const cards = $$(".module-card");
  const emptyState = $("#emptyState");
  const moduleCount = $("#moduleCount");
  search?.addEventListener("input", () => {
    const term = search.value.trim().toLocaleLowerCase("es");
    let visible = 0;
    cards.forEach(card => {
      const haystack = `${card.dataset.title} ${card.dataset.tags} ${card.textContent}`.toLocaleLowerCase("es");
      const match = haystack.includes(term);
      card.hidden = !match;
      if (match) visible++;
    });
    moduleCount.textContent = String(visible).padStart(2, "0");
    emptyState.hidden = visible !== 0;
  });

  // Diálogo de detalle: base para montar los contenidos reales de cada módulo.
  const details = {
    fundamentos: ["01", "Fundamentos y contexto", "Aquí puedes desarrollar el marco conceptual, activar conocimientos previos y presentar los problemas centrales de la unidad."],
    modelos: ["02", "Modelos de diseño", "Aquí puedes incluir fichas comparativas, diagramas SVG, líneas de tiempo y selectores para explorar los modelos instruccionales."],
    experiencias: ["03", "Diseño de experiencias", "Aquí puedes construir actividades, secuencias, casos, simulaciones y herramientas para tomar decisiones de diseño."],
    accesibilidad: ["04", "Accesibilidad y evaluación", "Aquí puedes incorporar criterios WCAG, principios DUA, rúbricas, listas de verificación y evaluación formativa."]
  };
  const dialog = $("#detailDialog");
  const dialogTitle = $("#dialogTitle");
  const dialogNumber = $("#dialogNumber");
  const dialogDescription = $("#dialogDescription");
  $$("[data-open]").forEach(button => button.addEventListener("click", () => {
    const detail = details[button.dataset.open];
    if (!detail) return;
    [dialogNumber.textContent, dialogTitle.textContent, dialogDescription.textContent] = detail;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else toast("Tu navegador no admite ventanas de diálogo nativas.");
  }));
  $("#dialogClose")?.addEventListener("click", () => dialog.close());
  $("#dialogDone")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  // Acordeón accesible.
  $$(".accordion-trigger").forEach(trigger => trigger.addEventListener("click", () => {
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
    $("span", trigger).textContent = expanded ? "＋" : "−";
  }));

  // Enlaces de ejemplo: evita navegar a # y comunica que deben personalizarse.
  $$("[data-demo-link]").forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    toast("Enlace de muestra: reemplázalo por la URL de tu recurso.");
  }));

  $("#profileButton")?.addEventListener("click", () => toast("Personaliza este espacio con el perfil o los datos del participante."));
  $("#year").textContent = new Date().getFullYear();

  let toastTimer;
  function toast(message) {
    const element = $("#toast");
    if (!element) return;
    element.textContent = message;
    element.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove("is-visible"), 2600);
  }
})();
