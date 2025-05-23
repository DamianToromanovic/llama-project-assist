"use client";
import { TrendingUp } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Label, Pie, PieChart } from "recharts";
const chartData = [
  { status: "Zu erledigen", tasks: 5, fill: "var(--color-chart-5)" },
  { status: "In Bearbeitung", tasks: 12, fill: "var(--color-chart-3)" },
  { status: "Abgeschlossen", tasks: 24, fill: "var(--color-chart-2)" },
];

const chartConfig = {
  tasks: { label: "Aufgaben" },
  "Zu erledigen": { label: "Zu erledigen", color: "var(--color-chart-3)" },
  "In Bearbeitung": { label: "In Bearbeitung", color: "var(--color-chart-2)" },
  Abgeschlossen: { label: "Abgeschlossen", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

export default function AppPieChart() {
  const totalTasks = chartData.reduce((acc, curr) => acc + curr.tasks, 0);

  return (
    <>
      <h2 className="text-lg font-medium mb-6">Aufgabenstatus</h2>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="tasks"
            nameKey="status"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalTasks}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Aufgaben
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-4 flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2 font-medium leading-none">
          <span>Steigerung um 5,2% diesen Monat</span>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Zeigt alle Aufgaben der letzten 6 Monate
        </div>
      </div>
    </>
  );
}
