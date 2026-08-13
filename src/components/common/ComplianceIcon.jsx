import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

const STYLES = {
  overdue: { background: "#ef4444", Icon: AlertCircle },
  late: { background: "#ca8a04", Icon: Clock },
  lunas: { background: "#16a34a", Icon: CheckCircle2 },
};

export default function ComplianceIcon({ status }) {
  const { background, Icon } = STYLES[status] ?? STYLES.lunas;
  return (
    <div style={{ width: 34, height: 34, borderRadius: "50%", background, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon size={18} color="white" />
    </div>
  );
}
