
import { useRef, useState, useEffect, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DetectiveCharacterProps {
  position?: [number, number, number];
  onInteraction: (type: string, data?: unknown) => void;
  scale?: number;
  autoRotate?: boolean;
}

export const DetectiveCharacter = forwardRef<THREE.Group, DetectiveCharacterProps>(
  ({ 
    position = [0, 0, 0], 
    onInteraction, 
    scale = 1, 
    autoRotate = false 
  }, ref) => {
  
  const groupRef = useRef<THREE.Group>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [rotationY, setRotationY] = useState(0);

  // Auto rotation or walking animation
  useFrame((state) => {
    const currentRef = ref && 'current' in ref ? ref.current : groupRef.current;
    
    if (currentRef) {
      if (autoRotate) {
        currentRef.rotation.y += 0.01;
      } else if (isWalking) {
        // Simple walking animation - bob up and down
        currentRef.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.05;
      }
    }
  });

  // Simple patrol behavior when not auto-rotating
  useEffect(() => {
    if (autoRotate) return;
    
    const interval = setInterval(() => {
      setIsWalking(true);
      const newRotation = Math.random() * Math.PI * 2;
      setRotationY(newRotation);
      
      setTimeout(() => {
        setIsWalking(false);
      }, 2000); // Walk for 2 seconds
    }, 8000); // Every 8 seconds

    return () => clearInterval(interval);
  }, [autoRotate]);

  return (
    <group 
      ref={ref || groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
      scale={[scale, scale, scale]}
      onClick={() => onInteraction('detective')}
      onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
    >
      {/* Detective Body - Long Coat */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.7, 1.4, 0.35]} />
        <meshStandardMaterial color="#2c1810" roughness={0.8} />
      </mesh>
      
      {/* Coat Lapels */}
      <mesh position={[-0.25, 1.4, 0.18]}>
        <boxGeometry args={[0.15, 0.4, 0.02]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.9} />
      </mesh>
      <mesh position={[0.25, 1.4, 0.18]}>
        <boxGeometry args={[0.15, 0.4, 0.02]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.9} />
      </mesh>
      
      {/* Detective Head */}
      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[0.22]} />
        <meshStandardMaterial color="#d4a574" roughness={0.7} />
      </mesh>
      
      {/* Detective Fedora Hat */}
      <mesh position={[0, 2.25, 0]}>
        <cylinderGeometry args={[0.28, 0.25, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Hat Brim */}
      <mesh position={[0, 2.15, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Hat Band */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.05]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
      
      {/* Arms in Coat */}
      <mesh position={[-0.45, 1.2, 0]}>
        <boxGeometry args={[0.18, 0.9, 0.18]} />
        <meshStandardMaterial color="#2c1810" roughness={0.8} />
      </mesh>
      <mesh position={[0.45, 1.2, 0]}>
        <boxGeometry args={[0.18, 0.9, 0.18]} />
        <meshStandardMaterial color="#2c1810" roughness={0.8} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.45, 0.7, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#d4a574" roughness={0.7} />
      </mesh>
      <mesh position={[0.45, 0.7, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#d4a574" roughness={0.7} />
      </mesh>
      
      {/* Legs - Dark Trousers */}
      <mesh position={[-0.18, 0.3, 0]}>
        <boxGeometry args={[0.16, 0.9, 0.16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0.18, 0.3, 0]}>
        <boxGeometry args={[0.16, 0.9, 0.16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      
      {/* Detective Shoes - Dress Shoes */}
      <mesh position={[-0.18, -0.1, 0.12]}>
        <boxGeometry args={[0.2, 0.12, 0.35]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0.18, -0.1, 0.12]}>
        <boxGeometry args={[0.2, 0.12, 0.35]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Detective Badge */}
      <mesh position={[0, 1.4, 0.18]}>
        <cylinderGeometry args={[0.06, 0.06, 0.01]} />
        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Magnifying Glass in Hand */}
      <group position={[0.45, 0.8, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.1, 0.02]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.3} 
            metalness={0.1} 
            roughness={0.1} 
          />
        </mesh>
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.18]} />
          <meshStandardMaterial color="#654321" roughness={0.8} />
        </mesh>
      </group>
      
      {/* Coat Buttons */}
      <mesh position={[0, 1.5, 0.18]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.2, 0.18]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.9, 0.18]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      
      {/* Collar */}
      <mesh position={[0, 1.7, 0.1]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.6} />
      </mesh>
      
      {/* Tie */}
      <mesh position={[0, 1.5, 0.16]}>
        <boxGeometry args={[0.08, 0.3, 0.02]} />
        <meshStandardMaterial color="#8B0000" roughness={0.7} />
      </mesh>
      
      {/* Mustache */}
      <mesh position={[0, 1.85, 0.21]}>
        <boxGeometry args={[0.12, 0.02, 0.02]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>
      
      {/* Subtle lighting for the character */}
      <pointLight position={[0, 2.5, 1]} intensity={0.3} color="#ffd700" />
    </group>
  );
});

DetectiveCharacter.displayName = 'DetectiveCharacter';
