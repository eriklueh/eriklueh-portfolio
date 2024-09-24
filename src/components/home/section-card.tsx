"use client"

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SectionCardProps {
    title: string
    icon: React.ElementType
    model: React.ElementType
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, icon: Icon, model: Model }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Card
            className="relative overflow-hidden h-[200px] transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/${title.toLowerCase()}`} className="absolute inset-0 z-10">
                <span className="sr-only">Go to {title}</span>
            </Link>
            <CardHeader className="relative z-20">
                <CardTitle className="flex items-center space-x-2">
                    <Icon className="h-6 w-6" />
                    <span>{title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="relative z-20">
                <p className="text-sm text-muted-foreground">
                    Explore {title.toLowerCase()} <ArrowRight className="inline ml-1 h-4 w-4" />
                </p>
            </CardContent>
            <div className="absolute inset-0 opacity-20">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Model />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate={isHovered} autoRotateSpeed={5} />
                </Canvas>
            </div>
        </Card>
    )
}