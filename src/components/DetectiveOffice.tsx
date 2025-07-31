import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DetectiveCharacter } from './DetectiveCharacter';
import { CharacterController, useCharacterController } from './CharacterController';
import { OfficeRoom } from './OfficeRoom';
import { ExecutiveDesk } from './ExecutiveDesk';
import { OfficeWindow } from './OfficeWindow';
import { VictorianChair } from './VictorianChair';
import { InteractiveDetectiveBoard } from './InteractiveDetectiveBoard';
import { Lighting } from './Lighting';
import { Bookshelf } from './Bookshelf';
import { Fireplace } from './Fireplace';
import { FilingCabinet } from './FilingCabinet';
import { DetectiveProps } from './DetectiveProps';
import { SideTable } from './SideTable';
import { PersianRug } from './PersianRug';
import { VictorianDoor } from './VictorianDoor';
import { VictorianChandelier } from './VictorianChandelier';
import { ThreeEvent } from '../types/three';

interface DetectiveOfficeProps {
  onInteraction: (type: string, data?: unknown) => void;
}

// Enhanced Detective Office with Character
const DetectiveOfficeScene = ({ onInteraction, lampOn }: { onInteraction: (type: string, data?: unknown) => void; lampOn: boolean }) => {
  const detectiveRef = useRef<THREE.Group>(null);
  
  // Character movement bounds (keep detective within office)
  const characterBounds = {
    minX: -8,
    maxX: 8,
    minZ: -8,
    maxZ: 8
  };

  const characterController = useCharacterController({
    character: detectiveRef,
    bounds: characterBounds
  });

  // Handle floor clicks for detective movement
  const handleFloorClick = (event: ThreeEvent) => {
    event.stopPropagation();
    const clickPosition = new THREE.Vector3(
      event.point.x,
      0.1, // Slightly above floor
      event.point.z
    );
    characterController.moveToPosition(clickPosition);
  };

  return (
    <>
      {/* Clickable floor for character movement */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0.001, 0]}
        onClick={handleFloorClick}
        visible={false} // Invisible but clickable
      >
        <planeGeometry args={[18, 18]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Office room structure (walls, floor, ceiling) */}
      <OfficeRoom />
      
      {/* Central desk only */}
      <ExecutiveDesk onInteraction={onInteraction} />
      
      {/* Detective Character */}
      <DetectiveCharacter 
        ref={detectiveRef}
        position={[-2, 0.1, 3]} 
        onInteraction={onInteraction}
      />
      
      {/* Character Controller */}
      <CharacterController 
        character={detectiveRef}
        bounds={characterBounds}
      />
      
      {/* Window filling the wall opening */}
      <OfficeWindow />
      
      {/* Desk Chair */}
      <VictorianChair position={[0, 0, -3]} rotation={[0, 0, 0]} />
      
      {/* Interactive Detective Board */}
      <InteractiveDetectiveBoard onInteraction={onInteraction} />
      
      {/* Asymmetrical Bookshelves - Left wall (3 bookshelves with gaps) */}
      <Bookshelf position={[-9.0, 0, -6]} rotation={[0, Math.PI / 2, 0]} variant={1} />
      <Bookshelf position={[-9.0, 0, 0]} rotation={[0, Math.PI / 2, 0]} variant={2} />
      <Bookshelf position={[-9.0, 0, 6]} rotation={[0, Math.PI / 2, 0]} variant={3} />
      
      {/* Right wall (3 touching bookshelves) */}
      <Bookshelf position={[9.0, 0, -3]} rotation={[0, -Math.PI / 2, 0]} variant={5} />
      <Bookshelf position={[9.0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} variant={3} />
      <Bookshelf position={[9.0, 0, 3]} rotation={[0, -Math.PI / 2, 0]} variant={6} />
      
      {/* Corner bookshelf - L-shaped arrangement */}
      <Bookshelf position={[-8, 0, -9]} rotation={[0, 0, 0]} variant={7} />
      
      {/* Victorian Door on right wall */}
      <VictorianDoor position={[9.5, 0, 8]} rotation={[0, -Math.PI / 2, 0]} onInteraction={onInteraction} />
      
      {/* Victorian Chandelier - lowered 10% for smaller room */}
      <VictorianChandelier position={[0, 8.1, 2]} isLit={lampOn} />
      
      {/* Fireplace */}
      <Fireplace />
      
      {/* Filing Cabinets */}
      <FilingCabinet position={[-6, 0, -8]} rotation={[0, 0, 0]} />
      <FilingCabinet position={[6, 0, -8]} rotation={[0, Math.PI, 0]} />
      
      {/* Filing Cabinets against right corner walls */}
      <FilingCabinet position={[9.5, 0, -9.5]} rotation={[0, -Math.PI / 4, 0]} />
      <FilingCabinet position={[9.5, 0, -7.5]} rotation={[0, -Math.PI / 2, 0]} />
      <FilingCabinet position={[9.5, 0, -6.5]} rotation={[0, -Math.PI / 2, 0]} />
      <FilingCabinet position={[7.5, 0, -9.5]} rotation={[0, 0, 0]} />
      <FilingCabinet position={[6.5, 0, -9.5]} rotation={[0, 0, 0]} />
      
      {/* Side Tables with Detective Items */}
      <SideTable position={[-5, 0, 3]} />
      <SideTable position={[5, 0, 3]} />
      
      {/* Additional chairs - repositioned for better flow */}
      <VictorianChair position={[-3, 0, -0.5]} rotation={[0, Math.PI / 3, 0]} />
      <VictorianChair position={[3.5, 0, 1.5]} rotation={[0, -Math.PI / 6, 0]} />
      
      {/* Persian Rugs - adjusted to match new chair positions */}
      <PersianRug position={[-3, 0, -0.5]} size={[2, 2]} />
      <PersianRug position={[3.5, 0, 1.5]} size={[2, 2]} />
      <PersianRug position={[0, 0, 5]} size={[3, 2]} />
      
      {/* Small reading table near window */}
      <SideTable position={[2, 0, -7]} />
      
      {/* Scattered Detective Props */}
      <DetectiveProps position={[-3, 0.75, -1]} type="papers" />
      <DetectiveProps position={[2.5, 1.1, -0.5]} type="magnifying-glass" />
      <DetectiveProps position={[-1.5, 1.1, -1.5]} type="pipe" />
      <DetectiveProps position={[-6, 0, 5]} type="evidence-box" />
      <DetectiveProps position={[3, 0, 7]} type="newspaper" />
      <DetectiveProps position={[-2, 0, 6]} type="papers" />
      <DetectiveProps position={[7, 0, 4]} type="evidence-box" />
      
      {/* New Sherlock Holmes themed props */}
      <DetectiveProps position={[-4, 0, -6]} type="violin-case" />
      <DetectiveProps position={[5, 1.1, 3]} type="case-files" />
      <DetectiveProps position={[2, 1.1, -7]} type="map" />
      <DetectiveProps position={[-7, 0, 3]} type="case-files" />
      
      {/* Detective props on wall-adjacent filing cabinets */}
      <DetectiveProps position={[9.5, 1.1, -9.5]} type="papers" />
      <DetectiveProps position={[9.5, 1.1, -7.5]} type="case-files" />
      <DetectiveProps position={[9.5, 1.1, -6.5]} type="papers" />
      <DetectiveProps position={[7.5, 1.1, -9.5]} type="case-files" />
      <DetectiveProps position={[6.5, 1.1, -9.5]} type="papers" />
      <DetectiveProps position={[9.2, 0, -9.2]} type="evidence-box" />
      <DetectiveProps position={[9.2, 0, -8]} type="papers" />
      <DetectiveProps position={[9.2, 0, -7]} type="newspaper" />
      <DetectiveProps position={[8, 0, -9.2]} type="evidence-box" />
      <DetectiveProps position={[7, 0, -9.2]} type="case-files" />
    </>
  );
};

// Camera Controls Component
const CameraControls = () => {
  const { camera, gl } = useThree();
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false
  });
  
  const yaw = useRef(0);
  const pitch = useRef(0);
  const isMouseLocked = useRef(false);

  useEffect(() => {
    // Set initial camera position and rotation
    camera.position.set(0, 2, 5);
    camera.rotation.set(0, 0, 0);
    
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
        case 'Space':
          event.preventDefault();
          moveState.current.up = true;
          break;
        case 'ShiftLeft':
          moveState.current.down = true;
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
        case 'Space':
          moveState.current.up = false;
          break;
        case 'ShiftLeft':
          moveState.current.down = false;
          break;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isMouseLocked.current) {
        const sensitivity = 0.002;
        
        yaw.current -= event.movementX * sensitivity;
        pitch.current -= event.movementY * sensitivity;
        
        // Clamp vertical rotation to prevent flipping
        pitch.current = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, pitch.current));
        
        // Apply rotations
        camera.rotation.order = 'YXZ';
        camera.rotation.y = yaw.current;
        camera.rotation.x = pitch.current;
      }
    };

    const handleClick = (event: MouseEvent) => {
      // Prevent event from bubbling to scene objects
      event.stopPropagation();
      event.preventDefault();
      if (!isMouseLocked.current) {
        gl.domElement.requestPointerLock();
      }
    };

    const handlePointerLockChange = () => {
      isMouseLocked.current = document.pointerLockElement === gl.domElement;
      if (isMouseLocked.current) {
        gl.domElement.style.cursor = 'none';
      } else {
        gl.domElement.style.cursor = 'crosshair';
      }
    };

    // Auto-enable pointer lock on load
    const enablePointerLock = () => {
      if (!isMouseLocked.current) {
        gl.domElement.requestPointerLock();
      }
    };
    
    setTimeout(enablePointerLock, 100);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [camera, gl]);

  useFrame(() => {
    const speed = 0.15;
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
    if (moveState.current.up) {
      direction.y += speed;
    }
    if (moveState.current.down) {
      direction.y -= speed;
    }

    // Apply camera rotation to movement direction
    const euler = new THREE.Euler(0, yaw.current, 0);
    direction.applyEuler(euler);
    
    // Add bounds to keep camera within reasonable limits
    const newPosition = camera.position.clone().add(direction);
    newPosition.x = Math.max(-15, Math.min(15, newPosition.x));
    newPosition.y = Math.max(0.5, Math.min(12, newPosition.y));
    newPosition.z = Math.max(-15, Math.min(15, newPosition.z));
    
    camera.position.copy(newPosition);
  });

  return null;
};

// Main Detective Office Component
export const DetectiveOffice = ({ onInteraction }: DetectiveOfficeProps) => {
  const [detectiveVision, setDetectiveVision] = useState(false);
  const [lampOn, setLampOn] = useState(true);

  const handleInteraction = (type: string, data?: unknown) => {
    if (type === 'lamp') {
      setLampOn(prev => !prev);
      console.log('Lamp toggled:', !lampOn);
    } else if (type === 'detective') {
      console.log('Detective character clicked');
      // Add detective interaction logic here
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
      <Canvas 
        shadows 
        camera={{ position: [0, 2, 5], fov: 75 }}
        onCreated={({ gl }) => {
          gl.domElement.style.cursor = 'none';
        }}
      >
        <CameraControls />
        <Lighting lampOn={lampOn} detectiveVision={detectiveVision} />
        <DetectiveOfficeScene onInteraction={handleInteraction} lampOn={lampOn} />
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

      {/* Enhanced Controls Hint */}
      <div className="absolute bottom-4 left-4 text-detective-paper text-sm space-y-1">
        <p>WASD - Move • Mouse - Look Around • Space/Shift - Up/Down</p>
        <p>Tab - Detective Vision • Click Floor - Move Detective</p>
        <p>ESC - Release mouse • Click - Re-enable mouse look</p>
      </div>
    </div>
  );
};