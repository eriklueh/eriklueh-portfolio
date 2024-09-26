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
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div className="lg:col-span-3 space-y-2">
            <MinimalBentoProfileCard />
            <SkillsCard onSkillClick={handleSkillClick} />
            <ExperienceSearchCard searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          <div className="lg:col-span-1 space-y-2">
            {sections.map((section, index) => (
                <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                  <SectionCard {...section} />
                </motion.div>
            ))}
          </div>
        </div>
      </div>
  )
}