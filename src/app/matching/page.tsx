"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { getProject } from "~/lib/api-wrapper/matching";
import { api } from "~/trpc/react";
import ProjectForm, {
  ProjectFormData,
} from "../../components/organisms/project-form";

interface Skills {
  seniority: number;
  technical: number;
  soft: number;
  language: number;
  communication: number;
  availability: number;
}

interface Developer {
  id: number;
  name: string;
  skills: Skills;
}

interface SkillScoreProps {
  label: string;
  score: number;
}

interface DeveloperCardProps {
  developer: Developer;
}

export default function Page() {
  const [developers] = useState<Developer[]>([
    {
      id: 1,
      name: "Alice Johnson",
      skills: {
        seniority: 0.9,
        technical: 0.85,
        soft: 0.95,
        language: 0.8,
        communication: 0.9,
        availability: 0.7,
      },
    },
    {
      id: 2,
      name: "Bob Smith",
      skills: {
        seniority: 0.7,
        technical: 0.95,
        soft: 0.8,
        language: 0.85,
        communication: 0.75,
        availability: 0.9,
      },
    },
    {
      id: 3,
      name: "Charlie Brown",
      skills: {
        seniority: 0.8,
        technical: 0.8,
        soft: 0.9,
        language: 0.9,
        communication: 0.85,
        availability: 0.8,
      },
    },
  ]);

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  console.log("PROJECT ID", projectId);
  const { data } = api.projects.getById.useQuery({ id: Number(projectId) });
  console.log("data", data);
  // In your component
  const fetchProjectData = async (id: string) => {
    try {
      const project = await getProject(id);
      console.log(project);
    } catch (error) {
      // Handle any errors
      console.error("Error:", error);
    }
  };

  const SkillScore: React.FC<SkillScoreProps> = ({ label, score }) => (
    <div className="mb-2">
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{Math.round(score * 100)}%</span>
      </div>
      <Progress value={score * 100} className="h-2" />
    </div>
  );

  const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer }) => (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{developer.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <SkillScore label="Seniority" score={developer.skills.seniority} />
        <SkillScore
          label="Technical Skills"
          score={developer.skills.technical}
        />
        <SkillScore label="Soft Skills" score={developer.skills.soft} />
        <SkillScore label="English Skills" score={developer.skills.language} />
        <SkillScore
          label="Communication"
          score={developer.skills.communication}
        />
        <SkillScore
          label="Availability"
          score={developer.skills.availability}
        />
      </CardContent>
    </Card>
  );

  return (
    <main className="flex min-h-screen bg-background p-8">
      <div className="mx-auto flex w-full max-w-6xl gap-8">
        {/* Left Column: Project Form */}
        <div className="w-1/2">
          <ProjectForm
            initialData={{
              additionalNotes: "",
              name: data?.name ?? "",
              positions: [data?.position?.name ?? ""],
              techStack:
                data?.techStack.map((tech) => tech.technicalSkill.name) ?? [],
              projectDescription: data?.projectDescription ?? "",
            }}
            onSubmit={function (data: ProjectFormData): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>

        {/* Right Column: Developer Suggestions */}
        <div className="w-1/2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl">Developer Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              {!showSuggestions ? (
                <Button
                  className="w-full"
                  onClick={async () => {
                    // await fetchProjectData();
                    setShowSuggestions(true);
                  }}
                >
                  Find Matching Developers
                </Button>
              ) : (
                <div className="space-y-4">
                  {developers.map((developer) => (
                    <DeveloperCard key={developer.id} developer={developer} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
