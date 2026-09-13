// Pulso — comportamiento compartido a todas las páginas

// Año dinámico en el pie de página
document.querySelectorAll("#year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Menú de navegación en móvil
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// Utilidad: mostrar un aviso (toast) reutilizable
window.showToast = function (message) {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toastMsg");
  if (!toast) return;
  if (msg && message) msg.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
};
