import { useAppStore } from "@/app/store/useAppStore";
import { Plus } from "lucide-react";
import React from "react";

export default function KanbanBoard() {
  const tasks = useAppStore((s) => s.tasks);
  const setTasks = useAppStore((s) => s.setTasks);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 h-full w-full">
      {/* To Do */}
      <div className="bg-accent p-4 rounded-2xl min-h-[300px] flex flex-col">
        <h2 className="font-semibold mb-2 text-lg lg:text-center">To Do</h2>
        <div className="flex-1 flex flex-col gap-2">
          {tasks
            .filter((t) => t.status === "todo")
            .map((t) => (
              <div key={t.id}>{t.title}</div>
            ))}
        </div>
      </div>
      {/* In Progress */}
      <div className="bg-accent p-4 rounded-2xl min-h-[300px] flex flex-col">
        <h2 className="font-semibold mb-2 text-lg lg:text-center">In Arbeit</h2>
        <div className="flex-1 flex flex-col gap-2">
          {tasks
            .filter((t) => t.status === "inProgress")
            .map((t) => (
              <div key={t.id}>{t.title}</div>
            ))}
        </div>
      </div>
      {/* Done */}
      <div className="bg-accent p-4 rounded-2xl min-h-[300px] flex flex-col">
        <div className="flex justify-between">
          <h2 className="font-semibold mb-2 text-lg ">Abgeschlossen</h2>
          <button type="button" className="bg-card px-6 py-2">
            <Plus />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {tasks
            .filter((t) => t.status === "done")
            .map((t) => (
              <div key={t.id}>{t.title}</div>
            ))}
        </div>
      </div>
    </div>
  );
}
