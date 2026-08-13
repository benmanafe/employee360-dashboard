export default function RiskBadge({ level, color }) {
  return (
    <span
      style={{
        background: `${color}22`,
        color,
        padding: "2px 7px",
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 700,
        whiteSpace: "nowrap",
        border: `1px solid ${color}44`,
        flexShrink: 0,
      }}
    >
      {level}
    </span>
  );
}
