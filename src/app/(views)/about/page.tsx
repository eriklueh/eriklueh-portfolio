"use client"

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, Briefcase, Code, Search, ExternalLink } from 'lucide-react'

interface TimelineItem {
    year: string
    title: string
    company: string
    description: string
    details: string
    type: 'work' | 'project'
    skills: string[]
    link?: string
}

const timelineData: TimelineItem[] = [
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

const TimelineItem = ({ item }: { item: TimelineItem }) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    return (
        <motion.div
            ref={ref}
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                        <div className="mr-4 p-2 rounded-full bg-primary/10">
                            {item.type === 'work' ? <Briefcase className="h-6 w-6" /> : <Code className="h-6 w-6" />}
                        </div>
                        <div>
                            <time className="text-sm font-medium text-muted-foreground">{item.year}</time>
                            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.company}</p>
                        </div>
                    </div>
                    <p className="mb-4 text-base text-muted-foreground">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {item.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(!isOpen)}
                            className="group"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? "Ver menos" : "Ver más"}
                            <motion.div
                                className="ml-2 inline-block"
                                initial={false}
                                animate={{ rotate: isOpen ? 180 : 0 }}
                            >
                                <ChevronDown className="h-4 w-4" />
                            </motion.div>
                        </Button>
                        {item.link && (
                            <Button variant="outline" size="sm" asChild>
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    Ver proyecto <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        )}
                    </div>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="mt-4 bg-muted">
                                    <CardContent className="p-4">
                                        <p className="text-sm text-muted-foreground">{item.details}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default function About() {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState<'work' | 'projects'>('work')

    const filteredData = timelineData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const workData = filteredData.filter(item => item.type === 'work')
    const projectData = filteredData.filter(item => item.type === 'project')

    return (
        <div className="container mx-auto px-4 py-16">
            <motion.h1
                className="text-4xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Mi Trayectoria Profesional
            </motion.h1>
            <div className="mb-8">
                <div className="relative w-full max-w-sm mx-auto">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Buscar por habilidad, título o descripción..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'work' | 'projects')} className="max-w-3xl mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="work">Experiencia Laboral</TabsTrigger>
                    <TabsTrigger value="projects">Proyectos</TabsTrigger>
                </TabsList>
                <TabsContent value="work">
                    <AnimatePresence>
                        {workData.map((item) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <TimelineItem item={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {workData.length === 0 && (
                        <p className="text-center text-muted-foreground mt-8">No se encontraron resultados para experiencia laboral.</p>
                    )}
                </TabsContent>
                <TabsContent value="projects">
                    <AnimatePresence>
                        {projectData.map((item) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <TimelineItem item={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {projectData.length === 0 && (
                        <p className="text-center text-muted-foreground mt-8">No se encontraron resultados para proyectos.</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}