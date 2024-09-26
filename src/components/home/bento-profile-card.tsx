import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Twitter, Rocket, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const startups = [
    { name: "Walden.ai", role: "Front-end Developer", year: "2022" },
]

export const MinimalBentoProfileCard: React.FC = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-full bg-background">
                <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold">Erik Estrada Herrera</h1>
                        <p className="text-muted-foreground">Full-Stack Developer & Creative Technologist</p>
                    </div>
                    <div className="flex space-x-2">
                        {[
                            { icon: Github, href: "https://github.com/eriklueh", label: "GitHub" },
                            { icon: Linkedin, href: "https://www.linkedin.com/in/eriklueh/", label: "LinkedIn" },
                            { icon: Twitter, href: "https://twitter.com/yourtwitterhandle", label: "Twitter" },
                        ].map((social) => (
                            <Button key={social.label} variant="outline" size="icon" asChild>
                                <a href={social.href} target="_blank" rel="noopener noreferrer">
                                    <social.icon className="h-4 w-4" />
                                    <span className="sr-only">{social.label}</span>
                                </a>
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-full md:col-span-2 md:row-span-2">
                <CardContent className="p-6 h-full flex flex-col">
                    <h2 className="text-lg font-semibold flex items-center mb-4">
                        <User className="h-5 w-5 mr-2" />Me
                    </h2>
                    <p className="text-sm flex-grow">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        I'm a curious developer always looking for new opportunities to grow professionally.
                        With experience in both frontend and backend development, I specialize in creating
                        innovative solutions using cutting-edge technologies. My focus has been on practical
                        experience through work and startup ventures, allowing me to develop a diverse skill set
                        and adaptability in the fast-paced tech industry.
                    </p>
                    <Button asChild className="mt-4 w-full sm:w-auto">
                        <Link href="/contact" className="flex items-center justify-center">
                            Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <Card className="col-span-full md:col-span-1 md:row-span-2">
                <CardContent className="p-6 h-full flex flex-col">
                    <h2 className="text-lg font-semibold flex items-center mb-4">
                        <Rocket className="h-5 w-5 mr-2" /> Startup Experience
                    </h2>
                    <div className="flex-grow">
                        {startups.map((startup) => (
                            <div key={startup.name} className="bg-muted p-4 rounded-lg">
                                <h3 className="font-semibold">{startup.name}</h3>
                                <p className="text-sm text-muted-foreground">{startup.role}</p>
                                <p className="text-sm text-muted-foreground">{startup.year}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}