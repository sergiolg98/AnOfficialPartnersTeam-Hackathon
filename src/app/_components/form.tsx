"use client";

import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import TechStackSelector from "../_components/techSelector";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
    aditionalNotes: "",
  });
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const techStack = [
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
  ];
  const levels = ["Principiante", "Intermedio", "Avanzado"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="bg-card text-card-foreground mx-auto max-w-lg rounded-lg p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold">
        DevProfile AI: Intelligent Team Member Recommendations
      </h2>
      <p className="text-muted-foreground mb-6 text-sm">Ed</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div>
          <Label htmlFor="name">Nombre completo</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="First Last"
            className="mt-1"
            required
          />
        </div>

        {/* Project field */}
        <div>
          <Label htmlFor="city">Descripcion del proyecto</Label>
          <Input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Tu proyecto"
            required
          />
        </div>

        {/* Tech Stack*/}

        <TechStackSelector
          techStack={techStack}
          selectedTech={selectedTech}
          onChange={setSelectedTech}
        />
        {/* Aditional notes */}
        <div>
          <Label htmlFor="city">Notas adicionales</Label>
          <Input
            type="text"
            name="aditionalNotes"
            id="aditionalNotes"
            value={formData.aditionalNotes}
            onChange={handleChange}
            placeholder="Notas adicionales"
            required
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="bg-foreground text-background w-full">
          Continue
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
