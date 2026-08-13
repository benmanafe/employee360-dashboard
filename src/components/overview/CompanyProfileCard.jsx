import { useTheme } from "../../theme/useTheme";
import companyLogo from "../../assets/company_logo.svg";

export default function CompanyProfileCard({ company, risk }) {
  const { theme: t } = useTheme();

  const fields = [
    ["NPP", company.npp],
    ["NIB", company.nib],
    ["Klasar Klasifikasi", company.klasifikasi],
    ["Lokasi", company.lokasi],
    ["NPWP", company.npwp],
    ["Sektor Industri", company.sektor],
  ];

  return (
    <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ width: 100, height: 48, background: "#ffffff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${t.border}` }}>
        <img src={companyLogo} alt={company.name} style={{ width: 86, height: "auto" }} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: t.text }}>{company.name}</h2>
          <span style={{ background: t.successBadgeBg, color: t.successBadgeText, padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 600, border: `1px solid ${t.successBadgeBorder}` }}>{company.status}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: "4px 32px" }}>
          {fields.map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 10, color: t.textMuted }}>{k}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: t.textStrong }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, flexShrink: 0, alignItems: "stretch" }}>
        <div style={{ background: t.tierBg[risk.tier], border: `1px solid ${t.tierColor[risk.tier]}55`, borderRadius: 10, padding: "12px 20px", textAlign: "center", minWidth: 110 }}>
          <div style={{ fontSize: 10, color: t.tierColor[risk.tier], fontWeight: 600, marginBottom: 4 }}>SKOR RISIKO</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: t.tierColor[risk.tier], lineHeight: 1 }}>
            {risk.score}
            <span style={{ fontSize: 16, fontWeight: 500, color: t.tierColor[risk.tier] }}>/{risk.maxScore}</span>
          </div>
          <div style={{ fontSize: 12, color: t.tierColor[risk.tier], fontWeight: 700, marginTop: 4 }}>{risk.tier} Risk</div>
        </div>

        <div style={{ background: t.gradeBg?.[risk.grade] ?? t.dangerBg, border: `1px solid ${risk.gradeColor}55`, borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: t.textSecondary, fontWeight: 600, marginBottom: 4 }}>GRADE</div>
          <div style={{ width: 44, height: 44, background: risk.gradeColor, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: "white" }}>{risk.grade}</span>
          </div>
        </div>

        <div style={{ background: t.percentileBg, border: `1px solid ${t.borderBlue}`, borderRadius: 10, padding: "12px 20px", textAlign: "center", minWidth: 120 }}>
          <div style={{ fontSize: 10, color: t.textSecondary, fontWeight: 600, marginBottom: 4 }}>PERSENTIL NASIONAL</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#f97316" }}>Top {risk.percentile}%</div>
          <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>Dari seluruh employer</div>
        </div>
      </div>
    </div>
  );
}
