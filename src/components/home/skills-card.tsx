import { Code } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skills = [
    "JavaScript", "TypeScript", "ReactJS", "Go", "Docker", "AWS", "Python", "Git"
]

export const SkillsCard: React.FC = () => {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Code className="h-6 w-6" />
                    <span>Skills & Technologies</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span key={skill} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
              {skill}
            </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}