"use client"

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SectionCardProps {
    title: string
    icon: React.ElementType
    model: React.ElementType
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, icon: Icon, model: Model }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Card
            className="relative overflow-hidden h-[250px] transition-all duration-300 group hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Model />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate={isHovered} autoRotateSpeed={5} />
                </Canvas>
            </div>
            <div className="relative z-10 flex flex-col justify-between h-full p-6">
                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <Icon className="h-6 w-6 text-primary" />
                        <h3 className="text-xl font-semibold">{title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Explore {title.toLowerCase()}
                    </p>
                </div>
                <Link href={`/${title.toLowerCase()}`} passHref className="mt-4">
                    <Button
                        variant="secondary"
                        className="w-full justify-between group/button hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                        aria-label={`Learn more about ${title}`}
                    >
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 transform group-hover/button:translate-x-1 transition-transform duration-300" />
                    </Button>
                </Link>
            </div>
        </Card>
    )
}