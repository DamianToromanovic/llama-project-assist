"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  params: { id: string };
};

export default function page({ params }: Props) {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<string>("overview");
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProjectById = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single(); //wandelt array in objekt um ; wenn mna ein einzlenes objekt haben will

      // if(error){
      //   router.push("/dashboard/projects")
      //   return
      // }

      setProject(data);
      setLoading(false);
    };
    fetchProjectById();
  }, [id]);

  return (
    <div className="flex felx-col gap-3">
      <h1>{project.title}</h1>
      <div
        className="flex gap-3
      "
      >
        <Button onClick={() => setTab("overview")}>Übersicht</Button>
        <Button onClick={() => setTab("todos")}>Aufgaben</Button>
        <Button onClick={() => setTab("teams")}>Teams</Button>
        <Button onClick={() => setTab("notes")}>Notizen</Button>
      </div>

      {tab === "overview" && <Overview project={project} />}
    </div>
  );
}
