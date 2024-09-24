import { Briefcase } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const WorkExperienceCard: React.FC = () => {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="h-6 w-6" />
                    <span>Work Experience</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold">Freelance Developer</h3>
                        <p className="text-sm text-muted-foreground">Jan 2024 - Present</p>
                        <p className="text-sm">Designing and developing product landing and marketing pages for various clients.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Software Developer | Walden.ai</h3>
                        <p className="text-sm text-muted-foreground">Mar 2022 - Present</p>
                        <p className="text-sm">Developing and maintaining systems using Python, Go, AWS, and ReactJS.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}