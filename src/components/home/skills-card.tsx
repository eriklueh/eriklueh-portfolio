import { Code } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { timelineData } from "@/components/home/data"

const skills = Array.from(new Set(timelineData.flatMap(item => item.skills))).sort()

interface SkillsCardProps {
    onSkillClick: (skill: string) => void;
    selectedSkill: string;
}

export const SkillsCard: React.FC<SkillsCardProps> = ({ onSkillClick, selectedSkill }) => {
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
                            className={`px-3 py-1.5 rounded-full text-sm ${
                                skill === selectedSkill
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-primary/10 text-primary hover:bg-primary/20"
                            }`}
                            onClick={() => onSkillClick(skill === selectedSkill ? "" : skill)}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}