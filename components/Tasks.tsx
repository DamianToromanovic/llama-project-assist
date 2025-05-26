import React, { useEffect } from "react";
import { useAppStore } from "@/app/store/useAppStore";
import { supabase } from "@/lib/supabase";

export default function Tasks() {
  const selectedProject = useAppStore((state) => state.selectedProject);
  const tasks = useAppStore((s) => s.tasks);
  const setTasks = useAppStore((s) => s.setTasks);

  return <div>Tasks</div>;
}
