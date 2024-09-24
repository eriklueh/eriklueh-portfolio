"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MinimalBentoProfileCard } from "@/components/home/bento-profile-card"
import { SkillsCard } from "@/components/home/skills-card"
import { SectionCard } from "@/components/home/section-card"
import { ExperienceSearchCard } from "@/components/home/experience-search-card"
import { sections } from "@/components/home/data"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSkillClick = (skill: string) => {
    setSearchTerm(skill)
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <motion.div
              className="w-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
          >
            <MinimalBentoProfileCard />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ExperienceSearchCard searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SkillsCard onSkillClick={handleSkillClick} />
            </motion.div>
          </div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
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