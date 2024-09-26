"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

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

const TimelineItem: React.FC<{ event: TimelineEvent; isActive: boolean }> = ({
  event,
  isActive,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    const animateControls = async () => {
      if (inView) {
        await controls.start({ opacity: 1, y: 0 });
      } else {
        await controls.start({ opacity: 0, y: 50 });
      }
    };

    animateControls().catch((error) => {
      console.error("Animation failed:", error);
    });
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-16 flex flex-row"
    >
      <div className="mr-4 flex flex-col items-center">
        <motion.div
          className={`h-4 w-4 rounded-full ${inView ? "bg-primary" : "bg-gray-300"}`}
          animate={{ scale: inView ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="my-2 h-full w-px bg-gray-300" />
      </div>
      <div className="flex-1">
        <motion.div
          animate={{
            opacity: inView ? 1 : 0.5,
            scale: inView ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="ml-2"
        >
          <motion.span
            className={`ml-2 text-lg font-bold ${inView ? "text-primary" : "text-foreground"}`}
            animate={{ opacity: inView ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          >
            {event.year}
          </motion.span>
          <div className="mb-4">
            <Image
              src={event.image}
              alt={event.title}
              width={600}
              height={400}
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <h4 className="mt-2 text-xl font-semibold sm:text-2xl">
              {event.title}
            </h4>
          </div>
          <p className="text-base text-gray-600 sm:text-lg">
            {event.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const AboutMeTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"],
  });

  const activeIndexProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, timelineEvents.length - 1],
  );

  useEffect(() => {
    const unsubscribe = activeIndexProgress.onChange((latest) => {
      setActiveIndex(Math.round(latest));
    });
    return () => unsubscribe();
  }, [activeIndexProgress]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <h2 className="mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl">
        My Journey
      </h2>
      <div ref={timelineRef} className="relative">
        {timelineEvents.map((event, index) => (
          <TimelineItem
            key={event.year}
            event={event}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
};
