import { useTheme } from "../../theme/useTheme";
import ComplianceIcon from "../common/ComplianceIcon";
import Panel from "../common/Panel";
import SectionTitle from "../common/SectionTitle";

const LEGEND = [
  { color: "#ef4444", label: "Tunggakan" },
  { color: "#ca8a04", label: "Terlambat" },
  { color: "#16a34a", label: "Lunas" },
];

export default function ComplianceStatusPanel({ months }) {
  const { theme: t } = useTheme();

  return (
    <Panel>
      <SectionTitle subtitle="6 Bulan Terakhir">STATUS KEPATUHAN IURAN</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px 8px" }}>
        {months.map((m) => (
          <div key={m.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, color: t.textMuted, marginBottom: 6, lineHeight: 1.2 }}>{m.label}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ComplianceIcon status={m.status} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "center", flexWrap: "wrap" }}>
        {LEGEND.map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: t.textSecondary }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
            {label}
          </div>
        ))}
      </div>
    </Panel>
  );
}
