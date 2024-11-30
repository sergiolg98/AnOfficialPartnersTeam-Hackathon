"use client";

import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import TechStackDropdown from "../molecules/tech-stack-drop-down";
import SelectedTechBadge from "../molecules/selected-tech-badge";
import ProjectPositionSelector from "../molecules/position-selector";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    projectDescription: "",
    aditionalNotes: "",
  });
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  const techStack = [
    "React",
    "Node.js",
    "Python",
    "Java",
    "Angular",
    "Vue.js",
    "Django",
    "Flask",
    "GraphQL",
    "Kubernetes",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTechSelect = (tech: string) => {
    setSelectedTech([...selectedTech, tech]);
  };

  const handleRemoveTech = (tech: string) => {
    setSelectedTech(selectedTech.filter((item) => item !== tech));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", {
      ...formData,
      techStack: selectedTech,
    });
  };

  return (
    <div className="bg-card text-card-foreground mx-auto max-w-lg rounded-lg p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold">
        DevProfile AI: Intelligent Team Member Recommendations
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Nombre completo
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="First Last"
            className="mt-1"
            required
          />
        </div>

        {/* Project Field */}
        <div>
          <Label htmlFor="projectDescription" className="mb-2 block">
            Descripción del proyecto
          </Label>
          <Input
            type="text"
            name="projectDescription"
            id="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Tu proyecto"
            required
          />
        </div>

        {/* Tech Stack Dropdown */}
        <TechStackDropdown
          techStack={techStack.filter((tech) => !selectedTech.includes(tech))}
          onSelect={handleTechSelect}
        />

        {/* Selected Tech Stack */}
        {selectedTech.length > 0 && (
          <div>
            {/* <Label className="mb-2 mt-4 block">
              Tecnologías seleccionadas:
            </Label> */}
            <div className="mt-2 flex flex-wrap gap-3">
              {selectedTech.map((tech) => (
                <SelectedTechBadge
                  key={tech}
                  tech={tech}
                  onRemove={handleRemoveTech}
                />
              ))}
            </div>
          </div>
        )}

        <ProjectPositionSelector />

        {/* Additional Notes */}
        <div>
          <Label htmlFor="aditionalNotes" className="mb-2 block">
            Notas adicionales
          </Label>
          <Input
            type="text"
            name="aditionalNotes"
            id="aditionalNotes"
            value={formData.aditionalNotes}
            onChange={handleChange}
            placeholder="Notas adicionales"
            required
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="bg-foreground text-background w-full">
          Continuar
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
