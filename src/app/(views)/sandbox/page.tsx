import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const libraries = [
    {
        name: 'Swapy',
        description: 'A framework-agnostic tool that converts any layout into a drag-to-swap one.',
        link: '/sandbox/swapy'
    },
    {
        name: 'Three.js',
        description: 'A cross-browser JavaScript library and API used to create and display animated 3D computer graphics.',
        link: '/sandbox/three-js'
    },
]

export default function SandboxDashboard() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-12 text-center">My Sandbox</h1>
            <div className="max-w-3xl mx-auto">
                <p className="text-lg mb-8 text-center">Welcome to my sandbox! Here, I experiment with various libraries and showcase some interesting projects.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {libraries.map((lib) => (
                        <Card key={lib.name} className="flex flex-col">
                            <CardHeader>
                                <CardTitle>{lib.name}</CardTitle>
                                <CardDescription>{lib.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow"></CardContent>
                            <div className="p-4 mt-auto">
                                <Link href={lib.link} passHref>
                                    <Button className="w-full">Explore {lib.name}</Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}