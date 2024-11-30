// types/project.ts
export interface Project {
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

// utils/api.ts
export async function getProject(id: string): Promise<Project> {
  const response = await fetch(`/api/projects/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json();
}