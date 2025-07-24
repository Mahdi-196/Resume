import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Detective Investigation Board - Sherlock Holmes Style
export const DetectiveInvestigationBoard = ({ onInteraction }: { 
  onInteraction: (type: string, data: string) => void;
}) => {
  const stringRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (stringRef.current) {
      // Subtle string animation
      stringRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002;
        }
      });
    }
  });

  return (
    <group position={[0, 4, 9.9]} rotation={[0, Math.PI, 0]}>
      {/* Main Cork Board Background */}
      <mesh>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial 
          color="#8B4513" 
          roughness={0.9}
        />
      </mesh>
      
      {/* Frame */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[12.2, 6.2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[11.8, 5.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* About Me Section - Top */}
      <group 
        position={[0, 2, 0.05]}
        onClick={() => onInteraction('board', 'about')}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        {/* Background Rectangle */}
        <mesh>
          <planeGeometry args={[10, 1.5]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        
        {/* About Me Title - Left Side */}
        <mesh position={[-3.5, 0.3, 0.01]}>
          <planeGeometry args={[2.5, 0.3]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Lorem Text Lines - Right Side */}
        {[0.3, 0, -0.3].map((y, i) => (
          <mesh key={`about-text-${i}`} position={[2, y, 0.01]}>
            <planeGeometry args={[4, 0.1]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        ))}
      </group>
    </group>
  );
};