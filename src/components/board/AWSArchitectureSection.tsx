import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AWSArchitectureSectionProps {
  position: [number, number, number];
  isActive: boolean;
  onClick: () => void;
  onInteraction: (type: string, data?: unknown) => void;
}

export const AWSArchitectureSection = ({ position, isActive, onClick, onInteraction }: AWSArchitectureSectionProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      // Subtle animation when active
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.02);
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(1);
    }
  });

  const handleServiceClick = (serviceName: string, event: any) => {
    event.stopPropagation();
    onInteraction('aws-service-clicked', serviceName);
  };

  const handleServiceHover = (serviceName: string) => {
    setHoveredService(serviceName);
    document.body.style.cursor = 'pointer';
  };

  const handleServiceOut = () => {
    setHoveredService(null);
    document.body.style.cursor = 'zoom-in';
  };

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Section Background */}
      <mesh>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial 
          color={isActive ? "#F5F5DC" : "#E5E5D0"} 
          emissive={isActive ? "#b8860b" : "#000000"}
          emissiveIntensity={isActive ? 0.1 : 0}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Section Title */}
      <mesh position={[0, 1.3, 0.01]}>
        <planeGeometry args={[3, 0.3]} />
        <meshStandardMaterial color="#232F3E" />
      </mesh>

      {/* AWS Architecture Diagram */}
      <group position={[0, 0.2, 0.02]}>
        {/* Client Application */}
        <group position={[-3, 0.5, 0]}>
          <mesh 
            onClick={(e) => handleServiceClick('client', e)}
            onPointerOver={() => handleServiceHover('client')}
            onPointerOut={handleServiceOut}
          >
            <cylinderGeometry args={[0.25, 0.25, 0.05]} />
            <meshStandardMaterial 
              color={hoveredService === 'client' ? "#4CAF50" : "#2196F3"} 
              emissive={hoveredService === 'client' ? "#4CAF50" : "#000000"}
              emissiveIntensity={hoveredService === 'client' ? 0.3 : 0}
            />
          </mesh>
          {/* User icon placeholder */}
          <mesh position={[0, 0, 0.03]}>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          
          {/* Label */}
          <mesh position={[0, -0.5, 0]}>
            <planeGeometry args={[1.5, 0.2]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>

        {/* API Gateway */}
        <group position={[-1, 0.5, 0]}>
          <mesh 
            onClick={(e) => handleServiceClick('api-gateway', e)}
            onPointerOver={() => handleServiceHover('api-gateway')}
            onPointerOut={handleServiceOut}
          >
            <boxGeometry args={[0.5, 0.5, 0.1]} />
            <meshStandardMaterial 
              color={hoveredService === 'api-gateway' ? "#FF9900" : "#FF4081"} 
              emissive={hoveredService === 'api-gateway' ? "#FF9900" : "#000000"}
              emissiveIntensity={hoveredService === 'api-gateway' ? 0.3 : 0}
            />
          </mesh>
          {/* API Gateway icon */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[0.3, 0.3]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          
          {/* Label */}
          <mesh position={[0, -0.5, 0]}>
            <planeGeometry args={[1.2, 0.2]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>

        {/* AWS Lambda */}
        <group position={[1, 0.5, 0]}>
          <mesh 
            onClick={(e) => handleServiceClick('lambda', e)}
            onPointerOver={() => handleServiceHover('lambda')}
            onPointerOut={handleServiceOut}
          >
            <boxGeometry args={[0.6, 0.4, 0.1]} />
            <meshStandardMaterial 
              color={hoveredService === 'lambda' ? "#FF9900" : "#FF9900"} 
              emissive={hoveredService === 'lambda' ? "#FF9900" : "#000000"}
              emissiveIntensity={hoveredService === 'lambda' ? 0.3 : 0}
            />
          </mesh>
          
          {/* Docker logo */}
          <mesh position={[-0.15, 0.1, 0.06]}>
            <boxGeometry args={[0.15, 0.1, 0.02]} />
            <meshStandardMaterial color="#0db7ed" />
          </mesh>
          
          {/* Python logo */}
          <mesh position={[0.15, 0.1, 0.06]}>
            <sphereGeometry args={[0.06]} />
            <meshStandardMaterial color="#3776ab" />
          </mesh>
          
          {/* Lambda symbol */}
          <mesh position={[0, -0.1, 0.06]}>
            <planeGeometry args={[0.2, 0.15]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          
          {/* Label */}
          <mesh position={[0, -0.5, 0]}>
            <planeGeometry args={[1, 0.2]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>

        {/* ML Engineer */}
        <group position={[3, 0.5, 0]}>
          <mesh 
            onClick={(e) => handleServiceClick('ml-engineer', e)}
            onPointerOver={() => handleServiceHover('ml-engineer')}
            onPointerOut={handleServiceOut}
          >
            <cylinderGeometry args={[0.25, 0.25, 0.05]} />
            <meshStandardMaterial 
              color={hoveredService === 'ml-engineer' ? "#4CAF50" : "#8EC441"} 
              emissive={hoveredService === 'ml-engineer' ? "#4CAF50" : "#000000"}
              emissiveIntensity={hoveredService === 'ml-engineer' ? 0.3 : 0}
            />
          </mesh>
          {/* Person icon */}
          <mesh position={[0, 0, 0.03]}>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          
          {/* Label */}
          <mesh position={[0, -0.5, 0]}>
            <planeGeometry args={[1.2, 0.2]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>

        {/* Data Flow Arrows */}
        {/* Client to API Gateway */}
        <mesh position={[-2, 0.6, 0.01]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1.5]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-1.3, 0.6, 0.02]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.05, 0.1]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* API Gateway to Lambda */}
        <mesh position={[0, 0.6, 0.01]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1.5]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.7, 0.6, 0.02]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.05, 0.1]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* Lambda to ML Engineer */}
        <mesh position={[2, 0.6, 0.01]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1.5]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[2.7, 0.6, 0.02]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.05, 0.1]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* Lower Services Row */}
        {/* Amazon EFS */}
        <group position={[-2, -0.5, 0]}>
          <mesh 
            onClick={(e) => handleServiceClick('efs', e)}
            onPointerOver={() => handleServiceHover('efs')}
            onPointerOut={handleServiceOut}
          >
            <boxGeometry args={[0.4, 0.4, 0.1]} />
            <meshStandardMaterial 
              color={hoveredService === 'efs' ? "#8EC441" : "#569A31"} 
              emissive={hoveredService === 'efs' ? "#8EC441" : "#000000"}
              emissiveIntensity={hoveredService === 'efs' ? 0.3 : 0}
            />
          </mesh>
          {/* EFS icon */}
          <mesh position={[0, 0, 0.06]}>
            <torusGeometry args={[0.1, 0.03]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          
          {/* Label */}
          <mesh position={[0, -0.4, 0]}>
            <planeGeometry args={[1, 0.15]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>

        {/* Lambda (Lower) */}
        <group position={[0, -0.5, 0]}>
          <mesh 
            onClick={(e) => handleServiceClick('lambda-lower', e)}
            onPointerOver={() => handleServiceHover('lambda-lower')}
            onPointerOut={handleServiceOut}
          >
            <boxGeometry args={[0.4, 0.4, 0.1]} />
            <meshStandardMaterial 
              color={hoveredService === 'lambda-lower' ? "#FF9900" : "#FF9900"} 
              emissive={hoveredService === 'lambda-lower' ? "#FF9900" : "#000000"}
              emissiveIntensity={hoveredService === 'lambda-lower' ? 0.3 : 0}
            />
          </mesh>
          {/* Lambda symbol */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[0.2, 0.15]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          
          {/* Label */}
          <mesh position={[0, -0.4, 0]}>
            <planeGeometry args={[1, 0.15]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>

        {/* Amazon S3 */}
        <group position={[2, -0.5, 0]}>
          <mesh 
            onClick={(e) => handleServiceClick('s3', e)}
            onPointerOver={() => handleServiceHover('s3')}
            onPointerOut={handleServiceOut}
          >
            <boxGeometry args={[0.4, 0.4, 0.1]} />
            <meshStandardMaterial 
              color={hoveredService === 's3' ? "#8EC441" : "#569A31"} 
              emissive={hoveredService === 's3' ? "#8EC441" : "#000000"}
              emissiveIntensity={hoveredService === 's3' ? 0.3 : 0}
            />
          </mesh>
          {/* S3 bucket icon */}
          <mesh position={[0, 0, 0.06]}>
            <cylinderGeometry args={[0.1, 0.12, 0.15]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          
          {/* Label */}
          <mesh position={[0, -0.4, 0]}>
            <planeGeometry args={[1, 0.15]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>

        {/* Connection arrows for lower row */}
        <mesh position={[-1, -0.4, 0.01]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 1.5]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-0.3, -0.4, 0.02]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.03, 0.06]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        <mesh position={[1, -0.4, 0.01]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 1.5]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[1.7, -0.4, 0.02]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.03, 0.06]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* Flow labels */}
        <mesh position={[-2, 0.8, 0.01]}>
          <planeGeometry args={[0.8, 0.15]} />
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0.8, 0.01]}>
          <planeGeometry args={[0.6, 0.15]} />
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
        </mesh>
        <mesh position={[2, 0.8, 0.01]}>
          <planeGeometry args={[0.8, 0.15]} />
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
        </mesh>

        {/* Loading Models and Uploading Models labels */}
        <mesh position={[1, 0.2, 0.01]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[0.6, 0.15]} />
          <meshStandardMaterial color="#DDA0DD" transparent opacity={0.8} />
        </mesh>
        <mesh position={[2.5, 0.2, 0.01]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[0.8, 0.15]} />
          <meshStandardMaterial color="#DDA0DD" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Section border when active */}
      {isActive && (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[8.2, 3.2]} />
          <meshStandardMaterial 
            color="#b8860b" 
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};