import { useRef } from 'react';
import * as THREE from 'three';
import { DetectiveCharacter } from './DetectiveCharacter';
import { CharacterController, useCharacterController } from './CharacterController';
import { OfficeRoom } from './OfficeRoom';
import { ExecutiveDesk } from './ExecutiveDesk';
import { OfficeWindow } from './OfficeWindow';
import { VictorianChair } from './VictorianChair';
import { InteractiveDetectiveBoard } from './InteractiveDetectiveBoard';
import { Bookshelf } from './Bookshelf';
import { Fireplace } from './Fireplace';
import { FilingCabinet } from './FilingCabinet';


import { VictorianDoor } from './VictorianDoor';
import { VictorianChandelier } from './VictorianChandelier';
import { ThreeEvent } from '../types/three';

interface DetectiveOfficeSceneProps {
  onInteraction: (type: string, data?: unknown) => void;
  lampOn: boolean;
  cameraControlsRef: React.RefObject<any>;
  onBoardClick: () => void;
  showBoardContent?: boolean;
  onBoardContentClose?: () => void;
}

export const DetectiveOfficeScene = ({ 
  onInteraction, 
  lampOn, 
  cameraControlsRef,
  onBoardClick,
  showBoardContent = false,
  onBoardContentClose
}: DetectiveOfficeSceneProps) => {
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
    // Don't handle clicks near the board area
    const boardArea = {
      minX: -7, maxX: 7,
      minZ: 8, maxZ: 10
    };
    
    if (event.point.x >= boardArea.minX && event.point.x <= boardArea.maxX &&
        event.point.z >= boardArea.minZ && event.point.z <= boardArea.maxZ) {
      return; // Let board handle its own clicks
    }
    
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
      <InteractiveDetectiveBoard 
        onInteraction={onInteraction} 
        onBoardClick={onBoardClick}
        showContent={showBoardContent}
        onContentClose={onBoardContentClose}
      />
      
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
      


    </>
  );
};