"use client";

import { type FC, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DottedCube,
  DottedIcosahedron,
  DottedOctahedron,
  DottedDodecahedron,
  DottedTetrahedron,
} from "@/components/three/dotted-shapes";
import type { Group } from "three";

type ModelName = "Cube" | "Octahedron" | "Icosahedron" | "Dodecahedron" | "Tetrahedron";

const models: Record<ModelName, FC> = {
  Cube: DottedCube,
  Octahedron: DottedOctahedron,
  Icosahedron: DottedIcosahedron,
  Dodecahedron: DottedDodecahedron,
  Tetrahedron: DottedTetrahedron,
};

interface SceneProps {
  modelName: ModelName;
  rotationSpeed: number;
  scale: number;
  autoRotate: boolean;
}

function Scene({
                 modelName,
                 rotationSpeed,
                 scale,
                 autoRotate,
               }: SceneProps): JSX.Element {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.x += delta * rotationSpeed;
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  const Model = models[modelName];

  return (
      <group ref={groupRef} scale={scale}>
        <Model />
      </group>
  );
}

export default function ThreeJSSandbox(): JSX.Element {
  const [modelName, setModelName] = useState<ModelName>("Cube");
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [scale, setScale] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);

  const resetControls = () => {
    setModelName("Cube");
    setRotationSpeed(1);
    setScale(1);
    setAutoRotate(true);
  };

  return (
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-3xl font-bold">Three.js Sandbox</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="aspect-square lg:col-span-2">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <Scene
                  modelName={modelName}
                  rotationSpeed={rotationSpeed}
                  scale={scale}
                  autoRotate={autoRotate}
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
                  onValueChange={(value) => setRotationSpeed(value[0] ?? rotationSpeed)}
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

            <div className="flex items-center space-x-2">
              <Switch
                  id="auto-rotate"
                  checked={autoRotate}
                  onCheckedChange={setAutoRotate}
              />
              <Label htmlFor="auto-rotate">Auto Rotate</Label>
            </div>

            <Button onClick={resetControls} variant="outline" className="w-full">
              Reset Controls
            </Button>
          </div>
        </div>
      </div>
  );
}