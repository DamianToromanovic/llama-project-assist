import React, { useState } from "react";
import { useAppStore } from "@/app/store/useAppStore";
import { supabase } from "@/lib/supabase";
import TasksFilter from "./TasksFilter";
import KanbanBoard from "./KanbanBoard";
import AddTaskCard from "./AddTaskCard";

export default function Tasks() {
  const selectedProject = useAppStore((state) => state.selectedProject);
  const [openAddTaskCard, setOpenAddTaskCard] = useState<boolean>(false);
  const categories = useAppStore((s) => s.categories);
  const setCategories = useAppStore((s) => s.setCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const withAll = [{ id: "all", name: "Alle" }, ...categories];

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setIsAddingCategory(false);
      return;
    }
    // Evtl. project_id aus selectedProject holen:
    const projectId = selectedProject?.id;

    // Insert in Supabase
    const { data, error } = await supabase
      .from("categories")
      .insert([{ name: newCategoryName.trim(), project_id: projectId }])
      .select() // gibt daten sofort wieder zurück
      .single(); // resultat nur ein objekt kein arr

    if (error) {
      alert("Fehler beim Anlegen: " + error.message);
      return;
    }
    setCategories([...categories, data]);

    setIsAddingCategory(false);
    setNewCategoryName("");
  };

  return (
    <main className="flex flex-col relative">
      <TasksFilter
        withAll={withAll}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isAddingCategory={isAddingCategory}
        setIsAddingCategory={setIsAddingCategory}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        handleAddCategory={handleAddCategory}
        setOpenAddTaskCard={setOpenAddTaskCard}
      />
      {openAddTaskCard && (
        <AddTaskCard setOpenAddTaskCard={setOpenAddTaskCard} />
      )}
      <KanbanBoard />
    </main>
  );
}
