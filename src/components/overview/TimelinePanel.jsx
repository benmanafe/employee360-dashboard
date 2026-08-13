import { useTheme } from "../../theme/useTheme";
import Panel from "../common/Panel";
import SectionTitle from "../common/SectionTitle";

export default function TimelinePanel({ events }) {
  const { theme: t } = useTheme();

  return (
    <Panel>
      <SectionTitle>TIMELINE KEJADIAN PENTING</SectionTitle>
      <div style={{ position: "relative", paddingLeft: 16 }}>
        <div style={{ position: "absolute", left: 6, top: 8, bottom: 8, width: 1, background: t.border }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {events.map((ev) => (
            <div key={ev.date} style={{ display: "flex", gap: 10, position: "relative" }}>
              <div style={{ position: "absolute", left: -16, top: 4, width: 10, height: 10, borderRadius: "50%", background: ev.color, border: `2px solid ${t.surface}`, zIndex: 1 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: t.textMuted, marginBottom: 2 }}>{ev.date}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: t.textStrong, marginBottom: 2 }}>{ev.title}</div>
                <div style={{ fontSize: 11, color: t.textSecondary, lineHeight: 1.4 }}>{ev.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
