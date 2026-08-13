import { useTheme } from "../../theme/useTheme";
import DonutChart from "../common/DonutChart";
import Panel from "../common/Panel";
import SectionTitle from "../common/SectionTitle";

export default function WorkforceComposition({ workforce, total, label }) {
  const { theme: t } = useTheme();

  return (
    <Panel>
      <SectionTitle subtitle={label}>KOMPOSISI TENAGA KERJA</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <DonutChart data={workforce} total={total} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
          {workforce.map((w) => (
            <div key={w.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: w.color }} />
                <span style={{ color: t.textSecondary }}>{w.label}</span>
              </div>
              <span style={{ color: t.textStrong, fontWeight: 600 }}>
                {w.count.toLocaleString()} ({w.pct}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
