export type Point = [number, number, number];
export type Connection = [number, number];
import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export interface Project {
  id: number;
  title: string;
  description: string;
  model: React.FC;
}

export interface DottedShapeProps {
  points: Point[];
  connections: Connection[];
}

export interface AnimatedModelProps {
  Model: React.FC;
  isActive: boolean;
}

export interface ProjectSceneProps {
  projects: Project[];
  activeIndex: number;
}

export interface Section {
  title: string;
  icon: LucideIcon;
  model: ComponentType;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  details: string;
  type: "work" | "project";
  skills: string[];
  link?: string;
}
