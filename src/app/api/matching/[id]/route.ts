// app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server';

// Define the Project type
interface Project {
  id: string;
  title: string;
  description: string;
  requirements: {
    seniority: string;
    technicalSkills: string[];
    softSkills: string[];
    languageRequirement: string;
    availability: string;
  };
  budget: number;
  duration: string;
}

// Mock database - In a real application, this would be your database connection
const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Building a modern e-commerce platform with Next.js",
    requirements: {
      seniority: "senior",
      technicalSkills: ["Next.js", "TypeScript", "Node.js"],
      softSkills: ["Leadership", "Problem Solving"],
      languageRequirement: "fluent",
      availability: "full-time"
    },
    budget: 50000,
    duration: "6 months"
  },
  // Add more mock projects as needed
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get the project ID from the URL params
    const id = (await params).id;

    // Find the project in our "database"
    const project = projects.find(p => p.id === id);

    // If project not found, return 404
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Return the project data
    return NextResponse.json(project);

  } catch (error) {
    // Handle any errors
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}