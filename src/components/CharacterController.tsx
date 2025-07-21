
import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CharacterControllerProps {
  character: React.RefObject<THREE.Group>;
  bounds: {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
  };
}

export const useCharacterController = ({ character, bounds }: CharacterControllerProps) => {
  const [targetPosition, setTargetPosition] = useState<THREE.Vector3 | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  
  const moveSpeed = 1.5;
  const maxSpeed = 2.0;

  const moveToPosition = useCallback((position: THREE.Vector3) => {
    // Clamp position to bounds
    const clampedPosition = new THREE.Vector3(
      Math.max(bounds.minX, Math.min(bounds.maxX, position.x)),
      position.y,
      Math.max(bounds.minZ, Math.min(bounds.maxZ, position.z))
    );
    
    setTargetPosition(clampedPosition);
    setIsMoving(true);
  }, [bounds]);

  const stopMovement = useCallback(() => {
    setTargetPosition(null);
    setIsMoving(false);
    setCurrentSpeed(0);
  }, []);

  useFrame((state, delta) => {
    if (!character.current || !targetPosition) return;

    const currentPosition = character.current.position;
    const direction = new THREE.Vector3().subVectors(targetPosition, currentPosition);
    const distance = direction.length();

    if (distance < 0.1) {
      // Reached target
      stopMovement();
      return;
    }

    // Smooth acceleration/deceleration
    const targetSpeed = Math.min(distance * 2, maxSpeed);
    setCurrentSpeed(prev => THREE.MathUtils.lerp(prev, targetSpeed, delta * 5));

    // Move towards target
    direction.normalize();
    const movement = direction.multiplyScalar(currentSpeed * delta);
    character.current.position.add(movement);

    // Rotate to face movement direction
    if (movement.length() > 0.01) {
      const angle = Math.atan2(direction.x, direction.z);
      character.current.rotation.y = THREE.MathUtils.lerp(
        character.current.rotation.y,
        angle,
        delta * 8
      );
    }
  });

  return {
    moveToPosition,
    stopMovement,
    isMoving,
    currentSpeed
  };
};

export const CharacterController = ({ character, bounds }: CharacterControllerProps) => {
  const controller = useCharacterController({ character, bounds });
  return null; // This is a logic-only component
};
