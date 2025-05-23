"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Overview from "@/components/Overview";
import { Project } from "../columns";

export default function ProjectDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"overview" | "todos" | "teams" | "notes">(
    "overview"
  );
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjectById = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single(); //wandelt arr in obj wenn man ein einzelens obj habne will

      if (error || !data) {
        setError("Projekt nicht gefunden.");
        setProject(null);
        setLoading(false);
        // Optional: Redirect
        // router.push("/dashboard/projects");
        return;
      }

      setProject(data);
      setLoading(false);
    };

    if (id) fetchProjectById();
  }, [id]);

  if (loading) return <div className="p-6">Lädt…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!project) return null;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <div className="px-4 py-1 rounded-md bg-accent w-max">
        {project.status}
      </div>
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
        {tab === "overview" && <Overview project={project} />}
        {tab === "todos" && <div>Hier kommen später die Aufgaben…</div>}
        {tab === "teams" && <div>Hier kommt später das Team…</div>}
        {tab === "notes" && <div>Hier kommen später die Notizen…</div>}
      </div>
    </div>
  );
}
