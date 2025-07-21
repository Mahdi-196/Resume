import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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

      {/* Banker's Lamp - Much Bigger and More Prominent */}
      <group 
        position={[-1.5, 1.2, 0]}
        onClick={() => onInteraction('lamp')}
        onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
      >
        {/* Lamp Base */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.2]} />
          <meshStandardMaterial color="#8b7355" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Lamp Stem */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.6]} />
          <meshStandardMaterial color="#8b7355" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Lamp Shade - Much Larger */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.4, 0.3, 0.3]} />
          <meshStandardMaterial 
            color="#2d5016" 
            emissive="#d4af37" 
            emissiveIntensity={0.3}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
        
        {/* Light Bulb - Visible and Glowing */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial 
            color="#fff8dc" 
            emissive="#ffd700" 
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
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

// Camera Controls Component
const CameraControls = () => {
  const { camera, gl } = useThree();
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          moveState.current.forward = true;
          break;
        case 'KeyS':
          moveState.current.backward = true;
          break;
        case 'KeyA':
          moveState.current.left = true;
          break;
        case 'KeyD':
          moveState.current.right = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          moveState.current.forward = false;
          break;
        case 'KeyS':
          moveState.current.backward = false;
          break;
        case 'KeyA':
          moveState.current.left = false;
          break;
        case 'KeyD':
          moveState.current.right = false;
          break;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement === gl.domElement) {
        const sensitivity = 0.002;
        camera.rotation.y -= event.movementX * sensitivity;
        camera.rotation.x -= event.movementY * sensitivity;
        
        // Clamp vertical rotation
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
      }
    };

    const handleClick = () => {
      gl.domElement.requestPointerLock();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('click', handleClick);
    };
  }, [camera, gl]);

  useFrame(() => {
    const speed = 0.1;
    const direction = new THREE.Vector3();
    
    if (moveState.current.forward) {
      direction.z -= speed;
    }
    if (moveState.current.backward) {
      direction.z += speed;
    }
    if (moveState.current.left) {
      direction.x -= speed;
    }
    if (moveState.current.right) {
      direction.x += speed;
    }

    // Apply rotation to movement direction
    direction.applyEuler(camera.rotation);
    camera.position.add(direction);
  });

  return null;
};

// Lighting Setup with functional lamp
const Lighting = ({ lampOn }: { lampOn: boolean }) => {
  return (
    <>
      {/* Ambient light - Very low when lamp is on */}
      <ambientLight intensity={lampOn ? 0.05 : 0.2} color="#ffd700" />
      
      {/* Main Desk lamp light - MUCH MORE POWERFUL to light entire room */}
      <pointLight 
        position={[-1.5, 3, -3]} 
        intensity={lampOn ? 8 : 0.5}
        color="#ffd700"
        distance={25}  // Much larger distance to reach entire room
        decay={1}      // Less decay so light travels farther
      />
      
      {/* Secondary lamp light for even coverage */}
      <pointLight 
        position={[-1.5, 2.5, -3]} 
        intensity={lampOn ? 6 : 0}
        color="#ffeb99"  // Slightly warmer tone
        distance={30}
        decay={1}
      />
      
      {/* Window light - Dimmer when lamp is on */}
      <directionalLight 
        position={[10, 8, -5]} 
        intensity={lampOn ? 0.1 : 0.3}
        color="#87ceeb"
      />
      
      {/* Ceiling fill light - Only when lamp is off */}
      <pointLight 
        position={[0, 8, 0]} 
        intensity={lampOn ? 0 : 0.4}
        color="#ffd700"
        distance={20}
        decay={2}
      />
    </>
  );
};

// Main Detective Office Component
export const DetectiveOffice = ({ onInteraction }: DetectiveOfficeProps) => {
  const [detectiveVision, setDetectiveVision] = useState(false);
  const [lampOn, setLampOn] = useState(true);

  const handleInteraction = (type: string, data?: any) => {
    if (type === 'lamp') {
      setLampOn(prev => !prev);
      console.log('Lamp toggled:', !lampOn);
    } else {
      onInteraction(type, data);
    }
  };

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
        <CameraControls />
        <Lighting lampOn={lampOn} />
        <OfficeRoom />
        <ExecutiveDesk onInteraction={handleInteraction} />
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

      {/* Lamp Status Indicator */}
      <div className="absolute top-4 right-4 text-detective-glow text-sm">
        Desk Lamp: {lampOn ? 'ON' : 'OFF'}
      </div>

      {/* Controls Hint */}
      <div className="absolute bottom-4 left-4 text-detective-paper text-sm space-y-1">
        <p>WASD - Move • Mouse - Look Around • Click - Interact</p>
        <p>Tab - Detective Vision • Click Lamp to Toggle</p>
        <p>Click anywhere to enable mouse look</p>
      </div>
    </div>
  );
};