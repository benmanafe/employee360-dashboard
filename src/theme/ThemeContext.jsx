import { useEffect, useRef, useState } from "react";
import { themes } from "./themes";
import { ThemeContext } from "./themeContext";

export default function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => {
    try {
      return localStorage.getItem("bpjs-theme") ?? "dark";
    } catch {
      return "dark";
    }
  });

  const [wipeColor, setWipeColor] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = themeName;
    try {
      localStorage.setItem("bpjs-theme", themeName);
    } catch {
      /* ignore */
    }
  }, [themeName]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const theme = themes[themeName] ?? themes.dark;

  const toggle = () => {
    setWipeColor(themes[themeName].pageBg);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setWipeColor(null), 0);
    setThemeName((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggle }}>
      {wipeColor && (
        <div
          key={wipeColor}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "none",
            background: wipeColor,
            animation: "theme-wipe 0.45s ease-in forwards",
          }}
        />
      )}
      {children}
    </ThemeContext.Provider>
  );
}
