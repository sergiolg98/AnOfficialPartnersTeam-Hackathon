"use client";

import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Badge } from "~/components/ui/badge";
import { X } from "lucide-react";

const positions = [
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
];

const ProjectPositionSelector = () => {
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  const handleSelectPosition = (position: string) => {
    if (!selectedPositions.includes(position)) {
      setSelectedPositions([...selectedPositions, position]);
    }
  };

  const handleRemovePosition = (position: string) => {
    setSelectedPositions(selectedPositions.filter((item) => item !== position));
  };

  return (
    <div>
      {/* Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            Seleccionar Posición
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Posiciones disponibles</DropdownMenuLabel>
          {positions.map((position) => (
            <DropdownMenuItem
              key={position}
              onClick={() => handleSelectPosition(position)}
            >
              {position}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Selected Positions */}
      {selectedPositions.length > 0 && (
        <div className="mt-4">
          {/* <label className="mb-2 block">Posiciones seleccionadas:</label> */}
          <div className="flex flex-wrap gap-2">
            {selectedPositions.map((position) => (
              <Badge
                key={position}
                className="flex items-center space-x-2 rounded-md bg-blue-100 px-3 py-1.5 text-sm text-blue-800"
              >
                <span>{position}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePosition(position)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPositionSelector;
