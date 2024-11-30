"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Badge } from "~/components/ui/badge";
import { X } from "lucide-react";

export const AVAILABLE_POSITIONS = [
  "Cloud DevOps Engineer",
  "React Engineer",
  "Angular Engineer",
  "QA Engineer",
  "Product Designer",
  "Node Engineer",
  "Data Engineer",
  "Ruby on Rails Engineer",
  "Java Engineer",
  "Rust Engineer",
  "Trainee - Node Engineer",
  "Trainee - QA Engineer",
  "Product Owner",
  "Trainee - Product Designer",
] as const;

export type Position = (typeof AVAILABLE_POSITIONS)[number];

interface ProjectPositionSelectorProps {
  selectedPositions: string[];
  onSelectPosition: (position: string) => void;
  onRemovePosition: (position: string) => void;
  disabled?: boolean;
  error?: string;
}

const ProjectPositionSelector: React.FC<ProjectPositionSelectorProps> = ({
  selectedPositions,
  onSelectPosition,
  onRemovePosition,
  disabled = false,
  error,
}) => {
  const availablePositions = AVAILABLE_POSITIONS.filter(
    (position) => !selectedPositions.includes(position),
  );

  return (
    <div className="space-y-2">
      {/* Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full"
            disabled={disabled || availablePositions.length === 0}
          >
            {availablePositions.length === 0
              ? "No hay más posiciones disponibles"
              : "Seleccionar Posición"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Posiciones disponibles</DropdownMenuLabel>
          {availablePositions.map((position) => (
            <DropdownMenuItem
              key={position}
              onClick={() => onSelectPosition(position)}
            >
              {position}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Selected Positions */}
      {selectedPositions.length > 0 && (
        <div className="mt-2">
          <div className="flex flex-wrap gap-2">
            {selectedPositions.map((position) => (
              <Badge
                key={position}
                variant="secondary"
                className="flex items-center gap-2 bg-blue-100 text-blue-800"
              >
                {position}
                <button
                  type="button"
                  onClick={() => onRemovePosition(position)}
                  className="inline-flex h-4 w-4 items-center justify-center rounded-sm text-blue-800 hover:bg-blue-200 hover:text-blue-900"
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default ProjectPositionSelector;
