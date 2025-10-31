(function initializeTheme() {
  try {
    // Default to light mode unless user explicitly chose dark
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      // Set light as default if no preference exists
      if (!localStorage.theme) {
        localStorage.theme = "light";
      }
    }
  } catch {
    // pass
  }
})();
