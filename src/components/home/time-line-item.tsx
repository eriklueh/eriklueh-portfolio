import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, ChevronDown, ExternalLink, Code } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { TimelineItem as TimelineItemType } from "@/types/types";

interface TimelineItemProps {
    item: TimelineItemType
    onClick: () => void
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, onClick }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Card className="mb-4">
            <CardContent className="p-4">
                <div className="flex items-center mb-2">
                    <div className="mr-2 p-1 rounded-full bg-primary/10">
                        {item.type === 'work' ? <Briefcase className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                    </div>
                    <div>
                        <time className="text-xs font-medium text-muted-foreground">{item.year}</time>
                        <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.company}</p>
                    </div>
                </div>
                <p className="mb-2 text-sm text-muted-foreground">{item.description}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                    {item.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            setIsOpen(!isOpen)
                            onClick()
                        }}
                        className="text-xs"
                    >
                        {isOpen ? "Ver menos" : "Ver más"}
                        <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </Button>
                    {item.link && (
                        <Button variant="outline" size="sm" asChild className="text-xs">
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                Ver proyecto <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                        </Button>
                    )}
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mt-3 space-y-2 text-sm">
                                {item.details.map((detail, index) => (
                                    <div key={index} className={`${detail.startsWith('-') ? 'ml-3 text-muted-foreground' : 'font-medium text-primary'}`}>
                                        {detail.startsWith('-') ? (
                                            <div className="flex items-start">
                                                <span className="mr-2 text-primary">•</span>
                                                <span>{detail.slice(1).trim()}</span>
                                            </div>
                                        ) : (
                                            detail
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}