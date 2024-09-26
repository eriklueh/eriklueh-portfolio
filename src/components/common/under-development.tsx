"use client"

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Construction, HardHat } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface UnderDevelopmentProps {
    title?: string
    description?: string
    returnLink?: string
    returnText?: string
}

const shakeAnimation: Variants = {
    shake: {
        rotate: [0, -3, 3, -3, 3, 0],
        transition: {
            duration: 0.7,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            repeatDelay: 1
        }
    }
}

export const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({
                                                                      title = "Under Construction",
                                                                      description = "This view is under development.",
                                                                  }) => {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-8 max-w-md"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                    className="relative w-16 h-24 mx-auto mb-6"
                >
                    <Construction className="w-16 h-16 absolute bottom-0 left-0 text-primary" />
                    <motion.div
                        variants={shakeAnimation}
                        animate="shake"
                        className="absolute -top-6 left-3 -translate-x-1/2"
                    >
                        <HardHat className="w-10 h-10 text-yellow-500" />
                    </motion.div>
                </motion.div>
                <h1 className="text-3xl font-bold mb-4 text-foreground">{title}</h1>
                <p className="text-lg text-muted-foreground mb-8">
                    {description}
                </p>
            </motion.div>
        </div>
    )
}