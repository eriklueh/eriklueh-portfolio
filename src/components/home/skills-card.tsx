import { Code } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {timelineData} from "@/components/home/data";

const skills = Array.from(new Set(timelineData.flatMap(item => item.skills))).sort()

interface SkillsCardProps {
    onSkillClick: (skill: string) => void;
}

export const SkillsCard: React.FC<SkillsCardProps> = ({ onSkillClick }) => {
    return (
        <Card className="flex flex-col max-h-[400px]">
            <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center space-x-2">
                    <Code className="h-6 w-6" />
                    <span>Skills & Technologies</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <button
                            key={skill}
                            className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm hover:bg-primary/20 transition-colors"
                            onClick={() => onSkillClick(skill)}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}