import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

// 1. Floating geometric wireframe sphere that rotates and pulses
const WireframeNetwork = () => {
    const meshRef = useRef();
    const linesRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.2;
            meshRef.current.rotation.y = t * 0.3;
            // Pulsing effect
            const scale = 1 + Math.sin(t * 2) * 0.05;
            meshRef.current.scale.set(scale, scale, scale);
        }
        if (linesRef.current) {
            linesRef.current.rotation.x = t * 0.2;
            linesRef.current.rotation.y = t * 0.3;
            const scale = 1 + Math.sin(t * 2) * 0.05;
            linesRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group position={[3, 0, -5]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
                <Sphere ref={meshRef} args={[1.5, 16, 16]}>
                    <meshStandardMaterial attach="material" color="#00f5d4" wireframe={true} emissive="#00f5d4" emissiveIntensity={0.5} transparent opacity={0.6} />
                </Sphere>
                {/* Adding some outer particles representing nodes */}
                <Points ref={linesRef}>
                    <sphereGeometry args={[1.55, 16, 16]} />
                    <PointMaterial transparent color="#7c3aed" size={0.05} sizeAttenuation={true} depthWrite={false} emissive="#7c3aed" />
                </Points>
            </Float>
        </group>
    );
};

// 2. Glowing code matrix rain in 3D depth layers
const MatrixRain = () => {
    const count = 2000;
    const pointsRef = useRef();

    const [positions] = useState(() => {
        const pos = new Float32Array(count * 3);
        const chars = new Float32Array(count); // we could use to pick texture/color if needed
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;     // x
            pos[i * 3 + 1] = Math.random() * 20 - 10;    // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5; // z
        }
        return pos;
    });

    useFrame((state, delta) => {
        if (!pointsRef.current) return;
        const positions = pointsRef.current.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            // let particle fall
            positions[i * 3 + 1] -= delta * (2 + Math.random() * 2);
            // reset particle if it falls too low
            if (positions[i * 3 + 1] < -10) {
                positions[i * 3 + 1] = 10;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                color="#00f5d4"
                size={0.08}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};


export default function Hero3DBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f5d4" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#7c3aed" />

                <MatrixRain />
                <WireframeNetwork />
            </Canvas>
        </div>
    );
}
