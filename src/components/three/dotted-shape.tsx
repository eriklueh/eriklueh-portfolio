"use client"

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'
import type { DottedShapeProps } from "@/types/types"
import { useTheme } from 'next-themes'

export const DottedShape: React.FC<DottedShapeProps> = ({ points, connections }) => {
  const groupRef = useRef<THREE.Group>(null)
  const { theme } = useTheme()

  const color = theme === 'dark' ? '#ffffff' : '#93866c'

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.2
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
      <group ref={groupRef}>
        {connections.map((connection, lineIndex) => (
            <group key={lineIndex}>
              {Array.from({ length: 20 }, (_, i) => {
                const t = i / 19
                const [aIndex, bIndex] = connection
                const a = points[aIndex]
                const b = points[bIndex]
                if (!a || !b) return null
                const x = a[0] + (b[0] - a[0]) * t
                const y = a[1] + (b[1] - a[1]) * t
                const z = a[2] + (b[2] - a[2]) * t
                return (
                    <mesh key={i} position={[x, y, z]}>
                      <sphereGeometry args={[0.03, 8, 8]} />
                      <meshBasicMaterial color={color} />
                    </mesh>
                )
              })}
            </group>
        ))}
      </group>
  )
}