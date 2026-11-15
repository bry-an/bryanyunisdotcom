export const THEME_KEY = "theme";

/** <meta name="color-scheme"> content when following the system. */
export const SYSTEM_SCHEME = "light dark";

/**
 * Runs in <head>, right after <meta name="color-scheme">, before first paint, so a
 * saved override never flashes the wrong scheme. With no saved override the meta
 * stays "light dark" and the site follows the system setting (pure CSS).
 */
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.querySelector('meta[name="color-scheme"]').content=t}catch(e){}`;
