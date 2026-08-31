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

document.querySelectorAll("[data-launch-popup]").forEach((popup) => {
  const closeButton = popup.querySelector("[data-launch-popup-close]");
  const storageKey = "stillwaterLaunchPopupDismissed";

  if (window.sessionStorage.getItem(storageKey) === "true") return;

  const closePopup = () => {
    popup.classList.remove("is-visible");
    popup.setAttribute("aria-hidden", "true");
    window.sessionStorage.setItem(storageKey, "true");
  };

  window.setTimeout(() => {
    popup.classList.add("is-visible");
    popup.setAttribute("aria-hidden", "false");
  }, 500);

  closeButton?.addEventListener("click", closePopup);

  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup.classList.contains("is-visible")) {
      closePopup();
    }
  });
});
