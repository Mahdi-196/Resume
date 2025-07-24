import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Enhanced Window with Dynamic Cityscape and Animated Rain - Centered on back wall
export const OfficeWindow = () => {
  const rainRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (rainRef.current) {
      // Animate rain falling
      rainRef.current.children.forEach((child, i) => {
        const rainDrop = child as THREE.Mesh;
        rainDrop.position.y -= 0.15;
        if (rainDrop.position.y < -3) {
          rainDrop.position.y = 3;
          rainDrop.position.x = (Math.random() - 0.5) * 14;
        }
      });
    }
  });

  return (
    <group position={[0, 3.5, -9.9]}> {/* Centered on back wall, flush with wall like whiteboard */}
      {/* Large Window Frame - 80% of wall width, shorter height */}
      <mesh position={[-7.8, 0, 0]}>
        <boxGeometry args={[0.3, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[7.8, 0, 0]}>
        <boxGeometry args={[0.3, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[15.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[0, -3.2, 0]}>
        <boxGeometry args={[15.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      
      {/* Window Mullions - Classic Office Style */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.15, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[-3.9, 0, 0]}>
        <boxGeometry args={[0.15, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[3.9, 0, 0]}>
        <boxGeometry args={[0.15, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[15.6, 0.15, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[15.6, 0.15, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      
      {/* Window Glass Panes - 6 panes across 2 rows */}
      {[-5.85, -1.95, 1.95, 5.85].map((x, i) => (
        <>
          <mesh key={`top-${i}`} position={[x, 2.4, 0.05]}>
            <planeGeometry args={[3.6, 1.4]} />
            <meshStandardMaterial 
              color="#1a1a2e"
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh key={`bottom-${i}`} position={[x, 0.8, 0.05]}>
            <planeGeometry args={[3.6, 1.4]} />
            <meshStandardMaterial 
              color="#1a1a2e"
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh key={`lower-${i}`} position={[x, -0.8, 0.05]}>
            <planeGeometry args={[3.6, 1.4]} />
            <meshStandardMaterial 
              color="#1a1a2e"
              transparent
              opacity={0.6}
            />
          </mesh>
        </>
      ))}
      
      {/* Simple Night Sky */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[30, 15]} />
        <meshStandardMaterial 
          color="#0a0a1a"
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Animated Rain Streaks - More prominent */}
      <group ref={rainRef}>
        {[...Array(80)].map((_, i) => (
          <mesh 
            key={i}
            position={[
              (Math.random() - 0.5) * 14,
              Math.random() * 6 - 3,
              0.2
            ]}
            rotation={[0, 0, -0.2]}
          >
            <planeGeometry args={[0.02, 0.4]} />
            <meshStandardMaterial 
              color="#87ceeb" 
              transparent 
              opacity={0.6}
              emissive="#87ceeb"
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
      
      {/* Window Sill */}
      <mesh position={[0, -3.5, -0.1]}>
        <boxGeometry args={[16, 0.3, 0.6]} />
        <meshStandardMaterial color="#4a3728" roughness={0.6} />
      </mesh>
    </group>
  );
};