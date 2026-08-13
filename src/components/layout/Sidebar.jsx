import {
  AlertCircle,
  AlertTriangle,
  BarChart2,
  Brain,
  Building2,
  FileSearch,
  FileText,
  LayoutDashboard,
  Map,
  Settings,
  Shield,
} from "lucide-react";
import { useTheme } from "../../theme/useTheme";
import bpjsLogo from "../../assets/bpjs_logo/BPJS_Ketenagakerjaan_idnYNJg5Qq_1.svg";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Building2, label: "Employer Registry" },
  { icon: Shield, label: "Employer 360°", active: true },
  { icon: AlertTriangle, label: "Risk Scoring" },
  { icon: AlertCircle, label: "Early Warning" },
  { icon: Map, label: "Risk Map" },
  { icon: BarChart2, label: "Sector Intelligence" },
  { icon: Brain, label: "Predictive Analytics" },
  { icon: FileSearch, label: "Investigation Workspace" },
  { icon: FileText, label: "Reports & Intelligence" },
];

export default function Sidebar() {
  const { theme: t } = useTheme();

  return (
    <aside style={{ width: 200, background: t.surfaceAlt, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "16px 12px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={bpjsLogo} alt="BPJS Ketenagakerjaan" style={{ height: 44, width: "auto", maxWidth: "100%" }} />
      </div>

      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {navItems.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 16px",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: active ? 600 : 400,
              color: active ? t.accent : t.textSecondary,
              background: active ? t.accentSoftBg : "transparent",
              borderLeft: active ? `3px solid ${t.accentStrong}` : "3px solid transparent",
              transition: "all 0.15s",
            }}
          >
            <Icon size={15} />
            <span>{label}</span>
          </div>
        ))}
      </nav>

      <div style={{ borderTop: `1px solid ${t.border}`, padding: "10px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", cursor: "pointer", fontSize: 12, color: t.textSecondary }}>
          <Settings size={15} />
          <span>Pengaturan</span>
        </div>
      </div>
    </aside>
  );
}
