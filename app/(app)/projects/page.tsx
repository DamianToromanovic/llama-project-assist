"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { Project, columns } from "./columns";
import { DataTable } from "./data-table";

export default function ProjectsPage() {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(user);
  useEffect(() => {
    if (!user) return;
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.log("Fehler beim Ladden", error);
      } else {
        setProjects(data || []);
      }

      setLoading(false);
    };
    fetchProjects();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meine Projekte</h1>

      {loading ? (
        <p>Lade Projekte...</p>
      ) : (
        <DataTable columns={columns} data={projects} />
      )}
    </div>
  );
}
