import { TrendingDown, TrendingUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatPct, formatRupiahShort } from "../../lib/format";
import { niceCeil } from "../../lib/calculations";
import { useTheme } from "../../theme/useTheme";
import CustomTooltip from "../common/CustomTooltip";
import Panel from "../common/Panel";
import SectionTitle from "../common/SectionTitle";

export default function SalaryTrendPanel({ trend, label }) {
  const { theme: t } = useTheme();
  const domainMax = niceCeil(Math.max(...trend.series.map((p) => p.value)), 1);
  const isDown = trend.yoy < 0;
  const DeltaIcon = isDown ? TrendingDown : TrendingUp;

  return (
    <Panel>
      <SectionTitle subtitle="12 Bulan Terakhir">TREND RATA-RATA UPAH</SectionTitle>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: t.text }}>{formatRupiahShort(trend.currentRupiah)}</span>
        <span style={{ fontSize: 11, color: t.textMuted }}>{label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
        <DeltaIcon size={13} color={isDown ? "#ef4444" : "#22c55e"} />
        <span style={{ fontSize: 12, fontWeight: 700, color: isDown ? "#ef4444" : "#22c55e" }}>
          {isDown ? "▼" : "▲"} {formatPct(Math.abs(trend.yoy))}
        </span>
        <span style={{ fontSize: 10, color: t.textMuted }}>vs {trend.baselineLabel}</span>
      </div>
      <ResponsiveContainer width="100%" height={110}>
        <LineChart data={trend.series} margin={{ top: 0, right: 4, left: -30, bottom: 0 }}>
          <XAxis dataKey="month" tick={{ fill: t.textMuted, fontSize: 9 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: t.textMuted, fontSize: 9 }} axisLine={false} tickLine={false} domain={[0, domainMax]} tickCount={5} tickFormatter={(v) => `${v} Jt`} />
          <Tooltip content={<CustomTooltip suffix=" Jt" />} />
          <Line type="monotone" dataKey="value" stroke={trend.color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Panel>
  );
}
