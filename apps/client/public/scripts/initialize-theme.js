(function initializeTheme() {
  try {
    if (
      localStorage.theme === "dark" ||
      // eslint-disable-next-line lingui/no-unlocalized-strings
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch {
    // pass
  }
})();
