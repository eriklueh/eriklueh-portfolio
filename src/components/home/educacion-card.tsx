import { GraduationCap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const EducationCard: React.FC = () => {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="h-6 w-6" />
                    <span>Education</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <h3 className="font-semibold">IT Technician</h3>
                <p className="text-sm text-muted-foreground">Colegio Técnico Nro 12 José de San Martin</p>
            </CardContent>
        </Card>
    )
}