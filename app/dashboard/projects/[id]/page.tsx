"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Overview from "@/components/Overview";
import { Project } from "@/app/types/project";
import { useAppStore } from "@/app/store/useAppStore";
export default function ProjectDetailPage() {
  const { id } = useParams() as { id: string };
  const selectedProject = useAppStore((state) => state.selectedProject);
  const setSelectedProject = useAppStore((state) => state.setSelectedProject);
  const setTasksOfSelectedProject = useAppStore((s) => s.setTasks);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"overview" | "todos" | "teams" | "notes">(
    "overview"
  );

  //useEffect for fetching selectedProject and setting in store, dependency: id, setctedProject from store
  useEffect(() => {
    const fetchProjectById = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Projekt nicht gefunden.");
        setLoading(false);
        return;
      }

      setSelectedProject(data);
      setLoading(false);
    };

    if (!selectedProject && id) {
      fetchProjectById();
    } else {
      setLoading(false);
    }
  }, [id, selectedProject]);

  useEffect(() => {
    if (!selectedProject || !selectedProject.id) return;
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("project_id", selectedProject.id);
      if (error || !data) {
        setError("Tasks nichts gefunden");
        return;
      }
      setTasksOfSelectedProject(data);
    };
    fetchTasks();
  }, [selectedProject]);

  if (loading) return <div className="p-6">Lädt…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!selectedProject) return null;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">{selectedProject.title}</h1>
      <div className="px-4 py-1 rounded-md bg-accent w-max">
        {selectedProject.status}
      </div>

      {/* Evtl mehr als title und status???
      
      Tabs synchron zur URL machen => /projects/:id?tab=notes anspringen – später nice für Sharing/Deep Linking.*/}
      <div className="flex gap-3">
        <Button
          variant={tab === "overview" ? "default" : "outline"}
          onClick={() => setTab("overview")}
        >
          Übersicht
        </Button>
        <Button
          variant={tab === "todos" ? "default" : "outline"}
          onClick={() => setTab("todos")}
        >
          Aufgaben
        </Button>
        <Button
          variant={tab === "teams" ? "default" : "outline"}
          onClick={() => setTab("teams")}
        >
          Team
        </Button>
        <Button
          variant={tab === "notes" ? "default" : "outline"}
          onClick={() => setTab("notes")}
        >
          Notizen
        </Button>
      </div>

      <div>
        {tab === "overview" && <Overview />}
        {tab === "todos" && <div>Hier kommen später die Aufgaben…</div>}
        {tab === "teams" && <div>Hier kommt später das Team…</div>}
        {tab === "notes" && <div>Hier kommen später die Notizen…</div>}
      </div>
    </div>
  );
}
