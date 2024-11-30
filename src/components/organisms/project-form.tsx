"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import TechStackDropdown from "../molecules/tech-stack-drop-down";
import SelectedTechBadge from "../molecules/selected-tech-badge";
import ProjectPositionSelector from "../molecules/position-selector";

export interface ProjectFormData {
  name: string;
  projectDescription: string;
  additionalNotes: string;
  techStack: string[];
  positions: string[];
}

interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  isLoading?: boolean;
}

const TECH_STACK_OPTIONS = [
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
] as const;

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ProjectFormData>({
    defaultValues: {
      name: initialData?.name ?? "",
      projectDescription: initialData?.projectDescription ?? "",
      additionalNotes: initialData?.additionalNotes ?? "",
      techStack: initialData?.techStack ?? [],
      positions: initialData?.positions ?? [],
    },
  });

  // Add useEffect to watch for changes in initialData
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        projectDescription: initialData.projectDescription,
        additionalNotes: initialData.additionalNotes,
        techStack: initialData.techStack,
        positions: initialData.positions,
      });
    }
  }, [initialData, reset]);

  const selectedTech = watch("techStack");
  const selectedPositions = watch("positions");

  const handleTechSelect = (tech: string) => {
    setValue("techStack", [...selectedTech, tech], { shouldValidate: true });
  };

  const handleRemoveTech = (tech: string) => {
    setValue(
      "techStack",
      selectedTech.filter((item) => item !== tech),
      { shouldValidate: true },
    );
  };

  const handlePositionSelect = (position: string) => {
    setValue("positions", [...selectedPositions, position], {
      shouldValidate: true,
    });
  };

  const handleRemovePosition = (position: string) => {
    setValue(
      "positions",
      selectedPositions.filter((item) => item !== position),
      { shouldValidate: true },
    );
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-card p-6 text-card-foreground shadow-lg">
      <h2 className="mb-4 text-xl font-bold">
        DevProfile AI: Intelligent Team Member Recommendations
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Nombre completo
          </Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <Input {...field} placeholder="First Last" className="mt-1" />
            )}
          />
          {errors.name && (
            <span className="mt-1 text-sm text-destructive">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="projectDescription" className="mb-2 block">
            Descripción del proyecto
          </Label>
          <Controller
            name="projectDescription"
            control={control}
            rules={{ required: "Project description is required" }}
            render={({ field }) => (
              <Input {...field} placeholder="Tu proyecto" />
            )}
          />
          {errors.projectDescription && (
            <span className="mt-1 text-sm text-destructive">
              {errors.projectDescription.message}
            </span>
          )}
        </div>

        <div>
          <Label className="mb-2 block">Tech Stack</Label>
          <TechStackDropdown
            techStack={TECH_STACK_OPTIONS.filter(
              (tech) => !selectedTech.includes(tech),
            )}
            onSelect={handleTechSelect}
          />
          <Controller
            name="techStack"
            control={control}
            rules={{ required: "At least one technology is required" }}
            render={({ field }) => (
              <div className="mt-2 flex flex-wrap gap-2">
                {field.value.map((tech) => (
                  <SelectedTechBadge
                    key={tech}
                    tech={tech}
                    onRemove={handleRemoveTech}
                  />
                ))}
              </div>
            )}
          />
          {errors.techStack && (
            <span className="mt-1 text-sm text-destructive">
              {errors.techStack.message}
            </span>
          )}
        </div>

        <Controller
          name="positions"
          control={control}
          rules={{ required: "At least one position is required" }}
          render={({ field }) => (
            <ProjectPositionSelector
              selectedPositions={field.value}
              onSelectPosition={handlePositionSelect}
              onRemovePosition={handleRemovePosition}
            />
          )}
        />
        {errors.positions && (
          <span className="mt-1 text-sm text-destructive">
            {errors.positions.message}
          </span>
        )}

        <div>
          <Label htmlFor="additionalNotes" className="mb-2 block">
            Notas adicionales
          </Label>
          <Controller
            name="additionalNotes"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Notas adicionales" />
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-foreground text-background"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : initialData ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default ProjectForm;
