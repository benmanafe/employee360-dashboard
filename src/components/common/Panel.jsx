import { useTheme } from "../../theme/useTheme";

export default function Panel({ children, style }) {
  const { theme: t } = useTheme();

  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 10,
        padding: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
