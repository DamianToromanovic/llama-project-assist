"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  status: string;
  color: string;
  isFavorite: boolean;
};

export const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Titel",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <div
          className={cn(
            "p-1 rounded-md w-max text-xs",
            status === "aktiv" && "bg-green-500/30",
            status === "archiviert" && "bg-gray-400/30",
            status === "offen" && "bg-yellow-400/30"
          )}
        >
          {status as string}
        </div>
      );
    },
  },
  {
    accessorKey: "isFavorite",
    header: "Favorit",
    cell: ({ row }) => {
      const isFav = row.getValue("isFavorite") as boolean;
      return <span>{isFav ? "⭐️" : "–"}</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Erstellt am",
    cell: ({ row }) => {
      const raw = row.getValue("created_at") as string;
      const date = new Date(raw).toLocaleDateString();
      return <span className="text-sm text-gray-500">{date}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Aktionen öffnen</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(project.id)}
            >
              Projekt-ID kopieren
            </DropdownMenuItem>
            <DropdownMenuItem>Details anzeigen</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
