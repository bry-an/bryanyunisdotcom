export const THEME_KEY = "theme";

/**
 * Runs in <head> before first paint so a saved choice never flashes the wrong theme.
 * With no saved choice the site follows the system setting (pure CSS).
 */
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
