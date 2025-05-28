import { useAppStore } from "@/app/store/useAppStore";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type AddTaskFormProps = {
  setOpenAddTaskCard: (val: boolean) => void;
};

const status = [
  {
    name: "Offen",

    id: 1,
  },
  { name: "In Bearbeitung", id: 2 },
  { name: "Abgeschlossen", id: 3 },
];

const priority = [
  {
    name: "Niedrig",

    id: 1,
  },
  { name: "Mittel", id: 2 },
  { name: "Hoch", id: 3 },
];

export default function AddTaskCard({ setOpenAddTaskCard }: AddTaskFormProps) {
  const categories = useAppStore((s) => s.categories);
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");
  const [selectedStatus, setSelectedStatus] = useState<string>("Offen");
  const withAll = [{ id: "all", name: "Alle" }, ...categories];

  const [selectedPriority, setSelectedPriority] = useState<string>("Mittel");

  return (
    <div className="bg-accent rounded-2xl p-8 mr-4 w-full -top-10 shadow-lg absolute md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] self-center xl:px-16 ">
      <form className="flex flex-col gap-6">
        {/* Titel */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-semibold">
            Titel
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Titel der Aufgabe"
            className="rounded-md py-2 px-4 bg-popover border border-muted focus:outline-none"
          />
        </div>

        {/* Beschreibung */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-semibold">
            Beschreibung
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Beschreibung"
            rows={4}
            className="rounded-md py-2 px-4 bg-popover border border-muted focus:outline-none resize-none"
          />
        </div>

        <div className="flex justify-between ">
          {/* Kategorie Dropdown */}

          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="font-semibold">
              Kategorie
            </label>
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-popover px-2 py-2 rounded-md cursor-pointer flex justify-between gap-6">
                  {selectedCategory}
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuContent>
                  {withAll.map((c) => (
                    <DropdownMenuItem
                      key={c.id}
                      onClick={() => setSelectedCategory(c.name)}
                      className="flex justify-between"
                    >
                      {c.name}
                      {selectedCategory === c.name && <Check />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="font-semibold">
              Status
            </label>
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-md py-2 px-4 bg-popover cursor-pointer flex justify-between gap-6">
                  {selectedStatus}
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuContent>
                  {status.map((s) => (
                    <DropdownMenuItem
                      key={s.id}
                      onClick={() => setSelectedStatus(s.name)}
                      className="flex justify-between gap-4"
                    >
                      <span>{s.name}</span>{" "}
                      <span> {selectedStatus === s.name && <Check />}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Priorität: Drei Buttons */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Priorität</label>
          <div className="flex gap-2">
            {priority.map((p) => (
              <button
                onClick={() => setSelectedPriority(p.name)}
                type="button"
                className={cn(
                  "bg-popover px-4 py-2 rounded-md cursor-pointer hover:bg-popover/30 border transition",
                  selectedPriority === p.name && "border-popover-foreground"
                )}
                key={p.id}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between ">
          {/* Deadline */}
          <div className="flex flex-col gap-2">
            <label htmlFor="deadline" className="font-semibold">
              Deadline
            </label>
            {/* Hier Datepicker */}
            <input
              id="deadline"
              name="deadline"
              type="date"
              className="rounded-md w-42 py-2 px-4 bg-popover border border-muted focus:outline-none"
            />
          </div>

          {/* Zugewiesen an Dropdown */}
          <div className="flex flex-col gap-2">
            <label htmlFor="assigned" className="font-semibold">
              Zugewiesen an
            </label>
            {/* Hier User-Dropdown mit Suchleiste */}
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-popover px-2 py-2 rounded-md cursor-pointer flex justify-between gap-6">
                  {selectedCategory}
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuContent>
                  {priority.map((c) => (
                    <DropdownMenuItem
                      key={c.id}
                      onClick={() => setSelectedCategory(c.name)}
                      className="flex justify-between "
                    >
                      {c.name}
                      {selectedCategory === c.name && <Check />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Add-Task Button */}
        <button
          onClick={() => setOpenAddTaskCard(false)}
          type="submit"
          className="mt-4 rounded-xl px-6 py-3 font-semibold bg-chart-1 transition 2xl:w-[30%] 2xl:self-end"
        >
          Task anlegen
        </button>
      </form>
    </div>
  );
}
