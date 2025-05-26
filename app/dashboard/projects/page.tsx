"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState, useCallback } from "react";
import { useAppStore } from "@/app/store/useAppStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import NewProjectSheet from "@/components/NewProjectSheet";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const user = useAppStore((state) => state.user);
  const projects = useAppStore((state) => state.projects);
  const setProjects = useAppStore((state) => state.setProjects);
  const [loading, setLoading] = useState(true);
  const [showSheet, setShowSheet] = useState<boolean>(false);

  //so wird nicht bei jedem rnder eine funktion erstellt sondern nur wenn user sich ändert
  const fetchProjects = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.log("Fehler beim Laden", error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  }, [user]);

  // Beim Mount & user-Wechsel Projekte holen
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Meine Projekte</h1>
        <Button
          className="cursor-pointer mb-4"
          onClick={() => setShowSheet(true)}
          type="button"
        >
          Projekt hinzufügen
        </Button>

        {loading ? (
          <p>Lade Projekte...</p>
        ) : (
          <DataTable columns={columns} data={projects} />
        )}
      </div>

      {showSheet && (
        <NewProjectSheet
          onProjectCreated={fetchProjects}
          open={showSheet}
          onOpenChange={setShowSheet}
        />
      )}
    </>
  );
}
