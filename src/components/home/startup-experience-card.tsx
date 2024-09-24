import { Rocket } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const startups = [
    { name: "TechInnovate", role: "Co-founder", year: "2022" },
    { name: "DataDrive", role: "Lead Developer", year: "2021" },
]

export const StartupExperienceCard: React.FC = () => {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Rocket className="h-6 w-6" />
                    <span>Startup Experience</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {startups.map((startup) => (
                        <div key={startup.name} className="space-y-1">
                            <h3 className="font-semibold">{startup.name}</h3>
                            <p className="text-sm text-muted-foreground">{startup.role} | {startup.year}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}