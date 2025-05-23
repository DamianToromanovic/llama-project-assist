import React from "react";
import { Project } from "@/app/dashboard/projects/columns";
import AppPieChart from "./AppPieChart";
import { Accessibility } from "lucide-react";
import Activities from "./Activities";

type OverviewProps = {
  project: Project;
};

export default function Overview({ project }: OverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <Activities />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg"></div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg"></div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2"></div>
      <div className="bg-primary-foreground p-4 rounded-lg"></div>
    </div>
  );
}
