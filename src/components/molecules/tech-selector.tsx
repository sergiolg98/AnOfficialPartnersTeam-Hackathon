'use client';

import React, { useState } from 'react';

interface TechStackSelectorProps {
    techStack: string[];
    selectedTech: string[];
    onChange: (selectedTech: string[]) => void;
}

const TechStackSelector: React.FC<TechStackSelectorProps> = ({
    techStack,
    selectedTech,
    onChange,
}) => {
    const handleSelect = (tech: string) => {
        const updatedTechStack = selectedTech.includes(tech)
            ? selectedTech.filter((item) => item !== tech) // Remove if already selected
            : [...selectedTech, tech]; // Add if not selected
        onChange(updatedTechStack);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
                Tech Stack (Selecciona uno o más)
            </label>
            <ul className="space-y-2">
                {techStack.map((tech) => (
                    <li
                        key={tech}
                        className={`flex items-center justify-between p-2 rounded cursor-pointer ${selectedTech.includes(tech) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'
                            }`}
                        onClick={() => handleSelect(tech)}
                    >
                        <span>{tech}</span>
                        {selectedTech.includes(tech) && (
                            <span className="text-xs">Seleccionado</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TechStackSelector;