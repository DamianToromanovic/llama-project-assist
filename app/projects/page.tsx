"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

type Project = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  status: string;
  color: string;
  isFavorite: boolean;
};

export default function ProjectsPage() {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
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

  return <div>Hier kommen die prjekte hin</div>;
}
