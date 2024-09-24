import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { ProjectSceneProps } from "@/types/types";
import { AnimatedModel } from "@/components/projects-view/animated-model";

export const ProjectScene: React.FC<ProjectSceneProps> = ({ projects, activeIndex }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {projects.map((project, index) => (
        <AnimatedModel key={project.id} Model={project.model} isActive={index === activeIndex} />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}