import { useMemo } from 'react'
import type { Connection, Point } from "@/types/types"
import { DottedShape } from "@/components/three/dotted-shape"

export const DottedCube: React.FC = () => {
  const points = useMemo<Point[]>(() => [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
  ], [])

  const connections = useMemo<Connection[]>(() => [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
  ], [])

  return <DottedShape points={points} connections={connections} />
}

export const DottedOctahedron: React.FC = () => {
  const points = useMemo<Point[]>(() => [
    [0, 1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1], [0, -1, 0]
  ], [])

  const connections = useMemo<Connection[]>(() => [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [5, 1], [5, 2], [5, 3], [5, 4],
    [1, 2], [2, 3], [3, 4], [4, 1]
  ], [])

  return <DottedShape points={points} connections={connections} />
}

export const DottedIcosahedron: React.FC = () => {
  const t = (1 + Math.sqrt(5)) / 2
  const points = useMemo<Point[]>(() => [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
  ], [])

  const connections = useMemo<Connection[]>(() => [
    [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
    [1, 5], [1, 9], [1, 7], [1, 8],
    [2, 11], [2, 3], [2, 4], [2, 10],
    [3, 9], [3, 4], [3, 6], [3, 8],
    [4, 5], [4, 9], [4, 11],
    [5, 9], [5, 11],
    [6, 7], [6, 8], [6, 10],
    [7, 8], [7, 10],
    [8, 9], [8, 10],
    [9, 11], [10, 11]
  ], [])

  return <DottedShape points={points} connections={connections} />
}

export const DottedDodecahedron: React.FC = () => {
  const phi = (1 + Math.sqrt(5)) / 2
  const points = useMemo<Point[]>(() => [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
    [0, -phi, -1/phi], [0, phi, -1/phi], [0, phi, 1/phi], [0, -phi, 1/phi],
    [-1/phi, 0, -phi], [1/phi, 0, -phi], [1/phi, 0, phi], [-1/phi, 0, phi],
    [-phi, -1/phi, 0], [-phi, 1/phi, 0], [phi, 1/phi, 0], [phi, -1/phi, 0]
  ], [])

  const connections = useMemo<Connection[]>(() => [
    [0, 8], [0, 12], [0, 16], [1, 8], [1, 13], [1, 19],
    [2, 9], [2, 13], [2, 18], [3, 9], [3, 12], [3, 17],
    [4, 11], [4, 15], [4, 16], [5, 11], [5, 14], [5, 19],
    [6, 10], [6, 14], [6, 18], [7, 10], [7, 15], [7, 17],
    [8, 11], [9, 10], [12, 13], [14, 15], [16, 17], [18, 19]
  ], [])

  return <DottedShape points={points} connections={connections} />
}

export const DottedTetrahedron: React.FC = () => {
  const points = useMemo<Point[]>(() => [
    [1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]
  ], [])

  const connections = useMemo<Connection[]>(() => [
    [0, 1], [0, 2], [0, 3],
    [1, 2], [1, 3],
    [2, 3]
  ], [])

  return <DottedShape points={points} connections={connections} />
}