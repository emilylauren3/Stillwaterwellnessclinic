document.querySelectorAll("[data-header]").forEach((header) => {
  const navToggle = header.querySelector("[data-nav-toggle]");
  const nav = header.querySelector("[data-nav]") || header.querySelector("#site-nav");

  if (!navToggle || !nav) return;

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});
