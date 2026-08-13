import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import { formatDateTime } from "../../lib/format";
import { useTheme } from "../../theme/useTheme";
import ThemeToggle from "./ThemeToggle";

export default function TopHeader({ lastUpdated, onRefresh }) {
  const { theme: t } = useTheme();

  return (
    <header style={{ background: t.surfaceAlt, borderBottom: `1px solid ${t.border}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: t.textSecondary, fontSize: 13 }}>
        <ArrowLeft size={14} />
        <span style={{ cursor: "pointer" }}>Kembali ke Daftar Employer</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: t.text, letterSpacing: "0.02em" }}>EMPLOYER 360°</div>
        <div style={{ fontSize: 11, color: t.textMuted }}>Profil & Analisis Risiko Perusahaan</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <ThemeToggle />
        <div style={{ fontSize: 11, color: t.textMuted, textAlign: "right" }}>
          <div>Terakhir diperbarui</div>
          <div>{lastUpdated ? formatDateTime(lastUpdated) : "—"}</div>
        </div>
        <button onClick={onRefresh} style={{ background: "transparent", border: "none", cursor: "pointer", color: t.textSecondary }} aria-label="Muat ulang data">
          <RefreshCw size={15} />
        </button>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: t.accentBg, border: `1px solid ${t.accentBorder}`, color: t.accent, padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          <Download size={13} />
          Unduh Laporan
        </button>
      </div>
    </header>
  );
}
