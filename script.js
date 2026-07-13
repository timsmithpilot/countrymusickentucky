const buttons = document.querySelectorAll("[data-panel]");
const panels = document.querySelectorAll(".panel");
const closeButtons = document.querySelectorAll(".panel__close");

function openPanel(id) {
  const panel = document.getElementById(id);
  if (!panel) return;

  panels.forEach(item => {
    item.classList.remove("is-open");
    item.setAttribute("aria-hidden", "true");
  });

  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  document.body.classList.add("panel-open");

  const closeButton = panel.querySelector(".panel__close");
  closeButton?.focus();
}

function closePanels() {
  panels.forEach(panel => {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
  });
  document.body.classList.remove("panel-open");
}

buttons.forEach(button => {
  button.addEventListener("click", () => openPanel(button.dataset.panel));
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
