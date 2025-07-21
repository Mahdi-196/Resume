import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DetectiveOfficeProps {
  onInteraction: (type: string, data?: any) => void;
}

// Office Room Component - Native Three.js only
const OfficeRoom = () => {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#3d2817" roughness={0.8} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 5, -10]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#2a1810" roughness={0.9} />
      </mesh>
      
      {/* Left Wall */}
      <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#2a1810" roughness={0.9} />
      </mesh>
      
      {/* Right Wall */}
      <mesh position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#2a1810" roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1006" roughness={0.9} />
      </mesh>
    </group>
  );
};

// Executive Desk Component - Native Three.js only
const ExecutiveDesk = ({ onInteraction }: { onInteraction: (type: string) => void }) => {
  return (
    <group position={[0, 0, -3]}>
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

      {/* Banker's Lamp */}
      <group 
        position={[-1.5, 1.2, 0]}
        onClick={() => onInteraction('lamp')}
        onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
      >
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color="#d4af37" emissive="#8b7355" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.02, 0.4, 0.02]} />
          <meshStandardMaterial color="#8b7355" metalness={0.8} />
        </mesh>
      </group>

      {/* Typewriter */}
      <group 
        position={[1, 1.15, 0]}
        onClick={() => onInteraction('typewriter')}
        onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
      >
        <mesh>
          <boxGeometry args={[0.8, 0.2, 0.6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>

      {/* Cigar with Smoke */}
      <SmokeEffect position={[0.5, 1.15, 0.3]} />
    </group>
  );
};

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

// Resume Display Boards
const ResumeBoards = ({ detectiveVision, onInteraction }: { 
  detectiveVision: boolean;
  onInteraction: (type: string, data: string) => void;
}) => {
  const boards = [
    { title: 'ABOUT ME', position: [-6, 2, -8] as [number, number, number], content: 'about' },
    { title: 'SKILLS', position: [0, 2, -8] as [number, number, number], content: 'skills' },
    { title: 'RESUME', position: [6, 2, -8] as [number, number, number], content: 'resume' }
  ];

  return (
    <>
      {boards.map((board, index) => (
        <group 
          key={board.content}
          position={board.position}
          onClick={() => onInteraction('board', board.content)}
          onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
        >
          {/* Easel */}
          <mesh position={[-0.8, -0.5, 0]}>
            <boxGeometry args={[0.05, 3, 0.05]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
          <mesh position={[0.8, -0.5, 0]}>
            <boxGeometry args={[0.05, 3, 0.05]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
          
          {/* Display Board */}
          <mesh position={[0, 0, 0.1]}>
            <planeGeometry args={[2, 1.5]} />
            <meshStandardMaterial 
              color={detectiveVision ? "#ffffff" : "#f5f5dc"}
              emissive={detectiveVision ? "#ffffff" : "#000000"}
              emissiveIntensity={detectiveVision ? 0.3 : 0}
            />
          </mesh>

          {/* Simple text representation */}
          <mesh position={[0, 0.5, 0.2]}>
            <boxGeometry args={[1.5, 0.1, 0.01]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>
      ))}
    </>
  );
};

// Leo the Cat Component
const LeoTheCat = ({ onInteraction }: { onInteraction: (type: string) => void }) => {
  const catRef = useRef<THREE.Group>(null);
  const [position, setPosition] = useState<[number, number, number]>([3, 0.3, 2]);
  
  useFrame((state) => {
    if (catRef.current) {
      // Gentle breathing animation
      catRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      
      // Occasional movement
      if (Math.sin(state.clock.elapsedTime * 0.1) > 0.98) {
        const newX = 3 + Math.sin(state.clock.elapsedTime * 0.05) * 2;
        const newZ = 2 + Math.cos(state.clock.elapsedTime * 0.05) * 1;
        setPosition([newX, 0.3, newZ]);
      }
    }
  });

  return (
    <group 
      ref={catRef}
      position={position}
      onClick={() => onInteraction('cat')}
      onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
    >
      {/* Cat Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 8, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      
      {/* Cat Head */}
      <mesh position={[0, 0.15, 0.25]}>
        <sphereGeometry args={[0.2, 8, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      
      {/* White Chest */}
      <mesh position={[0, -0.1, 0.2]}>
        <sphereGeometry args={[0.15, 8, 6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 0.1, -0.5]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
    </group>
  );
};

// Window with simple cityscape representation
const OfficeWindow = () => {
  return (
    <group position={[8, 4, -8]}>
      {/* Window Frame */}
      <mesh position={[-2.05, 0, 0]}>
        <boxGeometry args={[0.1, 6, 4]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[2.05, 0, 0]}>
        <boxGeometry args={[0.1, 6, 4]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[0, 3.05, 0]}>
        <boxGeometry args={[4, 0.1, 4]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[0, -3.05, 0]}>
        <boxGeometry args={[4, 0.1, 4]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      
      {/* Window Glass - dark blue for night cityscape */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[4, 6]} />
        <meshStandardMaterial 
          color="#1a1a3a"
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Rain streaks */}
      {[...Array(20)].map((_, i) => (
        <mesh 
          key={i}
          position={[
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 6,
            0.1
          ]}
          rotation={[0, 0, Math.random() * 0.2 - 0.1]}
        >
          <planeGeometry args={[0.02, 0.5]} />
          <meshStandardMaterial 
            color="#87ceeb" 
            transparent 
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

// Lighting Setup
const Lighting = () => {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.1} color="#ffd700" />
      
      {/* Desk lamp light */}
      <pointLight 
        position={[-1.5, 2, -3]} 
        intensity={1}
        color="#ffd700"
        distance={8}
        decay={2}
      />
      
      {/* Window light */}
      <directionalLight 
        position={[10, 8, -5]} 
        intensity={0.3}
        color="#87ceeb"
      />
      
      {/* Soft fill light */}
      <pointLight 
        position={[0, 8, 0]} 
        intensity={0.2}
        color="#ffd700"
        distance={15}
        decay={2}
      />
    </>
  );
};

// Main Detective Office Component
export const DetectiveOffice = ({ onInteraction }: DetectiveOfficeProps) => {
  const [detectiveVision, setDetectiveVision] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        setDetectiveVision(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="w-full h-screen bg-noir-shadow">
      <Canvas shadows camera={{ position: [0, 1.7, 5], fov: 75 }}>
        
        <Lighting />
        <OfficeRoom />
        <ExecutiveDesk onInteraction={onInteraction} />
        <ResumeBoards 
          detectiveVision={detectiveVision} 
          onInteraction={onInteraction} 
        />
        <LeoTheCat onInteraction={onInteraction} />
        <OfficeWindow />
      </Canvas>

      {/* Detective Vision Indicator */}
      {detectiveVision && (
        <div className="absolute top-4 left-4 text-detective-glow text-lg font-bold animate-detective-glow">
          DETECTIVE VISION ACTIVE
        </div>
      )}

      {/* Controls Hint */}
      <div className="absolute bottom-4 left-4 text-detective-paper text-sm space-y-1">
        <p>Mouse - Look Around • Click - Interact</p>
        <p>Tab - Detective Vision</p>
      </div>
    </div>
  );
};