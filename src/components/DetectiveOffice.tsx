import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface DetectiveOfficeProps {
  onInteraction: (type: string, data?: any) => void;
}

// Complete Detective Office Room with wood paneling and bookshelves
const OfficeRoom = () => {
  return (
    <group>
      {/* Hardwood Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8b4513" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Ornate Rug in center */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -2]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#8b0000" roughness={0.8} />
      </mesh>

      {/* Back Wall (North) - Dark wood paneling */}
      <mesh position={[0, 5, -10]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>
      
      
      {/* Front Wall (South) - Wood paneling */}
      <mesh position={[0, 5, 10]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>
      
      {/* Left Wall (West) - Wood paneling */}
      <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>
      
      {/* Right Wall (East) - Wood paneling */}
      <mesh position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>

      {/* Ceiling with wooden beams */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1006" roughness={0.8} />
      </mesh>
      
      {/* Wooden ceiling beams */}
      {[-6, -2, 2, 6].map((z, i) => (
        <mesh key={i} position={[0, 9.8, z]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.2, 20, 0.3]} />
          <meshStandardMaterial color="#654321" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
};

// Executive Desk Component
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

      {/* Cigar in Ashtray with continuous smoke */}
      <group position={[0.5, 1.1, 0.3]}>
        {/* Ashtray */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.1, 0.03]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Cigar */}
        <mesh position={[0, 0.02, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15]} />
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </mesh>
        {/* Continuous Smoke Effect */}
        <SmokeEffect position={[0, 0.05, 0]} />
      </group>
    </group>
  );
};

// Enhanced Window with Dynamic Cityscape and Animated Rain - Centered on back wall
const OfficeWindow = () => {
  const rainRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
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
    <group position={[0, 2.5, -9.5]}> {/* Centered on back wall, lower position */}
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
      
      {/* High-rise City View - Looking out from tall building */}
      <group position={[0, 0, -1]}>
        {/* Close Buildings at Eye Level */}
        {[-10, -6, -2, 2, 6, 10].map((x, i) => (
          <mesh key={`close-${i}`} position={[x, 0.5 + i * 0.2, -0.5]}>
            <boxGeometry args={[2, 4 + Math.random() * 2, 0.8]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
            
            {/* Building windows */}
            {[...Array(Math.floor(Math.random() * 12) + 8)].map((_, j) => (
              <mesh key={j} position={[
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 3,
                0.41
              ]}>
                <planeGeometry args={[0.12, 0.15]} />
                <meshStandardMaterial 
                  color="#ffa500" 
                  emissive="#ffa500"
                  emissiveIntensity={Math.random() > 0.3 ? 1.0 : 0.2}
                />
              </mesh>
            ))}
          </mesh>
        ))}
        
        {/* Distant Buildings - Lower on horizon */}
        {[-12, -8, -4, 0, 4, 8, 12].map((x, i) => (
          <mesh key={`distant-${i}`} position={[x, -1 + i * 0.1, -2]}>
            <boxGeometry args={[1.5, 2 + Math.random() * 1.5, 0.3]} />
            <meshStandardMaterial color="#0f0f0f" roughness={0.9} />
            
            {/* Distant building lights */}
            {[...Array(Math.floor(Math.random() * 6) + 3)].map((_, j) => (
              <mesh key={j} position={[
                (Math.random() - 0.5) * 1.2,
                (Math.random() - 0.5) * 1.8,
                0.16
              ]}>
                <planeGeometry args={[0.08, 0.1]} />
                <meshStandardMaterial 
                  color="#ffaa00" 
                  emissive="#ffaa00"
                  emissiveIntensity={0.8}
                />
              </mesh>
            ))}
          </mesh>
        ))}
        
        {/* Very Distant Skyline */}
        {[-15, -10, -5, 0, 5, 10, 15].map((x, i) => (
          <mesh key={`skyline-${i}`} position={[x, -2.5, -4]}>
            <boxGeometry args={[2, 1 + Math.random() * 0.8, 0.2]} />
            <meshStandardMaterial color="#050505" roughness={1} />
          </mesh>
        ))}
        
        {/* Street Level Far Below */}
        <mesh position={[0, -4, -1]}>
          <planeGeometry args={[30, 2]} />
          <meshStandardMaterial 
            color="#333300"
            emissive="#333300"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {/* Street Lights Pattern */}
        {[-12, -8, -4, 0, 4, 8, 12].map((x, i) => (
          <mesh key={`street-${i}`} position={[x, -3.8, -0.8]}>
            <sphereGeometry args={[0.03]} />
            <meshStandardMaterial 
              color="#ffff88" 
              emissive="#ffff88"
              emissiveIntensity={1.5}
            />
          </mesh>
        ))}
        
        {/* Fog/Haze Effect */}
        <mesh position={[0, -1, -3]}>
          <planeGeometry args={[25, 3]} />
          <meshStandardMaterial 
            color="#666666"
            transparent
            opacity={0.1}
          />
        </mesh>
      </group>
      
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

// Chandelier Component
const Chandelier = ({ onInteraction }: { onInteraction: (type: string) => void }) => {
  return (
    <group 
      position={[0, 8.5, -2]}
      onClick={() => onInteraction('lamp')}
      onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
    >
      {/* Chain */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.6]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.8} roughness={0.3} />
      </mesh>
      
      {/* Main Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4]} />
        <meshStandardMaterial color="#8b7355" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Arms */}
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
          <mesh position={[0.6, 0, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.02, 0.02, 0.8]} />
            <meshStandardMaterial color="#8b7355" metalness={0.7} roughness={0.2} />
          </mesh>
          
          {/* Candle Holders */}
          <mesh position={[1, -0.2, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.1]} />
            <meshStandardMaterial color="#8b7355" metalness={0.7} roughness={0.2} />
          </mesh>
          
          {/* Candles */}
          <mesh position={[1, -0.1, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.2]} />
            <meshStandardMaterial color="#fff8dc" roughness={0.8} />
          </mesh>
          
          {/* Flames */}
          <mesh position={[1, 0.05, 0]}>
            <sphereGeometry args={[0.02]} />
            <meshStandardMaterial 
              color="#ffa500" 
              emissive="#ffa500"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Remove the old HangingLamp component since we're using chandelier
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

// Lighting Setup with functional desk lamp
const Lighting = ({ lampOn }: { lampOn: boolean }) => {
  return (
    <>
      {/* Ambient light - Very low when lamp is on */}
      <ambientLight intensity={lampOn ? 0.05 : 0.2} color="#ffd700" />
      
      {/* Main Desk lamp light - positioned at banker's lamp location */}
      <pointLight 
        position={[-1.5, 3, -3]} 
        intensity={lampOn ? 12 : 0.5}
        color="#ffd700"
        distance={30}  // Much larger distance to reach entire room
        decay={1}      // Less decay so light travels farther
      />
      
      {/* Secondary lamp light for even coverage */}
      <pointLight 
        position={[0, 6, -2]} 
        intensity={lampOn ? 8 : 0}
        color="#ffeb99"  // Slightly warmer tone
        distance={35}
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
        position={[0, 9, 0]} 
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
        <LeoTheCat onInteraction={onInteraction} />
        <OfficeWindow />
        <Chandelier onInteraction={handleInteraction} />
        <ResumeBoards 
          detectiveVision={detectiveVision} 
          onInteraction={handleInteraction} 
        />
      </Canvas>

      {/* Detective Vision Indicator */}
      {detectiveVision && (
        <div className="absolute top-4 left-4 text-detective-glow text-lg font-bold animate-detective-glow">
          DETECTIVE VISION ACTIVE
        </div>
      )}

      {/* Lamp Status Indicator */}
      <div className="absolute top-4 right-4 text-detective-glow text-sm">
        Banker's Lamp: {lampOn ? 'ON' : 'OFF'}
      </div>

      {/* Controls Hint */}
      <div className="absolute bottom-4 left-4 text-detective-paper text-sm space-y-1">
        <p>WASD - Move • Mouse - Look Around • Click - Interact</p>
        <p>Tab - Detective Vision • Click Banker's Lamp to Toggle</p>
        <p>Click anywhere to enable mouse look</p>
      </div>
    </div>
  );
};