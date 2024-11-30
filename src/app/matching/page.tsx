"use client";
import { useState } from "react";
import PaymentForm from "../../components/organisms/form";

export default function Page() {
  const [developers] = useState([
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "Diana Prince" },
    { id: 5, name: "Ethan Hunt" },
  ]);

  const [selectedDeveloper, setSelectedDeveloper] = useState<number | null>(
    null,
  );

  const handleSelectDeveloper = (id: number) => {
    setSelectedDeveloper(id);
  };

  return (
    <main className="dark flex min-h-screen items-center justify-center bg-background p-8">
      {/* Wrapper for Form and Developer List */}
      <div className="flex w-full max-w-4xl items-center justify-between gap-8">
        {/* Left Column: Payment Form */}
        <div className="w-1/2">
          <PaymentForm />
        </div>

        {/* Right Column: Developers List */}
        <div className="flex w-1/2 flex-col justify-center rounded-lg border bg-card p-6 shadow-lg">
          <h2 className="mb-4 text-center text-xl font-bold text-white">
            Developers disponibles
          </h2>
          <ul className="space-y-2">
            {developers.map((dev) => (
              <li
                key={dev.id}
                onClick={() => handleSelectDeveloper(dev.id)}
                className={`cursor-pointer rounded-md p-3 text-sm font-medium ${
                  selectedDeveloper === dev.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/90"
                }`}
              >
                {dev.name}
              </li>
            ))}
          </ul>
          {selectedDeveloper && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Seleccionaste:{" "}
              <span className="font-bold">
                {developers.find((dev) => dev.id === selectedDeveloper)?.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
