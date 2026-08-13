import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useEmployerData } from "./hooks/useEmployerData";
import { useTheme } from "./theme/useTheme";
import Sidebar from "./components/layout/Sidebar";
import TopHeader from "./components/layout/TopHeader";
import Panel from "./components/common/Panel";
import CompanyProfileCard from "./components/overview/CompanyProfileCard";
import TabBar from "./components/overview/TabBar";
import RiskSummary from "./components/overview/RiskSummary";
import WorkerTrendPanel from "./components/overview/WorkerTrendPanel";
import SalaryTrendPanel from "./components/overview/SalaryTrendPanel";
import ComplianceStatusPanel from "./components/overview/ComplianceStatusPanel";
import TimelinePanel from "./components/overview/TimelinePanel";
import WorkforceComposition from "./components/overview/WorkforceComposition";
import AISummary from "./components/overview/AISummary";

const TABS = [
  "Overview",
  "Profil Perusahaan",
  "Tenaga Kerja",
  "Kepatuhan & Iuran",
  "Upah",
  "Riwayat Risiko",
  "Kejadian & Investigasi",
  "Catatan & Dokumen",
];

function LoadingState() {
  const { theme: t } = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, height: 320 }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", border: `3px solid ${t.border}`, borderTopColor: t.accentStrong, animation: "spin 0.8s linear infinite" }} />
      <div style={{ fontSize: 12, color: t.textSecondary }}>Memuat data employer…</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ErrorState({ onRetry }) {
  const { theme: t } = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, height: 320 }}>
      <div style={{ fontSize: 13, color: t.dangerText }}>Gagal memuat data employer.</div>
      <button
        onClick={onRetry}
        style={{ display: "flex", alignItems: "center", gap: 6, background: t.accentBg, border: `1px solid ${t.accentBorder}`, color: t.accent, padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
      >
        <RefreshCw size={13} />
        Coba Lagi
      </button>
    </div>
  );
}

function TabPlaceholder({ tab }) {
  const { theme: t } = useTheme();
  return (
    <Panel style={{ minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.textStrong, marginBottom: 6 }}>{tab}</div>
        <div style={{ fontSize: 11, color: t.textMuted }}>Modul ini belum tersedia.</div>
      </div>
    </Panel>
  );
}

export default function Employer360Dashboard() {
  const { data, loading, error, refresh } = useEmployerData();
  const { theme: t } = useTheme();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div style={{ display: "flex", height: "100vh", background: t.pageBg, color: t.text, fontFamily: "'Inter', system-ui, sans-serif", overflow: "hidden" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopHeader lastUpdated={data?.lastUpdated} onRefresh={refresh} />

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
          {loading && <LoadingState />}
          {error && <ErrorState onRetry={refresh} />}
          {data && (
            <>
              <CompanyProfileCard company={data.company} risk={data.risk} />
              <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

              {activeTab !== "Overview" ? (
                <TabPlaceholder tab={activeTab} />
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr 1fr", gap: 16 }}>
                    <RiskSummary items={data.riskItems} />
                    <WorkerTrendPanel trend={data.workerTrend} label={data.snapshotLabel} />
                    <SalaryTrendPanel trend={data.salaryTrend} label={data.snapshotLabel} />
                    <ComplianceStatusPanel months={data.complianceMonths} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1.3fr", gap: 16 }}>
                    <TimelinePanel events={data.timeline} />
                    <WorkforceComposition workforce={data.workforce} total={data.totalWorkers} label={data.snapshotLabel} />
                    <AISummary summary={data.aiSummary} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
