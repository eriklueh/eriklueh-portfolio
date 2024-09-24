import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const ProfileCard: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-4xl font-bold">Erik Estrada Herrera</CardTitle>
                <p className="text-xl text-muted-foreground">Full-Stack Developer & Creative Technologist</p>
            </CardHeader>
            <CardContent>
                <p className="text-lg mb-4">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    I'm a curious developer always looking for new opportunities to grow professionally.
                    With experience in both frontend and backend development, I specialize in creating
                    innovative solutions using cutting-edge technologies.
                </p>
                <div className="flex space-x-4 mb-4">
                    <Button variant="outline" size="icon" asChild>
                        <a href="https://github.com/eriklueh" target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                        </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <a href="https://www.linkedin.com/in/eriklueh/" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                        </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <a href="https://twitter.com/yourtwitterhandle" target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4" />
                        </a>
                    </Button>
                </div>
                <Button asChild>
                    <Link href="/contact" className="flex items-center">
                        Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}