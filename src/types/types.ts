export type Point = [number, number, number]
export type Connection = [number, number]

export interface Project {
  id: number
  title: string
  description: string
  model: React.FC
}

export interface DottedShapeProps {
  points: Point[]
  connections: Connection[]
}

export interface AnimatedModelProps {
  Model: React.FC
  isActive: boolean
}

export interface ProjectSceneProps {
  projects: Project[]
  activeIndex: number
}