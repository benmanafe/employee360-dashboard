import { useTheme } from "../../theme/useTheme";

export default function DonutChart({ data, total }) {
  const { theme: t } = useTheme();
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 58;
  const innerR = 38;
  let startAngle = -Math.PI / 2;

  const slices = data.map((d) => {
    const angle = (d.pct / 100) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const endAngle = startAngle + angle;
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const ix1 = cx + innerR * Math.cos(startAngle);
    const iy1 = cy + innerR * Math.sin(startAngle);
    const ix2 = cx + innerR * Math.cos(endAngle);
    const iy2 = cy + innerR * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const path = [
      `M ${x1} ${y1}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1}`,
      "Z",
    ].join(" ");
    startAngle = endAngle;
    return { ...d, path };
  });

  return (
    <svg width={size} height={size}>
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} stroke={t.donutStroke} strokeWidth={2} />
      ))}
      <text x={cx} y={cy - 8} textAnchor="middle" fill={t.text} fontSize={20} fontWeight="700">
        {total.toLocaleString()}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill={t.textSecondary} fontSize={10}>
        Total Pekerja
      </text>
    </svg>
  );
}
