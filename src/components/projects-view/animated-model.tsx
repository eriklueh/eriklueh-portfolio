import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { AnimatedModelProps } from "@/types/types"

export const AnimatedModel: React.FC<AnimatedModelProps> = ({ Model, isActive }) => {
  const ref = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        isActive ? 0 : viewport.width * (isActive ? 1 : -1),
        0.1
      )
      ref.current.scale.setScalar(THREE.MathUtils.lerp(
        ref.current.scale.x,
        isActive ? 1 : 0.5,
        0.1
      ))
    }
  })

  return (
    <group ref={ref}>
      <Model />
    </group>
  )
}