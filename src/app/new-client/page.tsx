"use client";
import ProjectForm, {
  ProjectFormData,
} from "~/components/organisms/project-form";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <ProjectForm
        onSubmit={function (data: ProjectFormData): void {
          throw new Error("Function not implemented.");
        }}
      />
    </main>
  );
}
