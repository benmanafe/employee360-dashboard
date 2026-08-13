import { Brain } from "lucide-react";
import { useTheme } from "../../theme/useTheme";

export default function AISummary({ summary }) {
  const { theme: t } = useTheme();

  return (
    <div style={{ background: t.surfaceBlue, border: `1px solid ${t.borderBlue}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <div style={{ width: 22, height: 22, background: t.accentStrong, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Brain size={12} color="white" />
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: t.accent }}>AI SUMMARY</div>
      </div>
      <div style={{ fontSize: 10, color: t.textFaint, marginBottom: 12 }}>Ringkasan otomatis berdasarkan data & analisis risiko</div>
      <p style={{ margin: "0 0 14px", fontSize: 12, color: t.textBody, lineHeight: 1.6 }}>{summary.text}</p>

      <div style={{ background: t.surfaceBlueInner, borderRadius: 8, padding: "12px 14px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.warningText, marginBottom: 8, letterSpacing: "0.06em" }}>REKOMENDASI</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {summary.recommendations.map((rec, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: t.textStrong }}>
              <span style={{ color: t.warningText, marginTop: 1, flexShrink: 0 }}>•</span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
