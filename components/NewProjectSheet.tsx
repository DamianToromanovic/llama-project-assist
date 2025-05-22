"use client";
import { ProjectForm } from "@/app/dashboard/projects/columns";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useUser } from "@/app/context/UserContext";

type NewProjectSheetProps = {
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  onProjectCreated: () => void;
};

const initialProject = {
  title: "",
  description: "",
  status: "",
  color: "",
  isFavorite: false,
};

export default function NewProjectSheet({
  open,
  onOpenChange,
  onProjectCreated,
}: NewProjectSheetProps) {
  const [newProject, setNewProject] = useState<ProjectForm>(initialProject);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!user) {
      setError("User nicht eingeloggt");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("projects")
      .insert([{ ...newProject, user_id: user.id }]);
    setLoading(false);

    if (error) {
      setError("Fehler beim Anlegen des Projekts: " + error.message);
      return;
    }
    onOpenChange(false);
    onProjectCreated();

    setNewProject(initialProject);
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="h-full overflow-y-auto border-none rounded-t-xl"
        side="right"
      >
        <SheetHeader>
          <SheetTitle className="text-my-foreground px-8 text-2xl">
            Dein Projekt
          </SheetTitle>
          <SheetDescription className="px-8">
            Lege ein neues Projekt an
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-8 py-6">
          <div>
            <label className="block mb-2 font-medium" htmlFor="title">
              Titel
            </label>
            <input
              id="title"
              type="text"
              value={newProject.title}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, title: e.target.value }))
              }
              required
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Projektname"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="description">
              Beschreibung
            </label>
            <textarea
              id="description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Projektbeschreibung"
            />
          </div>
          <div>
            <Select
              value={newProject.status}
              onValueChange={(value) =>
                setNewProject((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Offen</SelectItem>
                <SelectItem value="inProgress">In Arbeit</SelectItem>
                <SelectItem value="done">Abgeschlossen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="color">
              Farbe
            </label>
            <input
              id="color"
              type="color"
              value={newProject.color}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, color: e.target.value }))
              }
              className="w-12 h-8 p-0 border-none bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="isFavorite"
              type="checkbox"
              checked={newProject.isFavorite}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  isFavorite: e.target.checked,
                }))
              }
              className="h-5 w-5 accent-yellow-400"
            />
            <label htmlFor="isFavorite" className="font-medium">
              Favorit
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-xl bg-my-primary px-4 py-2 font-bold text-white hover:bg-my-primary/80"
          >
            Anlegen
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
