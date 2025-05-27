import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, Check, ChevronDown, Columns3 } from "lucide-react";
import type { Category } from "@/app/store/useAppStore";

type TasksFilterProps = {
  withAll: Category[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  isAddingCategory: boolean;
  setIsAddingCategory: (val: boolean) => void;
  newCategoryName: string;
  setNewCategoryName: (val: string) => void;
  handleAddCategory: () => void;
};

const TasksFilter: React.FC<TasksFilterProps> = ({
  withAll,
  selectedCategory,
  setSelectedCategory,
  isAddingCategory,
  setIsAddingCategory,
  newCategoryName,
  setNewCategoryName,
  handleAddCategory,
}) => (
  <section className="flex justify-between">
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-muted px-2 py-2 rounded-md cursor-pointer flex justify-between gap-6">
        {selectedCategory} <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {withAll.map((c) => (
          <DropdownMenuItem
            key={c.id}
            onClick={() => setSelectedCategory(c.name)}
            className="flex justify-between"
          >
            {c.name}
            {selectedCategory === c.name && <Check />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        {isAddingCategory ? (
          <div className="p-2 flex gap-2">
            <input
              autoFocus
              className="border rounded p-1 w-32"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCategory();
                if (e.key === "Escape") {
                  setIsAddingCategory(false);
                  setNewCategoryName("");
                }
              }}
              placeholder="Neue Kategorie"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="text-blue-600"
            >
              OK
            </button>
          </div>
        ) : (
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setIsAddingCategory(true);
            }}
          >
            <span>Hinzufügen</span>
            <span className="mr-2">+</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
    <div className="flex gap-0 p-3 mr-4 border-2">
      <button type="button">
        <Columns3 />
      </button>
      <button type="button">
        <AlignJustify />
      </button>
    </div>
  </section>
);

export default TasksFilter;
