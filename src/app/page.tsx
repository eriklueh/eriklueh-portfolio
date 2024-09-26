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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  }

  return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <motion.div
              className="lg:col-span-3 space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
          >
            <motion.div variants={itemVariants}>
              <MinimalBentoProfileCard />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SkillsCard onSkillClick={handleSkillClick} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ExperienceSearchCard searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </motion.div>
          </motion.div>
          <motion.div
              className="lg:col-span-1 space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
          >
            {sections.map((section, index) => (
                <motion.div
                    key={section.title}
                    variants={itemVariants}
                >
                  <SectionCard {...section} />
                </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
  )
}