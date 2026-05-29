export type Theme = "azul" | "naranja" | "verde";

/**
 * Color de marca por ruta.
 * - azul    = tema por defecto (cobalt)
 * - naranja = tema cálido (data-theme="naranja")
 * Las rutas no listadas usan DEFAULT_THEME.
 */
export const THEME_BY_PATH: Record<string, Theme> = {
  "/": "naranja",
  "/equipment": "azul",
  "/artists": "verde",
  "/contact": "naranja",
};

export const DEFAULT_THEME: Theme = "azul";

export function themeForPath(path: string): Theme {
  return THEME_BY_PATH[path] ?? DEFAULT_THEME;
}
