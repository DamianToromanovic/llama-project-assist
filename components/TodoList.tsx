import React from "react";

const tasks = [
  {
    id: 1,
    title: "Design finalisieren",
    status: "In Bearbeitung",
    deadline: "2025-05-25",
  },
  {
    id: 2,
    title: "Präsentation vorbereiten",
    status: "Zu erledigen",
    deadline: "2025-05-24",
  },
  {
    id: 3,
    title: "Kundenfeedback einholen",
    status: "Zu erledigen",
  },
  {
    id: 4,
    title: "API-Endpunkte testen",
    status: "Abgeschlossen",
    deadline: "2025-05-22",
  },
  {
    id: 5,
    title: "Sprint-Plan aktualisieren",
    status: "In Bearbeitung",
  },
];

function getDeadlineClass(deadline?: string): string {
  if (!deadline) return "text-gray-400";
  const today = new Date();
  const date = new Date(deadline);

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  const diff = Math.ceil(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff < 0) return "text-red-500 font-semibold";
  if (diff === 0) return "text-red-500 font-semibold";
  if (diff <= 2) return "text-orange-500 font-medium";
  return "text-green-600";
}

export default function TaskCards() {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-4 flex flex-col gap-2 border border-muted"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-base">{task.title}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-lg ${
                task.status === "Abgeschlossen"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/20"
                  : task.status === "In Bearbeitung"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20"
              }`}
            >
              {task.status}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-medium text-muted-foreground">
              Deadline:
            </span>
            <span className={`text-xs ${getDeadlineClass(task.deadline)}`}>
              {task.deadline
                ? new Date(task.deadline).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })
                : "keine Deadline"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
