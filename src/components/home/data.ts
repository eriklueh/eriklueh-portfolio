import { User, Briefcase, DollarSign, Mail, Box } from 'lucide-react'
import { DottedCube, DottedOctahedron, DottedIcosahedron, DottedDodecahedron, DottedTetrahedron } from '@/components/three/dotted-shapes'
import type {Section, TimelineItem} from "@/types/types";

export const sections: Section[] = [
    { title: "About", icon: User, model: DottedCube },
    { title: "Projects", icon: Briefcase, model: DottedOctahedron },
    { title: "Pricing", icon: DollarSign, model: DottedIcosahedron },
    { title: "Sandbox", icon: Box, model: DottedDodecahedron },
    { title: "Contact", icon: Mail, model: DottedTetrahedron },
]

export const timelineData: TimelineItem[] = [
    {
        year: "2024",
        title: "Freelance Developer",
        company: "Autónomo",
        description: "Desarrollo de landing pages y aplicaciones web para diversos clientes.",
        details: "Utilizo principalmente ReactJS, TypeScript y Tailwind. Implemento CI/CD con Vercel y GitHub Actions, y uso Supabase como almacenamiento principal.",
        type: "work",
        skills: ["ReactJS", "TypeScript", "Tailwind", "Vercel", "GitHub Actions", "Supabase"]
    },
    {
        year: "2022-2024",
        title: "Software Developer",
        company: "Walden.ai",
        description: "Desarrollo full-stack de sistemas de recolección y análisis de datos.",
        details: "Trabajo con Python, Go, AWS, y ReactJS. He integrado OpenAI API y AWS Bedrock a través de Langchain para potenciar nuestros servicios con IA.",
        type: "work",
        skills: ["Python", "Go", "AWS", "ReactJS", "OpenAI API", "Langchain"]
    },
    {
        year: "2021-2022",
        title: "Lead Developer",
        company: "DataDrive",
        description: "Lideré el desarrollo de una plataforma de análisis de datos en tiempo real.",
        details: "Implementé arquitecturas serverless y desarrollé dashboards interactivos con D3.js y React.",
        type: "work",
        skills: ["Serverless", "D3.js", "React", "Data Analysis"]
    },
    {
        year: "2023",
        title: "AI-Powered Task Manager",
        company: "Proyecto Personal",
        description: "Desarrollé una aplicación de gestión de tareas con integración de IA para priorización y sugerencias.",
        details: "Utilicé React Native para el frontend, Node.js para el backend, y integré GPT-3 para las funcionalidades de IA.",
        type: "project",
        skills: ["React Native", "Node.js", "GPT-3", "MongoDB"],
        link: "https://github.com/yourusername/ai-task-manager"
    },
    {
        year: "2022",
        title: "Blockchain Voting System",
        company: "Hackathon Project",
        description: "Creé un sistema de votación seguro y transparente basado en blockchain.",
        details: "Implementé smart contracts en Solidity, desarrollé una dApp con React, y utilicé Hardhat para testing y deployment.",
        type: "project",
        skills: ["Solidity", "React", "Hardhat", "Ethereum"],
        link: "https://devpost.com/software/blockchain-voting-system"
    }
]