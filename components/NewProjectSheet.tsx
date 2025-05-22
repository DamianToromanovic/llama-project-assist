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
type NewProjectSheetProps = {
  setShowSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewProjectSheet({
  setShowSheet,
}: NewProjectSheetProps) {
  const [newProject, setNewProject] = useState<ProjectForm>({
    title: "",
    description: "",
    status: "",
    color: "",
    isFavorite: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSheet(false);
  };
  return (
    <Sheet>
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
        <form onSubmit={handleSubmit}></form>
      </SheetContent>
    </Sheet>
  );
}
