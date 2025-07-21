import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  PointerLockControls,
  Text,
  Box,
  Plane,
  Sphere,
  useTexture
} from '@react-three/drei';
import * as THREE from 'three';
import woodTexture from '@/assets/wood-texture.jpg';
import cityscape from '@/assets/noir-cityscape.jpg';

interface DetectiveOfficeProps {
  onInteraction: (type: string, data?: any) => void;
}

// Office Room Component
const OfficeRoom = () => {
  const texture = useTexture(woodTexture);
  
  return (
    <group>
      {/* Floor */}
      <Plane
        args={[20, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          map={texture}
          roughness={0.8}
          metalness={0.1}
        />
      </Plane>

      {/* Walls */}
      <Plane args={[20, 10]} position={[0, 5, -10]}>
        <meshStandardMaterial color="#2a1810" roughness={0.9} />
      </Plane>
      
      <Plane args={[20, 10]} position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#2a1810" roughness={0.9} />
      </Plane>
      
      <Plane args={[20, 10]} position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <meshStandardMaterial color="#2a1810" roughness={0.9} />
      </Plane>

      {/* Ceiling */}
      <Plane
        args={[20, 20]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 10, 0]}
      >
        <meshStandardMaterial color="#1a1006" roughness={0.9} />
      </Plane>
    </group>
  );
};

// Executive Desk Component
const ExecutiveDesk = ({ onInteraction }: { onInteraction: (type: string) => void }) => {
  const deskRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={deskRef} position={[0, 0, -3]}>
      {/* Desk Surface */}
      <Box args={[4, 0.1, 2]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#3d2817" roughness={0.6} metalness={0.1} />
      </Box>
      
      {/* Desk Legs */}
      <Box args={[0.1, 1, 0.1]} position={[-1.8, 0.5, -0.8]}>
        <meshStandardMaterial color="#2a1810" />
      </Box>
      <Box args={[0.1, 1, 0.1]} position={[1.8, 0.5, -0.8]}>
        <meshStandardMaterial color="#2a1810" />
      </Box>
      <Box args={[0.1, 1, 0.1]} position={[-1.8, 0.5, 0.8]}>
        <meshStandardMaterial color="#2a1810" />
      </Box>
      <Box args={[0.1, 1, 0.1]} position={[1.8, 0.5, 0.8]}>
        <meshStandardMaterial color="#2a1810" />
      </Box>

      {/* Banker's Lamp */}
      <group 
        position={[-1.5, 1.2, 0]}
        onClick={() => onInteraction('lamp')}
        onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
      >
        <Sphere args={[0.1]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color="#d4af37" emissive="#8b7355" emissiveIntensity={0.5} />
        </Sphere>
        <Box args={[0.02, 0.4, 0.02]} position={[0, 0.1, 0]}>
          <meshStandardMaterial color="#8b7355" metalness={0.8} />
        </Box>
      </group>

      {/* Typewriter */}
      <group 
        position={[1, 1.15, 0]}
        onClick={() => onInteraction('typewriter')}
        onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
      >
        <Box args={[0.8, 0.2, 0.6]}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </Box>
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
        <Sphere 
          key={i} 
          args={[0.05 + i * 0.02]} 
          position={[0, i * 0.2, 0]}
        >
          <meshStandardMaterial 
            color="#666666" 
            transparent 
            opacity={0.3 - i * 0.05}
          />
        </Sphere>
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
          <Box args={[0.05, 3, 0.05]} position={[-0.8, -0.5, 0]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          <Box args={[0.05, 3, 0.05]} position={[0.8, -0.5, 0]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          
          {/* Display Board */}
          <Plane args={[2, 1.5]} position={[0, 0, 0.1]}>
            <meshStandardMaterial 
              color={detectiveVision ? "#ffffff" : "#f5f5dc"}
              emissive={detectiveVision ? "#ffffff" : "#000000"}
              emissiveIntensity={detectiveVision ? 0.3 : 0}
            />
          </Plane>

          {/* Title Text */}
          <Text
            position={[0, 0.5, 0.2]}
            fontSize={0.2}
            color="#1a1a1a"
            anchorX="center"
            anchorY="middle"
          >
            {board.title}
          </Text>
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
      <Sphere args={[0.3, 8, 6]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </Sphere>
      
      {/* Cat Head */}
      <Sphere args={[0.2, 8, 6]} position={[0, 0.15, 0.25]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </Sphere>
      
      {/* White Chest */}
      <Sphere args={[0.15, 8, 6]} position={[0, -0.1, 0.2]}>
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </Sphere>
      
      {/* Tail */}
      <Box args={[0.05, 0.05, 0.8]} position={[0, 0.1, -0.5]} rotation={[0.3, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </Box>
    </group>
  );
};

// Window with Cityscape
const OfficeWindow = () => {
  const cityscapeTexture = useTexture(cityscape);
  
  return (
    <group position={[8, 4, -8]}>
      {/* Window Frame */}
      <Box args={[0.1, 6, 4]} position={[-2.05, 0, 0]}>
        <meshStandardMaterial color="#4a3728" />
      </Box>
      <Box args={[0.1, 6, 4]} position={[2.05, 0, 0]}>
        <meshStandardMaterial color="#4a3728" />
      </Box>
      <Box args={[4, 0.1, 4]} position={[0, 3.05, 0]}>
        <meshStandardMaterial color="#4a3728" />
      </Box>
      <Box args={[4, 0.1, 4]} position={[0, -3.05, 0]}>
        <meshStandardMaterial color="#4a3728" />
      </Box>
      
      {/* Window Glass with Cityscape */}
      <Plane args={[4, 6]} position={[0, 0, 0.05]}>
        <meshStandardMaterial 
          map={cityscapeTexture}
          transparent
          opacity={0.8}
        />
      </Plane>
      
      {/* Rain streaks */}
      {[...Array(20)].map((_, i) => (
        <Plane 
          key={i}
          args={[0.02, 0.5]} 
          position={[
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 6,
            0.1
          ]}
          rotation={[0, 0, Math.random() * 0.2 - 0.1]}
        >
          <meshStandardMaterial 
            color="#87ceeb" 
            transparent 
            opacity={0.6}
          />
        </Plane>
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
      <Canvas shadows gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[0, 1.7, 5]} fov={75} />
        {/* <PointerLockControls /> - Temporarily disabled for debugging */}
        
        <Lighting />
        <OfficeRoom />
        <ExecutiveDesk onInteraction={onInteraction} />
        <ResumeBoards 
          detectiveVision={detectiveVision} 
          onInteraction={onInteraction} 
        />
        <LeoTheCat onInteraction={onInteraction} />
        <OfficeWindow />
        
        {/* Note: Post-processing effects removed temporarily for stability */}
      </Canvas>

      {/* Detective Vision Indicator */}
      {detectiveVision && (
        <div className="absolute top-4 left-4 text-detective-glow text-lg font-bold animate-detective-glow">
          DETECTIVE VISION ACTIVE
        </div>
      )}

      {/* Controls Hint */}
      <div className="absolute bottom-4 left-4 text-detective-paper text-sm space-y-1">
        <p>WASD - Move • Mouse - Look Around</p>
        <p>Tab - Detective Vision • Click - Interact</p>
      </div>
    </div>
  );
};