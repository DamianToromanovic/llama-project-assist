import React from "react";
import { Project } from "@/app/types/project";
import AppPieChart from "./AppPieChart";

import Activities from "./Activities";
import TodoList from "./TodoList";
import Calender from "./Calender";
import QuickActions from "./QuickActions";
import Notes from "./Notes";

type OverviewProps = {
  project: Project;
};

export default function Overview({ project }: OverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <Activities />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <TodoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <Calender />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <QuickActions />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <Notes />
      </div>
    </div>
  );
}
