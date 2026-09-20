// Pulso — Bootstrap de la aplicación.
window.Pulso = window.Pulso || {};

// Aviso (toast) reutilizable por los controladores
Pulso.toast = function (message) {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toastMsg");
  if (!toast) return;
  if (msg && message) msg.textContent = message;
  toast.classList.add("show");
  clearTimeout(Pulso.__toastTimer);
  Pulso.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
};

document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  Pulso.router.start();
});
