import { create } from "zustand";
import { Project } from "../types/project";

export type Task = {
  id: string;
  created_at: string;
  project_id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  updated_at: string;
  assigned_to: string;
  created_by: string;
  parent_task_id: string | null;
  order: number;
  points: number;
  is_recurring: boolean;
  recurrence: string | null;
};

export type Activity = {
  id: string;
  project_id: string;
  task_id: string;
  user_id: string;
  action: string;
  details: string;
  icon: string;
  created_at: string;
};

export type Note = {
  id: string;
  project_id: string;
  content: string;
  author_id: string;
  created_at: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: "admin" | "member";
  team_id?: string;
  created_at: string;
};

type AppState = {
  user: User | null;
  setUser: (user: User | null) => void;

  projects: Project[];
  setProjects: (projects: Project[]) => void;

  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;

  tasks: Task[];
  setTasks: (tasks: Task[]) => void;

  teamMembers: User[];
  setTeamMembers: (members: User[]) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  projects: [],
  setProjects: (projects) => set({ projects }),

  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),

  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  teamMembers: [],
  setTeamMembers: (members) => set({ teamMembers: members }),
}));
