import {
  BadgePlus,
  BadgePlusIcon,
  ChartNoAxesCombined,
  FilePlus2,
  NotebookPen,
  RefreshCcw,
  Send,
} from "lucide-react";
import React from "react";

const activities = [
  {
    icon: <ChartNoAxesCombined />,
    action: "Aufgabe erledigt",
    info: "„Design-Entwurf finalisieren“",
    time: "vor 10 Min.",
  },
  {
    icon: <BadgePlus />,
    action: "Tag hinzugefügt",
    info: "Tag: Dringend",
    time: "vor 25 Min.",
  },
  {
    icon: <NotebookPen />,
    action: "Notiz erstellt",
    info: "„Feedback mit Team teilen“",
    time: "vor 40 Min.",
  },
  {
    icon: <RefreshCcw />,
    action: "Aufgabe bearbeitet",
    info: "Titel geändert zu „Rechnung prüfen“",
    time: "vor 1 Std.",
  },
  {
    icon: <BadgePlusIcon />,
    action: "Aufgabe erstellt",
    info: "„Kundenpräsentation vorbereiten“",
    time: "vor 2 Std.",
  },
  {
    icon: <RefreshCcw />,
    action: "Status geändert",
    info: "Aufgabe „Landingpage bauen“ auf In Bearbeitung gesetzt",
    time: "vor 4 Std.",
  },
  {
    icon: <Send />,
    action: "Mitglied eingeladen",
    info: "Benutzer: Anna Schmidt",
    time: "vor 1 Tag",
  },
  {
    icon: <FilePlus2 />,
    action: "Datei hochgeladen",
    info: "„Projekt-Plan.pdf“",
    time: "vor 2 Tagen",
  },
  {
    icon: <RefreshCcw />,
    action: "Projektname geändert",
    info: "Neuer Name: „Kundenportal V2“",
    time: "vor 3 Tagen",
  },
];

export default function Activities() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Letzte Aktivitäten</h2>
      <div className="flex flex-col gap-2">
        {activities.map((a, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-2 border-b last:border-b-0"
          >
            <div className="w-7 h-7 flex items-center justify-center bg-muted rounded-full">
              <span className="text-chart-2">{a.icon}</span>
            </div>
            <div className="flex-1">
              <div className="font-medium">{a.action}</div>
              <div className="text-sm text-muted-foreground">{a.info}</div>
            </div>
            <div className="text-xs text-muted-foreground min-w-[72px] text-right">
              {a.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
