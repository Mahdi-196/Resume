import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SkillsSectionProps {
  position: [number, number, number];
  isActive: boolean;
  onClick: () => void;
  onInteraction: (type: string, data?: unknown) => void;
}

interface Skill {
  name: string;
  level: number; // 1-5
  category: 'frontend' | 'backend' | 'cloud' | 'devops';
}

const skills: Skill[] = [
  { name: 'React/TypeScript', level: 5, category: 'frontend' },
  { name: 'Next.js', level: 5, category: 'frontend' },
  { name: 'Three.js', level: 4, category: 'frontend' },
  { name: 'Node.js', level: 5, category: 'backend' },
  { name: 'Python', level: 4, category: 'backend' },
  { name: 'PostgreSQL', level: 4, category: 'backend' },
  { name: 'AWS Lambda', level: 5, category: 'cloud' },
  { name: 'AWS ECS', level: 4, category: 'cloud' },
  { name: 'CloudFormation', level: 4, category: 'cloud' },
  { name: 'Docker', level: 5, category: 'devops' },
  { name: 'Kubernetes', level: 4, category: 'devops' },
  { name: 'CI/CD', level: 5, category: 'devops' },
];

export const SkillsSection = ({ position, isActive, onClick, onInteraction }: SkillsSectionProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.02);
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(1);
    }
  });

  const handleSkillClick = (skillName: string, event: any) => {
    event.stopPropagation();
    onInteraction('skill-clicked', skillName);
  };

  const getSkillColor = (level: number): string => {
    switch (level) {
      case 1: return "#8B4513"; // Novice Detective
      case 2: return "#CD853F"; // Junior Detective  
      case 3: return "#DAA520"; // Detective
      case 4: return "#B8860B"; // Senior Detective
      case 5: return "#FFD700"; // Master Detective
      default: return "#8B4513";
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'frontend': return "#2196F3";
      case 'backend': return "#4CAF50";
      case 'cloud': return "#FF9800";
      case 'devops': return "#9C27B0";
      default: return "#654321";
    }
  };

  const renderSkillIndicator = (skill: Skill, position: [number, number, number], index: number) => {
    const isHovered = hoveredSkill === skill.name;
    
    return (
      <group key={skill.name} position={position}>
        {/* Evidence File Background */}
        <mesh
          onClick={(e) => handleSkillClick(skill.name, e)}
          onPointerOver={() => {
            setHoveredSkill(skill.name);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredSkill(null);
            document.body.style.cursor = 'zoom-in';
          }}
        >
          <planeGeometry args={[1.8, 0.4]} />
          <meshStandardMaterial 
            color={isHovered ? "#F5F5DC" : "#E5E5D0"} 
            emissive={isHovered ? getCategoryColor(skill.category) : "#000000"}
            emissiveIntensity={isHovered ? 0.1 : 0}
          />
        </mesh>

        {/* Skill Name Label */}
        <mesh position={[-0.6, 0, 0.01]}>
          <planeGeometry args={[1, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Evidence Case Files (Progress Indicator) */}
        <group position={[0.5, 0, 0.01]}>
          {[...Array(5)].map((_, i) => {
            const isActive = i < skill.level;
            const yOffset = i * 0.008;
            const zOffset = i * 0.003;
            
            return (
              <group key={`case-file-${i}`} position={[i * 0.15, yOffset, zOffset]}>
                {/* Case File Folder */}
                <mesh>
                  <boxGeometry args={[0.12, 0.008, 0.1]} />
                  <meshStandardMaterial 
                    color={isActive ? getSkillColor(skill.level) : "#8B7355"} 
                    emissive={isActive && isHovered ? getSkillColor(skill.level) : "#000000"}
                    emissiveIntensity={isActive && isHovered ? 0.3 : 0}
                  />
                </mesh>
                
                {/* File Tab */}
                <mesh position={[0.05, 0.006, -0.03]}>
                  <boxGeometry args={[0.03, 0.005, 0.03]} />
                  <meshStandardMaterial 
                    color={isActive ? "#FFD700" : "#A0A0A0"} 
                  />
                </mesh>
                
                {/* Evidence Badge (for active files) */}
                {isActive && (
                  <mesh position={[0, 0.01, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.003]} />
                    <meshStandardMaterial 
                      color="#DC143C" 
                      emissive="#DC143C"
                      emissiveIntensity={0.2}
                    />
                  </mesh>
                )}
              </group>
            );
          })}
        </group>

        {/* Category Badge */}
        <mesh position={[0.8, 0.15, 0.02]}>
          <cylinderGeometry args={[0.06, 0.06, 0.01]} />
          <meshStandardMaterial 
            color={getCategoryColor(skill.category)} 
            emissive={getCategoryColor(skill.category)}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Skill Level Stars */}
        <group position={[0.8, -0.15, 0.02]}>
          {[...Array(skill.level)].map((_, i) => (
            <mesh key={`star-${i}`} position={[i * 0.08 - 0.16, 0, 0]}>
              <sphereGeometry args={[0.02]} />
              <meshStandardMaterial 
                color="#FFD700" 
                emissive="#FFD700"
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </group>

        {/* Connection String */}
        <mesh position={[-0.9, 0, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.001, 0.001, 0.3]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>
    );
  };

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Section Background */}
      <mesh>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial 
          color={isActive ? "#F5F5DC" : "#E5E5D0"} 
          emissive={isActive ? "#b8860b" : "#000000"}
          emissiveIntensity={isActive ? 0.1 : 0}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Section Title */}
      <mesh position={[0, 1.7, 0.01]}>
        <planeGeometry args={[2.5, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Evidence Collection Title */}
      <mesh position={[0, 1.4, 0.01]}>
        <planeGeometry args={[3, 0.2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Skills Display */}
      <group position={[0, 0.2, 0.02]}>
        {skills.map((skill, index) => {
          const row = Math.floor(index / 2);
          const col = index % 2;
          const xPos = col * 2 - 1;
          const yPos = 1 - row * 0.5;
          
          return renderSkillIndicator(skill, [xPos, yPos, 0], index);
        })}
      </group>

      {/* Legend */}
      <group position={[0, -1.5, 0.02]}>
        <mesh>
          <planeGeometry args={[3.5, 0.6]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[3.3, 0.5]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        
        {/* Detective Ranks Legend */}
        <group position={[0, 0.1, 0.02]}>
          {[
            { level: 1, title: "Novice" },
            { level: 3, title: "Detective" },
            { level: 5, title: "Master" }
          ].map((rank, i) => (
            <group key={`rank-${i}`} position={[i * 1.2 - 1.2, 0, 0]}>
              <mesh>
                <boxGeometry args={[0.08, 0.06, 0.01]} />
                <meshStandardMaterial color={getSkillColor(rank.level)} />
              </mesh>
              <mesh position={[0, -0.15, 0]}>
                <planeGeometry args={[0.8, 0.1]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
            </group>
          ))}
        </group>

        {/* Category Legend */}
        <group position={[0, -0.2, 0.02]}>
          {[
            { category: 'frontend', name: 'Frontend' },
            { category: 'backend', name: 'Backend' },
            { category: 'cloud', name: 'Cloud' },
            { category: 'devops', name: 'DevOps' }
          ].map((cat, i) => (
            <group key={`cat-${i}`} position={[i * 0.8 - 1.2, 0, 0]}>
              <mesh>
                <cylinderGeometry args={[0.04, 0.04, 0.008]} />
                <meshStandardMaterial color={getCategoryColor(cat.category)} />
              </mesh>
              <mesh position={[0, -0.1, 0]}>
                <planeGeometry args={[0.6, 0.08]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* Detective Tools */}
      {/* Magnifying Glass */}
      <group position={[-1.5, 1.5, 0.03]} rotation={[0, 0, Math.PI / 6]}>
        <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh>
          <torusGeometry args={[0.06, 0.004]} />
          <meshStandardMaterial color="#8b7355" metalness={0.7} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.055, 0.055, 0.001]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.3} 
          />
        </mesh>
      </group>

      {/* Evidence Tape */}
      <mesh position={[1.5, -1.8, 0.03]} rotation={[0, 0, 0.3]}>
        <planeGeometry args={[2, 0.2]} />
        <meshStandardMaterial 
          color="#FFD700" 
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Section border when active */}
      {isActive && (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[4.2, 4.2]} />
          <meshStandardMaterial 
            color="#b8860b" 
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Push pins */}
      <mesh position={[-1.8, 1.8, 0.05]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>
      <mesh position={[1.8, 1.8, 0.05]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>
    </group>
  );
};