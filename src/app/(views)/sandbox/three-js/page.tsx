"use client";

import { type FC, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DottedCube,
  DottedIcosahedron,
  DottedOctahedron,
} from "@/components/three/dotted-shapes";
import type { Group } from "three";

type ModelName = "Cube" | "Octahedron" | "Icosahedron";

const models: Record<ModelName, FC> = {
  Cube: DottedCube,
  Octahedron: DottedOctahedron,
  Icosahedron: DottedIcosahedron,
};

interface SceneProps {
  modelName: ModelName;
  color: string;
  rotationSpeed: number;
  scale: number;
}

function Scene({
  modelName,
  color,
  rotationSpeed,
  scale,
}: SceneProps): JSX.Element {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * rotationSpeed;
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  const Model = models[modelName];

  return (
    <group ref={groupRef} scale={scale}>
      <Model />
      <ColoredLines color={color} />
    </group>
  );
}

interface ColoredLinesProps {
  color: string;
}

function ColoredLines({ color }: ColoredLinesProps): JSX.Element {
  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={24}
          array={new Float32Array(24 * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} />
    </lineSegments>
  );
}

export default function ThreeJSSandbox(): JSX.Element {
  const [modelName, setModelName] = useState<ModelName>("Cube");
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState("#ffffff");

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Three.js Sandbox</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="aspect-square lg:col-span-2">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Scene
              modelName={modelName}
              color={color}
              rotationSpeed={rotationSpeed}
              scale={scale}
            />
            <OrbitControls />
          </Canvas>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Select Model</h2>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(models) as ModelName[]).map((name) => (
                <Button
                  key={name}
                  onClick={() => setModelName(name)}
                  variant={modelName === name ? "default" : "outline"}
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">Rotation Speed</h2>
            <Slider
              min={0}
              max={5}
              step={0.1}
              value={[rotationSpeed]}
              onValueChange={(value) =>
                setRotationSpeed(value[0] ?? rotationSpeed)
              }
            />
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">Scale</h2>
            <Slider
              min={0.5}
              max={2}
              step={0.1}
              value={[scale]}
              onValueChange={(value) => setScale(value[0] ?? scale)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
