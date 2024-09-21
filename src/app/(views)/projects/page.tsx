import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

const projects = [
    { id: 1, title: 'E-commerce Platform', description: 'A full-stack e-commerce solution built with Next.js and Stripe.' },
    { id: 2, title: 'Task Management App', description: 'A React Native mobile app for managing daily tasks and productivity.' },
    { id: 3, title: 'Data Visualization Dashboard', description: 'An interactive dashboard using D3.js for visualizing complex datasets.' },
]

export default function Projects() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Mis Proyectos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Card key={project.id}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                {project.title}
                                <ExternalLink size={20} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{project.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}