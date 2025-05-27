import React from "react";

export default function KanbanBoard() {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 mt-8">
      <div className="md:col-start-1 bg-accent"></div>
      <div className="md:col-start-2 bg-accent"></div>
      <div className="md:col-start3 bg-accent"></div>
    </div>
  );
}
