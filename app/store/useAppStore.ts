import { create } from "zustand";

// Types
export type Project = {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  status: "active" | "archived";
  color: string;
  is_favorite: boolean;
  team_id: string;
  description: string;
};

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

// Zustand Store
type AppState = {
  user: User | null;
  setUser: (user: User) => void;

  projects: Project[];
  selectedProjectId: string | null;
  tasks: Task[];

  setProjects: (projects: Project[]) => void;
  selectProject: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  projects: [],
  selectedProjectId: null,
  tasks: [],
  teamMembers: [],

  setUser: (user) => set({ user }),
  setProjects: (projects) => set({ projects }),
  selectProject: (id) => set({ selectedProjectId: id }),
  setTasks: (tasks) => set({ tasks }),
}));
