import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Float, PointMaterial, Points, Stars, Torus, Box, MeshDistortMaterial, MeshWobbleMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

// --- Hero Components (Geometric Objects & Shapes) ---

function GeometricShape({ position, color, geometry, speed = 1, distort = 0.3 }) {
    const mesh = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (mesh.current) {
            mesh.current.rotation.x = time * 0.15 * speed;
            mesh.current.rotation.y = time * 0.1 * speed;
        }
    });

    return (
        <Float speed={speed * 2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={mesh} position={position}>
                {geometry === 'torus' && <torusGeometry args={[1.5, 0.6, 16, 32]} />}
                {geometry === 'octahedron' && <octahedronGeometry args={[1.5, 0]} />}
                {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1.2, 0]} />}
                {geometry === 'icosahedron' && <icosahedronGeometry args={[1.4, 0]} />}
                {geometry === 'torusknot' && <torusKnotGeometry args={[1.1, 0.4, 64, 16]} />}
                <MeshDistortMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.8}
                    wireframe
                    distort={distort}
                    speed={2}
                />
            </mesh>
        </Float>
    );
}

function GlowingSphere({ position, color, size = 1 }) {
    const mesh = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (mesh.current) {
            mesh.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.1);
            mesh.current.rotation.x = time * 0.1;
            mesh.current.rotation.y = time * 0.15;
        }
    });

    return (
        <Float speed={1.5} floatIntensity={3}>
            <mesh ref={mesh} position={position}>
                <sphereGeometry args={[size, 32, 32]} />
                <MeshWobbleMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.6}
                    factor={0.5}
                    speed={2}
                />
            </mesh>
        </Float>
    );
}

function CyberEye({ position, scale = 1 }) {
    const group = useRef();
    const irisRef = useRef();
    const innerCoreRef = useRef();
    const { mouse } = useThree();

    useFrame((state) => {
        if (group.current) {
            // Smoothly point the eye towards the mouse
            const targetX = mouse.x * 2.5;
            const targetY = mouse.y * 2.5;
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05);
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05);

            // Subtle floating motion
            group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3;
            group.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.5) * 0.2;
        }
        if (irisRef.current) {
            irisRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.15);
        }
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {/* Outer Hull */}
            <mesh>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshStandardMaterial color="#2d3748" wireframe transparent opacity={0.3} />
            </mesh>
            {/* Inner Glowing Core */}
            <mesh ref={irisRef}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial color="#00F5D4" emissive="#00F5D4" emissiveIntensity={10} />
            </mesh>
            {/* Pupil pulsing */}
            <mesh position={[0, 0, 0.35]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Tech Rings */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.2, 0.03, 16, 100]} />
                <meshStandardMaterial color="#7C3AED" transparent opacity={0.2} wireframe />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[1, 0.02, 16, 100]} />
                <meshStandardMaterial color="#F59E0B" transparent opacity={0.3} wireframe />
            </mesh>
            {/* Scanning Laser (Subtle) */}
            <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 2, 8]} />
                <meshStandardMaterial color="#00F5D4" transparent opacity={0.15} />
            </mesh>
        </group>
    );
}

function MechaConstruct({ position, scale = 1 }) {
    const group = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (group.current) {
            group.current.rotation.y = t * 0.2;
            group.current.position.y += Math.sin(t) * 0.005;
        }
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {/* Main Body */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 1.5, 0.8]} />
                <meshStandardMaterial color="#7C3AED" wireframe transparent opacity={0.3} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.1, 0]}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshStandardMaterial color="#00F5D4" wireframe transparent opacity={0.4} />
            </mesh>
            {/* Arms */}
            <mesh position={[-0.8, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
                <cylinderGeometry args={[0.1, 0.1, 1.2]} />
                <meshStandardMaterial color="#F59E0B" wireframe transparent opacity={0.3} />
            </mesh>
            <mesh position={[0.8, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <cylinderGeometry args={[0.1, 0.1, 1.2]} />
                <meshStandardMaterial color="#F59E0B" wireframe transparent opacity={0.3} />
            </mesh>
            {/* Floating details */}
            <Float speed={5} rotationIntensity={2}>
                <mesh position={[0, 0, 0.6]}>
                    <octahedronGeometry args={[0.2, 0]} />
                    <meshStandardMaterial color="#00F5D4" emissive="#00F5D4" emissiveIntensity={2} />
                </mesh>
            </Float>
        </group>
    );
}

function RoboticSentinel({ position, scale = 1 }) {
    const group = useRef();
    const probeRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (group.current) {
            group.current.position.y = position[1] + Math.sin(t * 0.5) * 1.5;
            group.current.rotation.z = Math.sin(t * 0.3) * 0.2;
        }
        if (probeRef.current) {
            probeRef.current.rotation.y = t * 2;
        }
    });

    return (
        <group ref={group} position={position} scale={scale}>
            <mesh>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial color="#7C3AED" wireframe transparent opacity={0.2} />
            </mesh>
            <group ref={probeRef}>
                <mesh position={[2, 0, 0]}>
                    <sphereGeometry args={[0.2, 8, 8]} />
                    <meshStandardMaterial color="#00F5D4" emissive="#00F5D4" />
                </mesh>
                <mesh position={[-2, 0, 0]}>
                    <sphereGeometry args={[0.2, 8, 8]} />
                    <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" />
                </mesh>
            </group>
            {/* Scanning Beam */}
            <mesh position={[0, -2, 0]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.1, 2, 4, 32]} />
                <meshStandardMaterial color="#00F5D4" transparent opacity={0.05} />
            </mesh>
        </group>
    );
}

function DataStreams({ count = 20 }) {
    const streams = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            position: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20],
            speed: Math.random() * 0.1 + 0.05,
            length: Math.random() * 4 + 2
        }));
    }, [count]);

    return (
        <group>
            {streams.map((s, i) => (
                <Float key={i} speed={s.speed * 10} floatIntensity={2}>
                    <mesh position={s.position}>
                        <boxGeometry args={[0.02, s.length, 0.02]} />
                        <meshStandardMaterial color="#00F5D4" transparent opacity={0.6} emissive="#00F5D4" emissiveIntensity={1} />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

function HolographicHUD({ position = [0, 0, -10], scale = 1 }) {
    const group = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (group.current) {
            group.current.children[0].rotation.z = t * 0.2;
            group.current.children[1].rotation.z = -t * 0.4;
            group.current.children[2].rotation.x = t * 0.2;
        }
    });

    return (
        <group ref={group} position={position} scale={scale}>
            <mesh>
                <torusGeometry args={[5, 0.02, 16, 100]} />
                <meshStandardMaterial color="#00F5D4" transparent opacity={0.1} />
            </mesh>
            <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[4.5, 0.01, 16, 100]} />
                <meshStandardMaterial color="#7C3AED" transparent opacity={0.15} />
            </mesh>
            <mesh rotation={[-Math.PI / 4, Math.PI / 2, 0]}>
                <torusGeometry args={[6, 0.02, 16, 100]} />
                <meshStandardMaterial color="#F59E0B" transparent opacity={0.08} />
            </mesh>
        </group>
    );
}

function Nebula({ position, color, size = 10 }) {
    const mesh = useRef();
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.02;
            mesh.current.rotation.z = state.clock.getElapsedTime() * 0.01;
        }
    });

    return (
        <group position={position}>
            <mesh ref={mesh}>
                <sphereGeometry args={[size, 32, 32]} />
                <MeshDistortMaterial
                    color={color}
                    transparent
                    opacity={0.03}
                    distort={0.4}
                    speed={1}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}

function Galaxy({ count = 3000 }) {
    const mesh = useRef();
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const colorPalette = [new THREE.Color('#7C3AED'), new THREE.Color('#00F5D4'), new THREE.Color('#F59E0B')];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 20;
            const spinAngle = radius * 5;
            const branchAngle = (i % 3) * ((Math.PI * 2) / 3);

            const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius;
            const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius;
            const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius;

            pos[i3] = Math.cos(spinAngle + branchAngle) * radius + randomX;
            pos[i3 + 1] = randomY;
            pos[i3 + 2] = Math.sin(spinAngle + branchAngle) * radius + randomZ;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.3} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
    );
}

function ConnectingLines() {
    const linesRef = useRef();
    const points = useMemo(() => {
        const pts = [];
        for (let i = 0; i < 25; i++) {
            pts.push(new THREE.Vector3(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 8
            ));
        }
        return pts;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (linesRef.current) {
            linesRef.current.rotation.y = time * 0.03;
            linesRef.current.rotation.z = time * 0.02;
        }
    });

    return (
        <group ref={linesRef}>
            {points.map((point, i) => {
                const nextPoint = points[(i + 1) % points.length];
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([point, nextPoint]);
                return (
                    <line key={i} geometry={lineGeometry}>
                        <lineBasicMaterial
                            color="#00F5D4"
                            transparent
                            opacity={0.4}
                        />
                    </line>
                );
            })}
        </group>
    );
}

function FloatingCode() {
    const snippets = ["{ }", "< />", "=>", "()", "git", "npm", "sql", "const", "async", "await"];

    return (
        <group>
            {snippets.map((text, i) => (
                <Float key={i} speed={1.5 + Math.random()} rotationIntensity={1} floatIntensity={2}>
                    <Text
                        position={[
                            (Math.random() - 0.5) * 20,
                            (Math.random() - 0.5) * 15,
                            -8 - (Math.random() * 5)
                        ]}
                        fontSize={0.4}
                        color={i % 2 === 0 ? "#00F5D4" : "#7C3AED"}
                        opacity={0.15}
                        transparent
                        depthWrite={false}
                    >
                        {text}
                    </Text>
                </Float>
            ))}
        </group>
    );
}

function HugeBackgroundText() {
    const { mouse } = useThree();
    const textRef = useRef();

    useFrame((state) => {
        if (textRef.current) {
            textRef.current.position.x = THREE.MathUtils.lerp(textRef.current.position.x, mouse.x * -2, 0.05);
            textRef.current.position.y = THREE.MathUtils.lerp(textRef.current.position.y, mouse.y * -1, 0.05);
        }
    });

    return (
        <group ref={textRef}>
            <Text
                position={[0, 0, -20]}
                fontSize={8}
                color="#7C3AED"
                opacity={0.03}
                transparent
                anchorX="center"
                anchorY="middle"
                fontWeight="900"
            >
                CHESHANTH
            </Text>
        </group>
    );
}

// --- Internal Components for R3F Logic ---

const HeroScene = () => {
    const { mouse } = useThree();
    const lightRef = useRef();

    useFrame((state) => {
        if (lightRef.current) {
            lightRef.current.position.x = mouse.x * 10;
            lightRef.current.position.y = mouse.y * 10;
        }
    });

    return (
        <>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={3.5} color="#00F5D4" />
            <pointLight position={[-10, -10, 5]} intensity={2.5} color="#F59E0B" />
            <pointLight ref={lightRef} position={[0, 0, 5]} intensity={5.0} color="#7C3AED" distance={30} />

            {/* Main Core - Centered in right half */}
            <CentralHeroShape depth={-8} />
            
            {/* Accents drifting across the right half */}
            <WanderingShape depth={-12} color="#26222e" geometry="icosahedron" speed={0.2} />
            <WanderingShape depth={-15} color="#00F5D4" geometry="octahedron" speed={0.25} />
            <WanderingShape depth={-10} color="#F59E0B" geometry="dodecahedron" speed={0.15} />

            {/* Clean Environment */}
            <Stars radius={150} depth={50} count={1500} factor={4} saturation={1} fade speed={1} />
        </>
    );
};

function WanderingShape({ depth, color, geometry, speed }) {
    const mesh = useRef();
    const { viewport } = useThree();
    
    // Unique phase for each instance to move independently
    const phase = useMemo(() => ({
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2
    }), []);
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed;
        if (mesh.current) {
            // Drift horizontally across the entire right half (0.5 to edge)
            const xMin = 0.5;
            const xMax = viewport.width / 2 - 2.5;
            const xRange = (xMax - xMin) / 2;
            const xCenter = (xMax + xMin) / 2;
            mesh.current.position.x = xCenter + Math.sin(t + phase.x) * xRange;
            
            // Drift vertically below navbar
            const yTop = viewport.height / 2 - 2.5; 
            const yBottom = -viewport.height / 2 + 1;
            const yRange = (yTop - yBottom) / 2;
            const yCenter = (yTop + yBottom) / 2;
            mesh.current.position.y = yCenter + Math.cos(t * 0.8 + phase.y) * yRange;

            mesh.current.position.z = depth;

            mesh.current.rotation.x = t * 0.5;
            mesh.current.rotation.y = t * 0.3;
        }
    });

    return (
        <group ref={mesh}>
            {geometry === 'icosahedron' && <icosahedronGeometry args={[2.5, 0]} />}
            {geometry === 'octahedron' && <octahedronGeometry args={[1.4, 0]} />}
            {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1.2, 0]} />}
            <meshStandardMaterial color={color} wireframe transparent opacity={0.3} />
        </group>
    );
}

function CentralHeroShape({ depth }) {
    const groupRef = useRef();
    const coreRef = useRef();
    const { viewport } = useThree();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Drift across the right half horizontally
            const xMin = 1.5;
            const xMax = viewport.width / 2 - 3;
            const xRange = (xMax - xMin) / 2;
            const xCenter = (xMax + xMin) / 2;
            groupRef.current.position.x = xCenter + Math.cos(t * 0.15) * xRange;
            
            // Slow vertical drift
            const yTop = viewport.height / 2 - 3;
            const yBottom = -viewport.height / 2 + 1.5;
            const yRange = (yTop - yBottom) / 2;
            const yCenter = (yTop + yBottom) / 2;
            groupRef.current.position.y = yCenter + Math.sin(t * 0.1) * yRange;
            
            groupRef.current.position.z = depth + Math.sin(t * 0.05) * 2;
        }

        if (coreRef.current) {
            coreRef.current.rotation.x = -t * 0.1;
            coreRef.current.rotation.y = -t * 0.05;
            coreRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Inner secondary core - Made even bigger */}
            <mesh ref={coreRef} scale={3.0}>
                <icosahedronGeometry args={[2.5, 1]} />
                <meshStandardMaterial
                    color="#00F5D4"
                    emissive="#00F5D4"
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.6}
                    wireframe
                />
            </mesh>
        </group>
    );
}

function Particles({ count = 800, size = 0.06, opacity = 0.4 }) {
    const mesh = useRef();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const tealColor = new THREE.Color('#00F5D4');
        const violetColor = new THREE.Color('#7C3AED');
        const amberColor = new THREE.Color('#F59E0B');
        const colorPalette = [tealColor, violetColor, amberColor];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 40;
            positions[i3 + 1] = (Math.random() - 0.5) * 30;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        return { positions, colors };
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (mesh.current) {
            mesh.current.rotation.y = time * 0.03;
            mesh.current.rotation.x = time * 0.01;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                vertexColors
                transparent
                opacity={opacity}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

const SkillsScene = () => {
    const meshRef = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            const pos = meshRef.current.geometry.attributes.position.array;
            for (let i = 0; i < pos.length; i += 3) {
                const x = pos[i];
                const y = pos[i + 1];
                pos[i + 2] = Math.sin(x * 0.5 + t) * Math.cos(y * 0.5 + t) * 0.5;
            }
            meshRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <group rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
                <mesh ref={meshRef}>
                    <planeGeometry args={[40, 40, 30, 30]} />
                    <meshStandardMaterial color="#00f5d4" wireframe transparent opacity={0.2} />
                </mesh>
            </group>

            <CentralCore />
            <OrbitRing radius={4} />

            {techLabels.map((label, index) => (
                <OrbitingLabel
                    key={label.name}
                    name={label.name}
                    color={label.color}
                    index={index}
                    total={techLabels.length}
                />
            ))}
        </>
    );
};

const techLabels = [
    { name: 'React', color: '#00F5D4' },
    { name: 'JS', color: '#F59E0B' },
    { name: 'Python', color: '#7C3AED' },
    { name: 'Node', color: '#00F5D4' },
    { name: 'Java', color: '#F59E0B' },
    { name: 'CSS', color: '#7C3AED' },
    { name: 'MySQL', color: '#00F5D4' },
    { name: 'Figma', color: '#F59E0B' },
    { name: 'Git', color: '#7C3AED' },
];

function OrbitingLabel({ name, color, index, total, radius = 4 }) {
    const meshRef = useRef();
    const angle = (index / total) * Math.PI * 2;

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const currentAngle = angle + time * 0.2;
        if (meshRef.current) {
            meshRef.current.position.x = Math.cos(currentAngle) * radius;
            meshRef.current.position.z = Math.sin(currentAngle) * radius;
            meshRef.current.position.y = Math.sin(time * 0.5 + index) * 0.5;
            meshRef.current.lookAt(0, 0, 0);
            meshRef.current.rotateY(Math.PI);
        }
    });

    return (
        <group ref={meshRef}>
            <Float speed={2} floatIntensity={0.5}>
                <Text
                    fontSize={0.3}
                    color={color}
                    anchorX="center"
                    anchorY="middle"
                >
                    {name}
                </Text>
            </Float>
        </group>
    );
}

function CentralCore() {
    const coreRef = useRef();
    const ringRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (coreRef.current) {
            coreRef.current.rotation.x = time * 0.5;
            coreRef.current.rotation.y = time * 0.3;
            coreRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = time * 0.4;
            ringRef.current.rotation.x = Math.PI / 4;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            <mesh ref={coreRef}>
                <icosahedronGeometry args={[0.8, 1]} />
                <meshStandardMaterial
                    color="#00F5D4"
                    transparent
                    opacity={0.2}
                    wireframe
                />
            </mesh>
            <mesh ref={ringRef}>
                <torusGeometry args={[1.5, 0.02, 8, 64]} />
                <meshStandardMaterial
                    color="#7C3AED"
                    transparent
                    opacity={0.3}
                    emissive="#7C3AED"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </group>
    );
}

function OrbitRing({ radius = 4 }) {
    return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.005, 8, 128]} />
            <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.1}
            />
        </mesh>
    );
}

function DigitalGlobe({ position = [0, 0, 0], scale = 6 }) {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group position={position}>
            <mesh ref={meshRef} scale={scale}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#7c3aed" wireframe transparent opacity={0.1} />
            </mesh>
            <mesh scale={scale * 1.05}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#00f5d4" transparent opacity={0.03} />
            </mesh>
        </group>
    );
}

const ContactScene = ({ positions, count }) => {
    const pointsRef = useRef();
    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <Points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <PointMaterial transparent color="#7c3aed" size={0.15} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </Points>
    );
};

// --- Exported Components ---

// 1. Hero Background: Rich 3D Geometric Objects & Shapes
export const HeroBackground = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <HeroScene />
            </Canvas>
        </div>
    );
};

function NeuralNetwork({ count = 12 }) {
    const nodes = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, -5],
            connections: Array.from({ length: 3 }).map(() => Math.floor(Math.random() * count))
        }));
    }, [count]);

    const linesRef = useRef();
    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={linesRef}>
            {nodes.map((node, i) => (
                <group key={i}>
                    <mesh position={node.position}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial color="#00f5d4" emissive="#00f5d4" />
                    </mesh>
                    {node.connections.map((targetIdx, j) => {
                        const target = nodes[targetIdx];
                        const points = [new THREE.Vector3(...node.position), new THREE.Vector3(...target.position)];
                        const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
                        return (
                            <line key={j} geometry={lineGeom}>
                                <lineBasicMaterial color="#7c3aed" transparent opacity={0.2} />
                            </line>
                        );
                    })}
                </group>
            ))}
        </group>
    );
}

// Education Background: Neural Network
export const EducationBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 opacity-100">
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#7c3aed" />
                <NeuralNetwork count={20} />
                <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

function PulsingMilestones({ count = 8 }) {
    const milestones = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, -5],
            scale: Math.random() * 0.5 + 0.5,
            color: ["#00f5d4", "#7c3aed", "#f59e0b"][Math.floor(Math.random() * 3)]
        }));
    }, [count]);

    return (
        <group>
            {milestones.map((m, i) => (
                <Float key={i} speed={4} rotationIntensity={2} floatIntensity={1}>
                    <mesh position={m.position} scale={m.scale}>
                        <octahedronGeometry args={[1, 0]} />
                        <MeshWobbleMaterial color={m.color} speed={2} factor={0.5} transparent opacity={0.2} />
                    </mesh>
                    <pointLight position={m.position} color={m.color} intensity={0.5} distance={10} />
                </Float>
            ))}
        </group>
    );
}

// Achievements Background: Pulsing Milestones
export const AchievementsBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 opacity-100">
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={0.5} />
                <PulsingMilestones count={10} />
                <Stars radius={100} depth={50} count={800} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

// 2. About Background: Floating Cubes
export const AboutBackground = () => {
    const count = 12;
    const cubes = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, -5],
            scale: Math.random() * 0.4 + 0.1,
            speed: Math.random() * 0.5 + 0.2
        }));
    }, []);

    return (
        <div className="absolute inset-0 -z-10 opacity-100">
            <Canvas camera={{ position: [0, 0, 8] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[-10, 10, 5]} intensity={1} color="#7c3aed" />
                {cubes.map((c, i) => (
                    <Float key={i} speed={c.speed * 5} rotationIntensity={2} floatIntensity={2}>
                        <Box position={c.position} scale={c.scale}>
                            <meshStandardMaterial color={i % 2 === 0 ? "#7c3aed" : "#00f5d4"} wireframe transparent opacity={0.4} />
                        </Box>
                    </Float>
                ))}
            </Canvas>
        </div>
    );
};

// 3. Skills Background: Energy Waves
export const SkillsBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 opacity-100">
            <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
                <SkillsScene />
            </Canvas>
        </div>
    );
};

// 4. Projects Background: Digital Grid
export const ProjectsBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 opacity-100">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f5d4" />
                <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
                <gridHelper args={[50, 50, "#00f5d4", "#12052c"]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -5]} opacity={0.8} transparent />
            </Canvas>
        </div>
    );
};

// 5. Contact Background: Connection Beams
export const ContactBackground = () => {
    const count = 300;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 25;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    return (
        <div className="absolute inset-0 -z-10 opacity-100">
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={0.5} />
                <DigitalGlobe position={[0, -2, -5]} scale={8} />
                <ContactScene positions={positions} count={count} />
            </Canvas>
        </div>
    );
};
