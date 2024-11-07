'use client'

import { Code, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { timelineData } from "@/components/home/data"
import { TechIconCloudComponent } from "@/components/tech-icon-cloud"

const skills = Array.from(new Set(timelineData.flatMap(item => item.skills))).sort()

interface SkillsCardProps {
    onSkillClick: (skill: string) => void;
    selectedSkill: string;
}

export const SkillsCard: React.FC<SkillsCardProps> = ({ onSkillClick, selectedSkill }) => {
    const techIcons = [
        "amazonaws", "amazonec2", "awslambda", "amazons3", "amazonrds",
        "aceternityui", "antdesign", "chakraui", "drizzle", "framer",
        "gitlab", "go", "javascript", "langchain", "materialui",
        "nextdotjs", "openai", "python", "radixui", "react","supabase", "tailwindcss", "threedotjs", "typescript",
        "vercel","vite","leaflet","stripe","auth0"
    ]

    return (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1fr,2fr]">
            <Card className="flex flex-col h-[400px] overflow-hidden">
                <CardContent className="flex-grow p-4">
                    <div className="w-full h-full flex items-center justify-center">
                        <TechIconCloudComponent iconSlugs={techIcons} />
                    </div>
                </CardContent>
            </Card>

            <Card className="flex flex-col h-[400px]">
                <CardHeader className="flex-shrink-0 pb-2">
                    <CardTitle className="flex items-center space-x-2 text-xl">
                        <Code className="h-6 w-6" />
                        <span>Skills & Technologies</span>
                    </CardTitle>
                    <div className="text-sm text-muted-foreground flex items-center mt-2">
                        <Info className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Haz clic en una habilidad para filtrar proyectos y experiencia</span>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow pt-4 overflow-hidden">
                    <div className="flex flex-col h-full">
                        <ScrollArea className="flex-grow">
                            <div className="flex flex-wrap gap-3 pr-4 pb-4"> {/* Update: Increased gap */}
                                {skills.map((skill) => (
                                    <TooltipProvider key={skill}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Badge
                                                    variant={skill === selectedSkill ? "default" : "secondary"}
                                                    className={`px-2 py-1 text-sm cursor-pointer transition-colors ${
                                                        skill === selectedSkill
                                                            ? ""
                                                            : "hover:bg-secondary/80"
                                                    }`}
                                                    onClick={() => onSkillClick(skill === selectedSkill ? "" : skill)}
                                                >
                                                    {skill}
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Clic para filtrar por {skill}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}