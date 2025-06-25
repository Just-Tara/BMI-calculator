 let selectedTheme = localStorage.getItem("theme") || "default";

  if (selectedTheme !== "default") {
    document.body.classList.add(`${selectedTheme}-theme`);
  }