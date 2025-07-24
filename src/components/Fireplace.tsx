import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Fireplace Component with animated fire
export const Fireplace = () => {
  const fireRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (fireRef.current) {
      fireRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.scale.y = 1 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.1;
          child.scale.x = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.05;
        }
      });
    }
  });

  return (
    <group position={[-8, 0, 0]}>
      {/* Fireplace Frame */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.3, 4, 2]} />
        <meshStandardMaterial color="#2a1810" roughness={0.7} />
      </mesh>
      
      {/* Mantelpiece */}
      <mesh position={[0.1, 3.8, 0]}>
        <boxGeometry args={[0.4, 0.2, 2.5]} />
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </mesh>
      
      {/* Fire Opening */}
      <mesh position={[0.05, 1.5, 0]}>
        <boxGeometry args={[0.1, 2, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Fire Logs */}
      <mesh position={[0.1, 0.6, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.08, 0.08, 1]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>
      <mesh position={[0.1, 0.7, 0.3]} rotation={[0, 0.5, 0.3]}>
        <cylinderGeometry args={[0.06, 0.06, 0.8]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </mesh>
      
      {/* Fire Effect */}
      <group ref={fireRef} position={[0.12, 1.2, 0]}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.1, (Math.random() - 0.5) * 0.3]}>
            <coneGeometry args={[0.05 + i * 0.01, 0.2 + i * 0.05]} />
            <meshStandardMaterial 
              color={i < 2 ? "#ff4500" : i < 4 ? "#ffa500" : "#ffff00"}
              emissive={i < 2 ? "#ff4500" : i < 4 ? "#ffa500" : "#ffff00"}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>
      
      {/* Mantel Decorations */}
      {/* Ornate Clock */}
      <mesh position={[0.2, 4, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1]} />
        <meshStandardMaterial color="#8b7355" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.25, 4.05, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.02]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.1} />
      </mesh>
      
      {/* Candlesticks */}
      <mesh position={[0.2, 4, 0.8]}>
        <cylinderGeometry args={[0.03, 0.05, 0.3]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.2, 4, -0.8]}>
        <cylinderGeometry args={[0.03, 0.05, 0.3]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Candles */}
      <mesh position={[0.2, 4.2, 0.8]}>
        <cylinderGeometry args={[0.015, 0.015, 0.1]} />
        <meshStandardMaterial color="#fff8dc" roughness={0.9} />
      </mesh>
      <mesh position={[0.2, 4.2, -0.8]}>
        <cylinderGeometry args={[0.015, 0.015, 0.1]} />
        <meshStandardMaterial color="#fff8dc" roughness={0.9} />
      </mesh>

      {/* Decorative vases */}
      <mesh position={[0.25, 4, 0.5]}>
        <cylinderGeometry args={[0.06, 0.04, 0.15]} />
        <meshStandardMaterial color="#8b4513" roughness={0.6} />
      </mesh>
      <mesh position={[0.25, 4, -0.5]}>
        <cylinderGeometry args={[0.06, 0.04, 0.15]} />
        <meshStandardMaterial color="#8b4513" roughness={0.6} />
      </mesh>
    </group>
  );
};