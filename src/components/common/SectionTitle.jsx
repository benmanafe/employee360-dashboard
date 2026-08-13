import { useTheme } from "../../theme/useTheme";

export default function SectionTitle({ children, subtitle }) {
  const { theme: t } = useTheme();

  return (
    <>
      <div style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, letterSpacing: "0.08em", marginBottom: subtitle ? 4 : 12 }}>
        {children}
      </div>
      {subtitle && <div style={{ fontSize: 10, color: t.textMuted, marginBottom: 12 }}>{subtitle}</div>}
    </>
  );
}
