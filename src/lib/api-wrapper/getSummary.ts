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
export async function getSummary(id: string) {
  const response = await fetch(`/api/developers/search/by-email/${encodeURIComponent(id)}`);

  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json();
}