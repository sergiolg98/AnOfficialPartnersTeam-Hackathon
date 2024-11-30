"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

enum ProjectStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  INACTIVE = "INACTIVE",
}

interface Position {
  id: number;
  name: string;
}

interface Client {
  id: number;
  name: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  position: Position;
  client: Client;
}

interface ApiProject {
  id: number;
  name: string;
  projectDescription: string;
  positionId: number;
  clientId: number;
  status: ProjectStatus;
  techStack: string[];
  client: Client;
  position: Position;
}

const getStatusColor = (status: ProjectStatus): string => {
  switch (status) {
    case ProjectStatus.ACTIVE:
      return "bg-green-500 hover:bg-green-600";
    case ProjectStatus.PENDING:
      return "bg-yellow-500 hover:bg-yellow-600";
    case ProjectStatus.INACTIVE:
      return "bg-gray-500 hover:bg-gray-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Card className="transition-shadow duration-300 hover:shadow-lg">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
        <Badge
          className={`${getStatusColor(project.status)} capitalize text-white`}
        >
          {project.status}
        </Badge>
      </div>
      <p className="text-gray-500">{project.client.name}</p>
      <p className="text-gray-600">{project.description}</p>
    </CardHeader>
    <CardFooter className="flex justify-end">
      <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
        View Details →
      </button>
    </CardFooter>
  </Card>
);

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/projects", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los proyectos");
        }

        const data: ApiProject[] = await response.json();

        // Transformar los datos de la API al formato de la interfaz Project
        const transformedProjects: Project[] = data.map((project) => ({
          id: project.id,
          name: project.name,
          description:
            project.projectDescription ?? "Descripción no disponible",
          status: project.status ?? ProjectStatus.PENDING,
          position: project.position,
          client: project.client,
        }));

        setProjects(transformedProjects);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetProjects().catch((error) =>
      console.error("Unhandled error:", error),
    );
  }, []);

  if (loading) {
    return <p className="text-center">Cargando proyectos...</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
