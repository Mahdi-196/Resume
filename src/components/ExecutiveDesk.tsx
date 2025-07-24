import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Smoke Effect Component
const SmokeEffect = ({ position }: { position: [number, number, number] }) => {
  const smokeRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (smokeRef.current) {
      smokeRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={smokeRef} position={position}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.2, 0]}>
          <sphereGeometry args={[0.05 + i * 0.02]} />
          <meshStandardMaterial 
            color="#666666" 
            transparent 
            opacity={0.3 - i * 0.05}
          />
        </mesh>
      ))}
    </group>
  );
};

// Executive Desk Component
export const ExecutiveDesk = ({ onInteraction }: { onInteraction: (type: string) => void }) => {
  return (
    <group position={[0, 0, -1]} rotation={[0, Math.PI, 0]}>
      {/* Desk Surface */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#3d2817" roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Desk Legs */}
      <mesh position={[-1.8, 0.5, -0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      <mesh position={[1.8, 0.5, -0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      <mesh position={[-1.8, 0.5, 0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      <mesh position={[1.8, 0.5, 0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>

      {/* Typewriter */}
      <group 
        position={[1, 1.15, 0]}
        onClick={() => onInteraction('typewriter')}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <mesh>
          <boxGeometry args={[0.8, 0.2, 0.6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>

      {/* Cigar in Ashtray with continuous smoke */}
      <group position={[0.5, 1.1, 0.3]}>
        {/* Ashtray */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.1, 0.03]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Cigar */}
        <mesh position={[0, 0.02, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15]} />
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </mesh>
        {/* Continuous Smoke Effect */}
        <SmokeEffect position={[0, 0.05, 0]} />
      </group>
    </group>
  );
};