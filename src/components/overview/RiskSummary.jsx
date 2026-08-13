import { useTheme } from "../../theme/useTheme";
import auditIcon from "../../assets/icons/audit.svg?raw";
import complianceAuditIcon from "../../assets/icons/compliance-audit.svg?raw";
import riskAnalysisIcon from "../../assets/icons/risk-analysis-outline.svg?raw";
import trendTwoIcon from "../../assets/icons/trend-two.svg?raw";
import workforceIcon from "../../assets/icons/workforce-management.svg?raw";
import Panel from "../common/Panel";
import RiskBadge from "../common/RiskBadge";
import SectionTitle from "../common/SectionTitle";

const ICONS = {
  audit: auditIcon,
  "compliance-audit": complianceAuditIcon,
  "risk-analysis-outline": riskAnalysisIcon,
  "trend-two": trendTwoIcon,
  "workforce-management": workforceIcon,
};

function RiskIcon({ icon, color }) {
  const svg = ICONS[icon];
  if (svg) {
    return <div style={{ color, fontSize: 16, display: "flex" }} dangerouslySetInnerHTML={{ __html: svg }} />;
  }
  return <>{icon}</>;
}

export default function RiskSummary({ items }) {
  const { theme: t } = useTheme();

  return (
    <Panel>
      <SectionTitle>RINGKASAN RISIKO</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <div style={{ width: 28, height: 28, background: t.riskIconBg?.[item.level] ?? item.bg, border: `1px solid ${item.color}33`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>
                <RiskIcon icon={item.icon} color={item.color} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: t.textStrong }}>{item.label}</div>
                <div style={{ fontSize: 10, color: t.textMuted, lineHeight: 1.3 }}>{item.sublabel}</div>
              </div>
            </div>
            <RiskBadge level={item.level} color={item.color} />
          </div>
        ))}
      </div>
    </Panel>
  );
}
