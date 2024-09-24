"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Link from 'next/link'
import { ArrowRight, User, Briefcase, DollarSign, Mail, Code, GraduationCap, Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DottedCube, DottedOctahedron, DottedIcosahedron } from '@/components/three/dotted-shapes'

const sections = [
  { title: "About", icon: User, model: DottedCube },
  { title: "Projects", icon: Briefcase, model: DottedOctahedron },
  { title: "Pricing", icon: DollarSign, model: DottedIcosahedron },
  { title: "Contact", icon: Mail, model: DottedCube },
]

const skills = [
  "JavaScript", "TypeScript", "ReactJS", "Go", "Docker", "AWS", "Python", "Git"
]

const SectionCard = ({ title, icon: Icon, model: Model }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="relative overflow-hidden h-[200px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center space-x-2">
          <Icon className="h-6 w-6" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <Link href={`/${title.toLowerCase()}`} className="text-sm text-muted-foreground hover:underline">
          Learn more <ArrowRight className="inline ml-1 h-4 w-4" />
        </Link>
      </CardContent>
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Model />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={isHovered} autoRotateSpeed={5} />
        </Canvas>
      </div>
    </Card>
  )
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">Erik Estrada Herrera</CardTitle>
              <p className="text-xl text-muted-foreground">Full-Stack Developer & Creative Technologist</p>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                I'm a curious developer always looking for new opportunities to grow professionally.
                With experience in both frontend and backend development, I specialize in creating
                innovative solutions using cutting-edge technologies.
              </p>
              <div className="flex space-x-4 mb-4">
                <Button variant="outline" size="icon" asChild>
                  <a href="https://github.com/eriklueh" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://www.linkedin.com/in/eriklueh/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://twitter.com/yourtwitterhandle" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <Button asChild>
                <Link href="/contact" className="flex items-center">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-6 w-6" />
                <span>Skills & Technologies</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {sections.map((section) => (
            <SectionCard key={section.title} {...section} />
          ))}
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-6 w-6" />
                <span>Work Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Freelance Developer</h3>
                  <p className="text-sm text-muted-foreground">Jan 2024 - Present</p>
                  <p className="text-sm">Designing and developing product landing and marketing pages for various clients.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Software Developer | Walden.ai</h3>
                  <p className="text-sm text-muted-foreground">Mar 2022 - Present</p>
                  <p className="text-sm">Developing and maintaining systems using Python, Go, AWS, and ReactJS.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
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
        </motion.div>
      </div>
    </div>
  )
}