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
  const storageKey = "stillwaterDirectBillingNoticeDismissed";

  if (window.localStorage.getItem(storageKey) === "true") return;

  const closePopup = () => {
    popup.classList.remove("is-visible");
    popup.setAttribute("aria-hidden", "true");
    window.localStorage.setItem(storageKey, "true");
  };

  window.setTimeout(() => {
    popup.classList.add("is-visible");
    popup.setAttribute("aria-hidden", "false");
  }, 500);

  closeButton?.addEventListener("click", closePopup);

  popup.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", closePopup);
  });

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

const telusPopover = document.querySelector("[data-telus-popover]");
const telusTriggers = document.querySelectorAll("[data-telus-trigger]");

if (telusPopover && telusTriggers.length) {
  let activeTrigger = null;
  let closeTimer;

  const closeTelusPopover = () => {
    window.clearTimeout(closeTimer);
    telusPopover.hidden = true;
    activeTrigger?.setAttribute("aria-expanded", "false");
    activeTrigger = null;
  };

  const openTelusPopover = (trigger) => {
    window.clearTimeout(closeTimer);
    activeTrigger?.setAttribute("aria-expanded", "false");
    activeTrigger = trigger;
    trigger.setAttribute("aria-expanded", "true");
    telusPopover.hidden = false;

    const triggerBounds = trigger.getBoundingClientRect();
    const panelBounds = telusPopover.getBoundingClientRect();
    const left = Math.max(12, Math.min(triggerBounds.left, window.innerWidth - panelBounds.width - 12));
    const below = triggerBounds.bottom + 8;
    const top = below + panelBounds.height <= window.innerHeight - 12
      ? below
      : Math.max(12, triggerBounds.top - panelBounds.height - 8);

    telusPopover.style.left = `${left}px`;
    telusPopover.style.top = `${top}px`;
  };

  telusTriggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", () => openTelusPopover(trigger));
    trigger.addEventListener("mouseleave", () => {
      closeTimer = window.setTimeout(closeTelusPopover, 180);
    });
    trigger.addEventListener("click", (event) => {
      if (activeTrigger !== trigger) {
        openTelusPopover(trigger);
      } else if (event.detail === 0) {
        closeTelusPopover();
      }
    });
  });

  telusPopover.addEventListener("mouseenter", () => window.clearTimeout(closeTimer));
  telusPopover.addEventListener("mouseleave", closeTelusPopover);
  telusPopover.querySelector("[data-telus-close]")?.addEventListener("click", closeTelusPopover);
  document.addEventListener("pointerdown", (event) => {
    if (!telusPopover.contains(event.target) && !event.target.closest("[data-telus-trigger]")) {
      closeTelusPopover();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !telusPopover.hidden) {
      closeTelusPopover();
    }
  });
  window.addEventListener("scroll", closeTelusPopover, { passive: true });
  window.addEventListener("resize", closeTelusPopover);
}
