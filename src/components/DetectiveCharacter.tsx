
import { useRef, useState, useEffect, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface DetectiveCharacterProps {
  position: [number, number, number];
  onInteraction: (type: string, data?: any) => void;
}

export const DetectiveCharacter = forwardRef<THREE.Group, DetectiveCharacterProps>(
  ({ position, onInteraction }, ref) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  
  // For now, we'll create a placeholder low-poly detective character
  // This will be replaced with the actual GLTF model once downloaded
  const DetectivePlaceholder = () => {
    
    useFrame((state) => {
      if (ref && 'current' in ref && ref.current && isWalking) {
        // Simple walking animation - bob up and down
        ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.05;
      }
    });

    return (
      <group 
        ref={ref}
        position={position}
        rotation={[0, rotationY, 0]}
        onClick={() => onInteraction('detective')}
        onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
      >
        {/* Detective Body - Coat */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[0.6, 1.2, 0.3]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
        </mesh>
        
        {/* Detective Head */}
        <mesh position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial color="#d4a574" roughness={0.7} />
        </mesh>
        
        {/* Detective Hat */}
        <mesh position={[0, 2.1, 0]}>
          <cylinderGeometry args={[0.25, 0.2, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        
        {/* Hat Brim */}
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        
        {/* Arms */}
        <mesh position={[-0.4, 1.2, 0]}>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
        </mesh>
        <mesh position={[0.4, 1.2, 0]}>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
        </mesh>
        
        {/* Legs */}
        <mesh position={[-0.15, 0.4, 0]}>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        <mesh position={[0.15, 0.4, 0]}>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        
        {/* Shoes */}
        <mesh position={[-0.15, 0.05, 0.1]}>
          <boxGeometry args={[0.18, 0.1, 0.3]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>
        <mesh position={[0.15, 0.05, 0.1]}>
          <boxGeometry args={[0.18, 0.1, 0.3]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>
        
        {/* Detective Badge */}
        <mesh position={[0, 1.3, 0.16]}>
          <boxGeometry args={[0.08, 0.08, 0.01]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Magnifying Glass in hand */}
        <group position={[0.4, 1.4, 0.2]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.02]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.3} 
              metalness={0.1} 
              roughness={0.1} 
            />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.15]} />
            <meshStandardMaterial color="#654321" roughness={0.8} />
          </mesh>
        </group>
      </group>
    );
  };

  // Simple patrol behavior
  useEffect(() => {
    const interval = setInterval(() => {
      setIsWalking(true);
      const newRotation = Math.random() * Math.PI * 2;
      setRotationY(newRotation);
      
      setTimeout(() => {
        setIsWalking(false);
      }, 2000); // Walk for 2 seconds
    }, 8000); // Every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return <DetectivePlaceholder />;
});

// Hook for model loading (ready for GLTF integration)
export const useDetectiveModel = (modelPath: string) => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This will be implemented when we have the actual GLTF model
    // For now, we use the placeholder
    setLoading(false);
  }, [modelPath]);

  return { model, loading, error };
};
