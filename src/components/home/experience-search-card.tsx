import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TimelineItem } from './time-line-item'
import { timelineData } from './data'

interface ExperienceSearchCardProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export const ExperienceSearchCard: React.FC<ExperienceSearchCardProps> = ({ searchTerm, onSearchChange }) => {
    const [activeTab, setActiveTab] = useState<'work' | 'projects'>('work')
    const contentRef = useRef<HTMLDivElement>(null)

    const filteredData = timelineData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const workData = filteredData.filter(item => item.type === 'work')
    const projectData = filteredData.filter(item => item.type === 'project')

    const scrollToItem = (index: number) => {
        if (contentRef.current) {
            const items = contentRef.current.children
            if (items[index]) {
                items[index].scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }
    }

    return (
        <Card className="w-full h-[400px] flex flex-col">
            <CardContent className="p-4 flex-shrink-0">
                <div className="relative w-full">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Buscar por habilidad, título o descripción..."
                        className="pl-8 text-sm"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'work' | 'projects')} className="flex-grow overflow-y-auto mx-5 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-4 px-1">
                    <TabsTrigger value="work" className="text-sm">Experiencia Laboral</TabsTrigger>
                    <TabsTrigger value="projects" className="text-sm">Proyectos</TabsTrigger>
                </TabsList>
                <div className="flex-grow overflow-y-auto px-4">
                    <TabsContent value="work" className="mt-0">
                        <div ref={contentRef} className="h-full pr-2">
                            <AnimatePresence>
                                {workData.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <TimelineItem item={item} onClick={() => scrollToItem(index)} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {workData.length === 0 && (
                                <p className="text-center text-muted-foreground text-sm mt-4">No se encontraron resultados para experiencia laboral.</p>
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="projects" className="mt-0">
                        <div ref={contentRef} className="h-full pr-2">
                            <AnimatePresence>
                                {projectData.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <TimelineItem item={item} onClick={() => scrollToItem(index)} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {projectData.length === 0 && (
                                <p className="text-center text-muted-foreground text-sm mt-4">No se encontraron resultados para proyectos.</p>
                            )}
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </Card>
    )
}