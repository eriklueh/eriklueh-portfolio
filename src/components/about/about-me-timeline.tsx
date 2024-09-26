"use client";

import React, { useCallback, useState } from "react";
import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image: string;
}

const timelineEvents: readonly TimelineEvent[] = [
  {
    year: 2019,
    title: "High School Graduation",
    description:
      "Completed my secondary education, marking the end of an important chapter and the beginning of new adventures.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    year: 2020,
    title: "Falling in Love",
    description:
      "Experienced the transformative power of love, which brought new perspectives and joy to my life.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    year: 2021,
    title: "Starting to Code",
    description:
      "Took my first steps into the world of programming, discovering a passion that would shape my future career.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    year: 2022,
    title: "First Tech Job",
    description:
      "Joined a startup as a full-stack developer, immersing myself in various technologies and gaining valuable experience.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    year: 2023,
    title: "Moving to Tranquility",
    description:
      "Relocated to a peaceful area away from the city, finding a balance between work and a serene lifestyle.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    year: 2024,
    title: "Freelance Journey Begins",
    description:
      "Embarked on a freelance career, offering my services as a frontend developer and working on personal projects.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    year: 2025,
    title: "Future Ventures",
    description:
      "Planning to launch a personal startup focused on an AI-powered study assistant. The journey continues!",
    image: "/placeholder.svg?height=200&width=300",
  },
] as const;

const contentVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0,
  }),
};

export const AboutMeTimeline: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < timelineEvents.length - 1) {
      setDirection(1);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }, [currentIndex]);

  const handleDotClick = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  const currentEvent = timelineEvents[currentIndex];

  if (!currentEvent) {
    return <div>No event data available</div>;
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <h2 className="mb-8 text-center text-3xl font-bold">My Journey</h2>
      <div className="relative mb-12">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 transform bg-gray-200"></div>
        <div className="relative flex justify-between">
          {timelineEvents.map((event, index) => (
            <div key={event.year} className="flex flex-col items-center">
              <motion.div
                className={`h-2 w-2 cursor-pointer rounded-full ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`}
                initial={false}
                animate={{
                  scale: index === currentIndex ? 1.5 : 1,
                  transition: { duration: 0.3 },
                }}
                onClick={() => handleDotClick(index)}
              />
              <span className="mt-2 text-xs font-medium text-gray-500">
                {event.year}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden" style={{ height: "400px" }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full"
          >
            <img
              src={currentEvent.image}
              alt={currentEvent.title}
              className="mb-6 h-64 w-full rounded-lg object-cover"
            />
            <h4 className="mb-3 text-xl font-semibold">{currentEvent.title}</h4>
            <p className="text-gray-600">{currentEvent.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex justify-between">
        <Button
          variant="ghost"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Previous
        </Button>
        <Button
          variant="ghost"
          onClick={goToNext}
          disabled={currentIndex === timelineEvents.length - 1}
          className="text-gray-600 hover:text-gray-800"
        >
          Next <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
