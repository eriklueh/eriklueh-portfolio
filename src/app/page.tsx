"use client"

import { motion } from 'framer-motion'
import { User, Briefcase, DollarSign, Mail, Box } from 'lucide-react'
import { DottedCube, DottedOctahedron, DottedIcosahedron, DottedDodecahedron, DottedTetrahedron } from '@/components/three/dotted-shapes'
import {ProfileCard} from "@/components/home/profile-card";
import {SkillsCard} from "@/components/home/skills-card";
import {WorkExperienceCard} from "@/components/home/work-experience-card";
import {StartupExperienceCard} from "@/components/home/startup-experience-card";
import {EducationCard} from "@/components/home/educacion-card";
import {SectionCard} from "@/components/home/section-card";

const sections = [
  { title: "About", icon: User, model: DottedCube },
  { title: "Projects", icon: Briefcase, model: DottedOctahedron },
  { title: "Pricing", icon: DollarSign, model: DottedIcosahedron },
  { title: "Sandbox", icon: Box, model: DottedDodecahedron },
  { title: "Contact", icon: Mail, model: DottedTetrahedron },
]

export default function Home() {
  return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
              <ProfileCard />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SkillsCard />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
              <WorkExperienceCard />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
              <StartupExperienceCard />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
              <EducationCard />
            </motion.div>
          </div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {sections.map((section) => (
                  <SectionCard key={section.title} {...section} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
  )
}