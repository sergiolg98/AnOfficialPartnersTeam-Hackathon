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
import { useRouter } from "next/navigation"; // Updated import
import { api } from "~/trpc/react";
import { Client, Position, Status } from "@prisma/client";

export interface Project {
  id: number;
  name: string;
  description: string;
  status: Status;
  position: Position | null;
  client: Client | null;
}

const getStatusColor = (status: Status): string => {
  switch (status) {
    case Status.ACTIVE:
      return "bg-green-500 hover:bg-green-600";
    case Status.PENDING:
      return "bg-yellow-500 hover:bg-yellow-600";
    case Status.INACTIVE:
      return "bg-gray-500 hover:bg-gray-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/matching?id=${project.id}`);
  };

  return (
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
        <p className="text-gray-500">{project.client?.name}</p>
        <p className="text-gray-600">{project.description}</p>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <button
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
          onClick={handleViewDetails}
        >
          View Details →
        </button>
      </CardFooter>
    </Card>
  );
};

const ProjectList: React.FC = () => {
  const { data } = api.projects.getAll.useQuery();

  const transformedProjects: Project[] =
    data?.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.projectDescription ?? "Descripción no disponible",
      status: project.status,
      position: project.position,
      client: project.client,
    })) ?? [];

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {transformedProjects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
