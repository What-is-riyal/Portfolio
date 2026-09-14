(() => {
  const checkpoints = {
    "0": { record: "1 wolf · 2 village", win: 33.3, exile: 66.7, self: 70.3, peer: 86.1, distortion: 15.3, misdirection: 61.1, fabrication: 11.3 },
    "19": { record: "2 wolf · 1 village", win: 66.7, exile: 50.0, self: 74.4, peer: 86.0, distortion: 15.0, misdirection: 71.8, fabrication: 3.7 },
    "39": { record: "3 wolf · 0 village", win: 100, exile: 0, self: 52.4, peer: 72.5, distortion: 13.6, misdirection: 59.4, fabrication: 3.7 },
    "59": { record: "3 wolf · 0 village", win: 100, exile: 0, self: 60.9, peer: 84.6, distortion: 21.3, misdirection: 59.4, fabrication: 6.7 }
  };

  document.querySelectorAll("[data-werewolf-explorer]").forEach((root) => {
    const buttons = [...root.querySelectorAll("[data-checkpoint]")];
    const update = (step) => {
      const point = checkpoints[step];
      if (!point) return;
      buttons.forEach((button) => button.setAttribute("aria-selected", String(button.dataset.checkpoint === step)));
      root.querySelectorAll("[data-value]").forEach((node) => {
        const key = node.dataset.value;
        node.textContent = key === "record" ? point[key] : `${point[key].toFixed(point[key] % 1 ? 1 : 0)}%`;
      });
      root.querySelectorAll("[data-bar]").forEach((node) => node.style.setProperty("--bar", `${point[node.dataset.bar]}%`));
    };
    buttons.forEach((button) => button.addEventListener("click", () => update(button.dataset.checkpoint)));
    update("0");
  });

  document.querySelectorAll("[data-switcher]").forEach((root) => {
    const buttons = [...root.querySelectorAll("[data-panel-target]")];
    const panels = [...root.querySelectorAll(".ais-panel")];
    buttons.forEach((button) => button.addEventListener("click", () => {
      const target = button.dataset.panelTarget;
      buttons.forEach((item) => item.setAttribute("aria-selected", String(item === button)));
      panels.forEach((panel) => { panel.hidden = panel.id !== target; });
    }));
  });
})();
