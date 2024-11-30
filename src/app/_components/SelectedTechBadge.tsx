"use client";

import React from "react";
import { Badge } from "~/components/ui/badge";
import { X } from "lucide-react";

interface SelectedTechBadgeProps {
  tech: string;
  onRemove: (tech: string) => void;
}

const SelectedTechBadge: React.FC<SelectedTechBadgeProps> = ({
  tech,
  onRemove,
}) => {
  return (
    <Badge className="flex items-center space-x-2 rounded-md bg-blue-100 px-3 py-1.5 text-sm text-blue-800">
      <span>{tech}</span>
      <button
        type="button"
        onClick={() => onRemove(tech)}
        className="ml-1 text-red-500"
      >
        <X className="h-4 w-4" />
      </button>
    </Badge>
  );
};

export default SelectedTechBadge;
