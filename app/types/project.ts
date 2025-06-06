export type Project = {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  status: "aktiv" | "archiviert";
  color: string;
  is_favorite: boolean;
  team_id: string;
  description: string;
};

export type ProjectForm = {
  title: string;

  status: "aktiv" | "archiviert";
  color: string;
  is_favorite: boolean;

  description: string;
};

export type ProjectInsert = Omit<Project, "id" | "created_at">;
