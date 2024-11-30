"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";

interface TechStackDropdownProps {
  techStack: string[];
  onSelect: (tech: string) => void;
}

const TechStackDropdown: React.FC<TechStackDropdownProps> = ({
  techStack,
  onSelect,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          Selecciona una tecnología
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {techStack.length > 0 ? (
          techStack.map((tech) => (
            <DropdownMenuItem
              key={tech}
              onClick={() => onSelect(tech)}
              className="flex items-center"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              {tech}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>No hay más tecnologías</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TechStackDropdown;
