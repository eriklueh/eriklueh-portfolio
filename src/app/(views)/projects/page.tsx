"use client"

import { useState, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree, ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as THREE from 'three'

type Point = [number, number, number]
type Connection = [number, number]

interface DottedShapeProps {
    points: Point[]
    connections: Connection[]
}

// Componente base para crear figuras doteadas
const DottedShape: React.FC<DottedShapeProps> = ({ points, connections }) => {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += delta * 0.2
            groupRef.current.rotation.y += delta * 0.1
        }
    })

    return (
        <group ref={groupRef}>
            {connections.map((connection, lineIndex) => (
                <group key={lineIndex}>
                    {Array.from({ length: 20 }, (_, i) => {
                        const t = i / 19
                        const [aIndex, bIndex] = connection
                        const a = points[aIndex]
                        const b = points[bIndex]
                        if (!a || !b) return null
                        const x = a[0] + (b[0] - a[0]) * t
                        const y = a[1] + (b[1] - a[1]) * t
                        const z = a[2] + (b[2] - a[2]) * t
                        return (
                            <mesh key={i} position={[x, y, z]}>
                                <sphereGeometry args={[0.03, 8, 8]} />
                                <meshBasicMaterial color="white" />
                            </mesh>
                        )
                    })}
                </group>
            ))}
        </group>
    )
}

// Cubo doteado
const DottedCube: React.FC = () => {
    const points = useMemo<Point[]>(() => [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ], [])

    const connections = useMemo<Connection[]>(() => [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
    ], [])

    return <DottedShape points={points} connections={connections} />
}

// Octaedro doteado
const DottedOctahedron: React.FC = () => {
    const points = useMemo<Point[]>(() => [
        [0, 1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1], [0, -1, 0]
    ], [])

    const connections = useMemo<Connection[]>(() => [
        [0, 1], [0, 2], [0, 3], [0, 4],
        [5, 1], [5, 2], [5, 3], [5, 4],
        [1, 2], [2, 3], [3, 4], [4, 1]
    ], [])

    return <DottedShape points={points} connections={connections} />
}

// Icosaedro doteado
const DottedIcosahedron: React.FC = () => {
    const t = (1 + Math.sqrt(5)) / 2
    const points = useMemo<Point[]>(() => [
        [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
        [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
        [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
    ], [])

    const connections = useMemo<Connection[]>(() => [
        [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
        [1, 5], [1, 9], [1, 7], [1, 8],
        [2, 11], [2, 3], [2, 4], [2, 10],
        [3, 9], [3, 4], [3, 6], [3, 8],
        [4, 5], [4, 9], [4, 11],
        [5, 9], [5, 11],
        [6, 7], [6, 8], [6, 10],
        [7, 8], [7, 10],
        [8, 9], [8, 10],
        [9, 11], [10, 11]
    ], [])

    return <DottedShape points={points} connections={connections} />
}

interface Project {
    id: number
    title: string
    description: string
    model: React.FC
}

const projects: Project[] = [
    {
        id: 1,
        title: 'Desarrollo de componentes on-demand',
        description: 'Creación de componentes 3D interactivos y personalizados según las necesidades del cliente.',
        model: DottedCube
    },
    {
        id: 2,
        title: 'Visualización de datos en 3D',
        description: 'Transformación de conjuntos de datos complejos en representaciones 3D interactivas y fáciles de entender.',
        model: DottedOctahedron
    },
    {
        id: 3,
        title: 'Experiencias web inmersivas',
        description: 'Desarrollo de experiencias web únicas e inmersivas utilizando las últimas tecnologías 3D.',
        model: DottedIcosahedron
    },
]

interface AnimatedModelProps {
    Model: React.FC
    isActive: boolean
}

const AnimatedModel: React.FC<AnimatedModelProps> = ({ Model, isActive }) => {
    const ref = useRef<THREE.Group>(null)
    const { viewport } = useThree()

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.5
            ref.current.position.x = THREE.MathUtils.lerp(
                ref.current.position.x,
                isActive ? 0 : viewport.width * (isActive ? 1 : -1),
                0.1
            )
            ref.current.scale.setScalar(THREE.MathUtils.lerp(
                ref.current.scale.x,
                isActive ? 1 : 0.5,
                0.1
            ))
        }
    })

    return (
        <group ref={ref}>
            <Model />
        </group>
    )
}

interface ProjectSceneProps {
    projects: Project[]
    activeIndex: number
}

const ProjectScene: React.FC<ProjectSceneProps> = ({ projects, activeIndex }) => {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {projects.map((project, index) => (
                <AnimatedModel key={project.id} Model={project.model} isActive={index === activeIndex} />
            ))}
            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    )
}

const Projects: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
    const handleNext = () => setActiveIndex((prev) => (prev + 1) % projects.length)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') handlePrev()
            if (e.key === 'ArrowRight') handleNext()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {description, title} = projects[activeIndex]

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center" ref={containerRef}>
            <h1 className="text-4xl font-bold mb-8 text-center">Mis Proyectos</h1>
            <div className="relative w-full" style={{ height: 'min(60vh, 500px)' }}>
                <ProjectScene projects={projects} activeIndex={activeIndex} />
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
                    onClick={handlePrev}
                    aria-label="Proyecto anterior"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
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
                    <Card className="mt-8 max-w-2xl mx-auto">
                        <CardContent className="pt-6">
                            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
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
    )
}

export default Projects