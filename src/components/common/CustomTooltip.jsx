import { useTheme } from "../../theme/useTheme";

export default function CustomTooltip({ active, payload, label, prefix = "", suffix = "" }) {
  const { theme: t } = useTheme();

  if (active && payload && payload.length) {
    return (
      <div style={{ background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}`, borderRadius: 6, padding: "6px 12px", fontSize: 12, color: t.text }}>
        <div style={{ color: t.textSecondary, marginBottom: 2 }}>{label}</div>
        <div style={{ fontWeight: 700 }}>
          {prefix}
          {payload[0].value}
          {suffix}
        </div>
      </div>
    );
  }
  return null;
}
