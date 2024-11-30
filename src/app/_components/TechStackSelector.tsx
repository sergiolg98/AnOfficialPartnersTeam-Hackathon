"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";

interface TechStackSelectorProps {
  techStack: string[];
  selectedTech: string[];
  onSelectTech: (tech: string) => void;
}

const TechStackSelector: React.FC<TechStackSelectorProps> = ({
  techStack,
  selectedTech,
  onSelectTech,
}) => {
  const availableTechs = techStack.filter(
    (tech) => !selectedTech.includes(tech),
  );

  return (
    <div className="mt-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Seleccionar Tecnología</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72">
          {availableTechs.map((tech) => (
            <DropdownMenuItem key={tech} onClick={() => onSelectTech(tech)}>
              {tech}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TechStackSelector;
