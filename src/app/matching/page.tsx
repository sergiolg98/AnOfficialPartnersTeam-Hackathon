"use client";
import { Suspense } from "react";
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
import { getSummary } from "~/lib/api-wrapper/getSummary";

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
  info: string;
}

interface SkillScoreProps {
  label: string;
  score: number;
}

interface DeveloperCardProps {
  developer: Developer;
}

const skillmockup = {
  seniority: 0.9,
  technical: 0.85,
  soft: 0.95,
  language: 0.8,
  communication: 0.9,
  availability: 0.7,
};

// Separate component for the content that needs searchParams
function PageContent() {
  const [developers, setDevelopers] = useState<Developer[]>([]);

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const { data } = api.projects.getById.useQuery({ id: Number(projectId) });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>({});

  const fetchProjectData = async (id: string) => {
    try {
      const project = await getProject(id);
      return project;
    } catch (error) {
      return null;
    }
  };

  const fetchSummaryPerDev = async (id: string) => {
    try {
      const project = await getSummary(id);
      return project;
    } catch (error) {
      return null;
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
        <div>{developer.info}</div>
      </CardContent>
    </Card>
  );

  return (
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
            <Button
              className="w-full"
              onClick={async () => {
                const response = await fetchProjectData(projectId ?? "");

                // Create a Set to store unique names/emails
                const uniqueDevs = new Set();

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                response.map((dev: any) => {
                  uniqueDevs.add(dev.name);
                });

                // Convert Set back to array if needed
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const uniqueDevsArray = Array.from(uniqueDevs) as any[];

                const devresponse = [];

                console.log(uniqueDevsArray, "devvv");

                // Using for...of loop for proper async/await handling
                for (const dev of uniqueDevsArray) {
                  console.log(dev, "summary");

                  const summary = await fetchSummaryPerDev(dev as string);
                  console.log(summary, "summary");
                  devresponse.push(summary);
                }

                setDevelopers(
                  devresponse.map((dev, idx) => {
                    return {
                      id: idx,
                      name: dev.email,
                      skills: skillmockup,
                      info: dev.short_descriptions.flat().join(" "),
                    };
                  }),
                );
              }}
            >
              Find Matching Developers
            </Button>

            <div className="space-y-4">
              {developers.map((developer) => (
                <DeveloperCard key={developer.id} developer={developer} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function Page() {
  return (
    <main className="flex min-h-screen bg-background p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense>
    </main>
  );
}
