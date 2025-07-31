import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AboutMeSectionProps {
  position: [number, number, number];
  isActive: boolean;
  onClick: () => void;
  onInteraction: (type: string, data?: unknown) => void;
}

export const AboutMeSection = ({ position, isActive, onClick, onInteraction }: AboutMeSectionProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Group>(null);
  const [hovering, setHovering] = useState(false);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.02);
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(1);
    }

    if (cardRef.current && hovering) {
      cardRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.02;
    } else if (cardRef.current) {
      cardRef.current.rotation.z = 0;
    }
  });

  const handleContactClick = (contactType: string, event: any) => {
    event.stopPropagation();
    onInteraction('contact-clicked', contactType);
    
    switch (contactType) {
      case 'email':
        window.location.href = 'mailto:mahdi.ghaleb@email.com';
        break;
      case 'linkedin':
        window.open('https://linkedin.com/in/mahdighaleb', '_blank');
        break;
      case 'github':
        window.open('https://github.com/mahdighaleb', '_blank');
        break;
    }
  };

  const handlePointerOver = () => {
    setHovering(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovering(false);
    document.body.style.cursor = 'zoom-in';
  };

  return (
    <group 
      ref={groupRef} 
      position={position} 
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Section Background */}
      <mesh>
        <planeGeometry args={[4, 5]} />
        <meshStandardMaterial 
          color={isActive ? "#F5F5DC" : "#E5E5D0"} 
          emissive={isActive ? "#b8860b" : "#000000"}
          emissiveIntensity={isActive ? 0.1 : 0}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Detective Profile Card */}
      <group ref={cardRef} position={[0, 1, 0.02]}>
        {/* Photo Frame */}
        <mesh>
          <planeGeometry args={[1.8, 2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        
        {/* Photo */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.6, 1.8]} />
          <meshStandardMaterial 
            color="#8B7355" 
            emissive={hovering ? "#b8860b" : "#000000"}
            emissiveIntensity={hovering ? 0.2 : 0}
          />
        </mesh>
        
        {/* Detective silhouette placeholder */}
        <mesh position={[0, 0.2, 0.02]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Detective hat */}
        <mesh position={[0, 0.4, 0.02]}>
          <cylinderGeometry args={[0.35, 0.3, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Photo corner clips */}
        {[[-0.7, 0.8], [0.7, 0.8], [-0.7, -0.8], [0.7, -0.8]].map((pos, i) => (
          <mesh key={`clip-${i}`} position={[pos[0], pos[1], 0.03]}>
            <boxGeometry args={[0.1, 0.1, 0.02]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Name Plate */}
      <group position={[0, -0.5, 0.02]}>
        <mesh>
          <planeGeometry args={[3, 0.5]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            emissive="#b8860b"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.8, 0.4]} />
          <meshStandardMaterial color="#b8860b" />
        </mesh>
      </group>

      {/* Title Badge */}
      <group position={[0, -1.2, 0.02]}>
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 0.05]} />
          <meshStandardMaterial 
            color="#FFD700" 
            metalness={0.8}
            emissive="#FFD700"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Badge star */}
        <mesh position={[0, 0, 0.03]}>
          <cylinderGeometry args={[0.4, 0.4, 0.01]} />
          <meshStandardMaterial color="#B8860B" />
        </mesh>
        {/* Badge text area */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[0.6, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      {/* Experience Info */}
      <group position={[0, -1.9, 0.02]}>
        <mesh>
          <planeGeometry args={[3.5, 0.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[3.3, 0.3]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
      </group>

      {/* Contact Information Cards */}
      <group position={[1.5, -0.5, 0.03]}>
        {/* Email Card */}
        <group 
          position={[0, 0.5, 0]}
          onClick={(e) => handleContactClick('email', e)}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'zoom-in'; }}
        >
          <mesh>
            <planeGeometry args={[0.8, 0.3]} />
            <meshStandardMaterial 
              color={hovering ? "#4CAF50" : "#2196F3"} 
              emissive={hovering ? "#4CAF50" : "#000000"}
              emissiveIntensity={hovering ? 0.3 : 0}
            />
          </mesh>
          {/* @ symbol */}
          <mesh position={[0, 0, 0.01]}>
            <torusGeometry args={[0.08, 0.02]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* LinkedIn Card */}
        <group 
          position={[0, 0, 0]}
          onClick={(e) => handleContactClick('linkedin', e)}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'zoom-in'; }}
        >
          <mesh>
            <planeGeometry args={[0.8, 0.3]} />
            <meshStandardMaterial 
              color={hovering ? "#0077B5" : "#005885"} 
              emissive={hovering ? "#0077B5" : "#000000"}
              emissiveIntensity={hovering ? 0.3 : 0}
            />
          </mesh>
          {/* LinkedIn logo placeholder */}
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.15, 0.15, 0.01]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* GitHub Card */}
        <group 
          position={[0, -0.5, 0]}
          onClick={(e) => handleContactClick('github', e)}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'zoom-in'; }}
        >
          <mesh>
            <planeGeometry args={[0.8, 0.3]} />
            <meshStandardMaterial 
              color={hovering ? "#333333" : "#1a1a1a"} 
              emissive={hovering ? "#333333" : "#000000"}
              emissiveIntensity={hovering ? 0.3 : 0}
            />
          </mesh>
          {/* GitHub logo placeholder */}
          <mesh position={[0, 0, 0.01]}>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      </group>

      {/* Location Pin */}
      <group position={[-1.5, -1.9, 0.03]}>
        <mesh>
          <coneGeometry args={[0.1, 0.2]} />
          <meshStandardMaterial color="#DC143C" />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial color="#DC143C" />
        </mesh>
        {/* Location text */}
        <mesh position={[0.3, 0, 0]}>
          <planeGeometry args={[0.8, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      {/* Availability Status */}
      <group position={[0, -2.3, 0.03]}>
        <mesh>
          <planeGeometry args={[2, 0.3]} />
          <meshStandardMaterial 
            color="#4CAF50" 
            emissive="#4CAF50"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.8, 0.2]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        {/* Status indicator light */}
        <mesh position={[-0.7, 0, 0.02]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial 
            color="#4CAF50" 
            emissive="#4CAF50"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Detective Props */}
      {/* Magnifying glass */}
      <group position={[-1.5, 0.5, 0.03]} rotation={[0, 0, Math.PI / 4]}>
        <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.3]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh>
          <torusGeometry args={[0.08, 0.005]} />
          <meshStandardMaterial color="#8b7355" metalness={0.7} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.07, 0.07, 0.002]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.3} 
          />
        </mesh>
      </group>

      {/* Case Files */}
      <group position={[1.5, 1.5, 0.02]}>
        {[...Array(3)].map((_, i) => (
          <mesh key={`file-${i}`} position={[0, i * 0.01, i * 0.005]} rotation={[0, Math.random() * 0.1, 0]}>
            <boxGeometry args={[0.3, 0.01, 0.4]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#8b7355" : "#654321"} />
          </mesh>
        ))}
      </group>

      {/* Section border when active */}
      {isActive && (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[4.2, 5.2]} />
          <meshStandardMaterial 
            color="#b8860b" 
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Push pin */}
      <mesh position={[-1.8, 2.3, 0.05]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>
    </group>
  );
};