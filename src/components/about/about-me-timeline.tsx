"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { GraduationCap, Heart, Code, Briefcase, Home, Laptop, Rocket, X, Image as ImageIcon, ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TimelineEvent {
  year: number
  title: string
  description: string
  icon: React.ReactNode
  images?: string[]
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 2019,
    title: "High School Graduation",
    description: "Completed my secondary education, marking the end of an important chapter and the beginning of new adventures.",
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    year: 2020,
    title: "Falling in Love",
    description: "Experienced the transformative power of love, which brought new perspectives and joy to my life.",
    icon: <Heart className="h-6 w-6" />,
  },
  {
    year: 2021,
    title: "Starting to Code",
    description: "Took my first steps into the world of programming, discovering a passion that would shape my future career.",
    icon: <Code className="h-6 w-6" />,
  },
  {
    year: 2022,
    title: "First Tech Job",
    description: "Joined a startup as a full-stack developer, immersing myself in various technologies and gaining valuable experience.",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    year: 2023,
    title: "Moving to Tranquility",
    description: "Relocated to a peaceful area away from the city, finding a balance between work and a serene lifestyle.",
    icon: <Home className="h-6 w-6" />,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tranquility1-Hy5Ue5Ue9Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tranquility2-Hy5Ue5Ue9Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tranquility3-Hy5Ue5Ue9Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg",
    ],
  },
  {
    year: 2024,
    title: "Freelance Journey Begins",
    description: "Embarked on a freelance career, offering my services as a frontend developer and working on personal projects.",
    icon: <Laptop className="h-6 w-6" />,
  },
  {
    year: 2025,
    title: "Future Ventures",
    description: "Planning to launch a personal startup focused on an AI-powered study assistant. The journey continues!",
    icon: <Rocket className="h-6 w-6" />,
  },
]

const TimelineItem: React.FC<{ event: TimelineEvent }> = ({ event }) => {
  const [showGallery, setShowGallery] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const getImageSrc = (images: string[] | undefined, index: number): string => {
    if (images && images.length > index) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return images[index];
    }
    return '';
  };

  const hasImages = event.images && event.images.length > 0

  return (
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="flex h-full items-center justify-center px-4"
      >
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <div className="mb-6 flex items-center space-x-4">
              <div className="text-primary">
                {event.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{event.title}</h3>
                <span className="text-sm font-medium text-muted-foreground">{event.year}</span>
              </div>
            </div>
            <p className="mb-4 text-base text-muted-foreground">{event.description}</p>
            {hasImages && (
                <div className="flex justify-end">
                  <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowGallery(true)}
                      aria-label={`View images for ${event.title}`}
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    View Images
                  </Button>
                </div>
            )}
          </CardContent>
        </Card>
        <AnimatePresence>
          {showGallery && hasImages && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
              >
                <Card className="relative max-w-4xl">
                  <CardContent className="p-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowGallery(false)}
                        className="absolute right-2 top-2"
                        aria-label="Close gallery"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <Image
                          src={getImageSrc(event.images, selectedImageIndex)}
                          alt={`${event.title} image ${selectedImageIndex + 1}`}
                          layout="fill"
                          objectFit="cover"
                      />
                    </div>
                    <div className="mt-4 flex justify-center space-x-2">
                      {event.images?.map((_, index) => (
                          <Button
                              key={index}
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedImageIndex(index)}
                              className={`h-2 w-2 rounded-full p-0 ${
                                  index === selectedImageIndex ? "bg-primary" : "bg-muted"
                              }`}
                              aria-label={`View image ${index + 1}`}
                          />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
  )
}

export default function CenteredTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const newIndex = Math.min(
          Math.floor(latest * timelineEvents.length),
          timelineEvents.length - 1
      )
      setCurrentIndex(newIndex)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  const handleScroll = (direction: 'up' | 'down') => {
    const newIndex = direction === 'up'
        ? Math.max(currentIndex - 1, 0)
        : Math.min(currentIndex + 1, timelineEvents.length - 1)
    setCurrentIndex(newIndex)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    containerRef.current?.children[newIndex].scrollIntoView({ behavior: 'smooth' })
  }

  return (
      <div className="relative h-screen">
        <div
            ref={containerRef}
            className="h-full overflow-y-scroll snap-y snap-mandatory"
        >
          {timelineEvents.map((event, index) => (
              <div key={event.year} className="h-full w-full snap-start">
                <AnimatePresence mode="wait">
                  {index === currentIndex && <TimelineItem event={event} />}
                </AnimatePresence>
              </div>
          ))}
        </div>
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 transform flex-col space-y-2">
          <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('up')}
              aria-label="Previous event"
              disabled={currentIndex === 0}
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
          <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('down')}
              aria-label="Next event"
              disabled={currentIndex === timelineEvents.length - 1}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
  )
}