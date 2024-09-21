import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function About() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Sobre Mí</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Experiencia</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Con más de 5 años de experiencia en desarrollo web, he trabajado en proyectos diversos que van desde aplicaciones empresariales hasta startups innovadoras.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Habilidades</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside">
                            <li>JavaScript / TypeScript</li>
                            <li>React / Next.js</li>
                            <li>Node.js / Express</li>
                            <li>SQL / NoSQL Databases</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}