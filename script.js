const panelButtons = document.querySelectorAll("[data-panel]");
const panels = document.querySelectorAll(".panel");
const closeButtons = document.querySelectorAll(".panel__close");
const accordionItems = document.querySelectorAll("#artist-accordion details");

let lastTrigger = null;

function openPanel(id, trigger) {
  const panel = document.getElementById(id);
  if (!panel) return;

  lastTrigger = trigger || null;

  panels.forEach(item => {
    item.classList.remove("is-open");
    item.setAttribute("aria-hidden", "true");
  });

  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  document.body.classList.add("panel-open");
  panel.scrollTop = 0;

  window.setTimeout(() => {
    panel.querySelector(".panel__close")?.focus();
  }, 100);
}

function closePanels() {
  panels.forEach(panel => {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
  });

  document.body.classList.remove("panel-open");

  if (lastTrigger) {
    window.setTimeout(() => lastTrigger.focus(), 100);
  }
}

panelButtons.forEach(button => {
  button.addEventListener("click", () => openPanel(button.dataset.panel, button));
});

closeButtons.forEach(button => {
  button.addEventListener("click", closePanels);
});

panels.forEach(panel => {
  panel.addEventListener("click", event => {
    if (event.target === panel) closePanels();
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePanels();
});

accordionItems.forEach(item => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    accordionItems.forEach(otherItem => {
      if (otherItem !== item) otherItem.open = false;
    });
  });
});
