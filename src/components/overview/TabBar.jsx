import { useTheme } from "../../theme/useTheme";

export default function TabBar({ tabs, active, onChange }) {
  const { theme: t } = useTheme();

  return (
    <div style={{ borderBottom: `1px solid ${t.border}`, display: "flex", gap: 0, overflowX: "auto" }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "10px 16px",
            fontSize: 12,
            fontWeight: active === tab ? 600 : 400,
            color: active === tab ? t.accent : t.textMuted,
            borderBottom: active === tab ? `2px solid ${t.accentStrong}` : "2px solid transparent",
            whiteSpace: "nowrap",
            transition: "all 0.15s",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
