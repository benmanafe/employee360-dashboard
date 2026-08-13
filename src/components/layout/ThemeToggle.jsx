import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../theme/useTheme";

export default function ThemeToggle() {
  const { theme: t, themeName, toggle } = useTheme();
  const isDark = themeName === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Beralih ke tema terang" : "Beralih ke tema gelap"}
      title={isDark ? "Beralih ke tema terang" : "Beralih ke tema gelap"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: `1px solid ${t.border}`,
        color: t.textSecondary,
        padding: 6,
        borderRadius: 6,
        cursor: "pointer",
      }}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
