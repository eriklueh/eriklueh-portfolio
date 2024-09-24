"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types/types";
import {
  DottedCube,
  DottedIcosahedron,
  DottedOctahedron,
} from "@/components/three/dotted-shapes";
import { ProjectScene } from "@/components/three/project-scene";

const projects: Project[] = [
  {
    id: 1,
    title: "Desarrollo de componentes on-demand",
    description:
      "Creación de componentes 3D interactivos y personalizados según las necesidades del cliente.",
    model: DottedCube,
  },
  {
    id: 2,
    title: "Visualización de datos en 3D",
    description:
      "Transformación de conjuntos de datos complejos en representaciones 3D interactivas y fáciles de entender.",
    model: DottedOctahedron,
  },
  {
    id: 3,
    title: "Experiencias web inmersivas",
    description:
      "Desarrollo de experiencias web únicas e inmersivas utilizando las últimas tecnologías 3D.",
    model: DottedIcosahedron,
  },
];

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % projects.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { description, title } = projects[activeIndex];
  return (
    <div
      className="container mx-auto flex min-h-screen flex-col justify-center px-4 py-8"
      ref={containerRef}
    >
      <h1 className="mb-8 text-center text-4xl font-bold">Mis Proyectos</h1>
      <div className="relative w-full" style={{ height: "min(60vh, 500px)" }}>
        <ProjectScene projects={projects} activeIndex={activeIndex} />
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform"
          onClick={handlePrev}
          aria-label="Proyecto anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform"
          onClick={handleNext}
          aria-label="Proyecto siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mx-auto mt-8 max-w-2xl">
            <CardContent className="pt-6">
              <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex justify-center space-x-2">
        {projects.map((_, index) => (
          <Button
            key={index}
            variant={index === activeIndex ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveIndex(index)}
            aria-label={`Ir al proyecto ${index + 1}`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Projects;
