"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "~/components/ui/menubar";

const NavigationMenuBar = () => {
  const [activeSection, setActiveSection] = useState("clients");

  const sections = [
    { id: "clients", label: "Client Projects", href: "/" },
    { id: "create", label: "New Project", href: "/new-project" },
    { id: "matching", label: "Matching", href: "/matching" },
  ];

  return (
    <Menubar className="flex items-center justify-center border-b">
      {sections.map((section) => (
        <MenubarMenu key={section.id}>
          <Link
            href={section.href}
            className={`cursor-pointer px-4 py-2 transition-colors ${
              activeSection === section.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }`}
          >
            {section.label}
          </Link>
        </MenubarMenu>
      ))}
    </Menubar>
  );
};

export default NavigationMenuBar;
