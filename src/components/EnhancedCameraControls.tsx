import { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface EnhancedCameraControlsProps {
  isTransitioning: boolean;
  showBoardContent?: boolean;
}

interface CameraControlsRef {
  camera: THREE.Camera;
  setLookAt: (
    posX: number, posY: number, posZ: number,
    targetX: number, targetY: number, targetZ: number,
    enableTransition?: boolean
  ) => Promise<void>;
  getTarget: (target: THREE.Vector3) => void;
  lock: () => void;
}

export const EnhancedCameraControls = forwardRef<CameraControlsRef, EnhancedCameraControlsProps>(
  ({ isTransitioning, showBoardContent = false }, ref) => {
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
    const lookTarget = useRef(new THREE.Vector3(0, 0, -1));

    useImperativeHandle(ref, () => ({
      lock: () => {
        if (!isMouseLocked.current && !isTransitioning && !showBoardContent) {
          // Add a small delay to ensure DOM is ready
          setTimeout(() => {
            if (gl.domElement && document.body.contains(gl.domElement)) {
              gl.domElement.requestPointerLock().catch((error) => {
                console.warn('Failed to request pointer lock:', error);
              });
            }
          }, 50);
        }
      },
      camera,
      setLookAt: async (posX: number, posY: number, posZ: number, targetX: number, targetY: number, targetZ: number, enableTransition?: boolean) => {
        if (enableTransition) {
          // Smooth transition
          const startPos = camera.position.clone();
          const targetPos = new THREE.Vector3(posX, posY, posZ);
          const startTarget = lookTarget.current.clone();
          const newTarget = new THREE.Vector3(targetX, targetY, targetZ);
          
          return new Promise<void>((resolve) => {
            let progress = 0;
            const duration = 1000; // 1 second
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              progress = Math.min(elapsed / duration, 1);
              
              // Smooth easing
              const eased = 1 - Math.pow(1 - progress, 3);
              
              camera.position.lerpVectors(startPos, targetPos, eased);
              lookTarget.current.lerpVectors(startTarget, newTarget, eased);
              camera.lookAt(lookTarget.current);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                resolve();
              }
            };
            animate();
          });
        } else {
          camera.position.set(posX, posY, posZ);
          lookTarget.current.set(targetX, targetY, targetZ);
          camera.lookAt(lookTarget.current);
          return Promise.resolve();
        }
      },
      getTarget: (target: THREE.Vector3) => {
        target.copy(lookTarget.current);
      }
    }), [camera, gl]);

    useEffect(() => {
      if (isTransitioning || showBoardContent) return;

      // Set initial camera position and rotation
      camera.position.set(0, 2, 5);
      camera.rotation.set(0, 0, 0);
      
      const handleKeyDown = (event: KeyboardEvent) => {
        if (isTransitioning) return;
        
        // Don't handle R key - let DetectiveOffice handle it
        if (event.key === 'r' || event.key === 'R') {
          return;
        }
        
        // Exit pointer lock on Escape
        if (event.key === 'Escape' && isMouseLocked.current) {
          document.exitPointerLock();
          return;
        }
        
        switch (event.code) {
          case 'KeyW':
            moveState.current.forward = true;
            requestPointerLockOnMovement();
            break;
          case 'KeyS':
            moveState.current.backward = true;
            requestPointerLockOnMovement();
            break;
          case 'KeyA':
            moveState.current.left = true;
            requestPointerLockOnMovement();
            break;
          case 'KeyD':
            moveState.current.right = true;
            requestPointerLockOnMovement();
            break;
          case 'Space':
            event.preventDefault();
            moveState.current.up = true;
            requestPointerLockOnMovement();
            break;
          case 'ShiftLeft':
            moveState.current.down = true;
            requestPointerLockOnMovement();
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
        if (isMouseLocked.current && !isTransitioning) {
          const sensitivity = 0.002;
          
          yaw.current -= event.movementX * sensitivity;
          pitch.current -= event.movementY * sensitivity;
          
          // Clamp vertical rotation to prevent flipping
          pitch.current = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, pitch.current));
          
          // Calculate look direction and update target
          const direction = new THREE.Vector3(
            -Math.sin(yaw.current) * Math.cos(pitch.current),
            Math.sin(pitch.current),
            -Math.cos(yaw.current) * Math.cos(pitch.current)
          );
          lookTarget.current.copy(camera.position).add(direction);
          camera.lookAt(lookTarget.current);
        }
      };

      const handleClick = (event: MouseEvent) => {
        if (isTransitioning) return;
        
        // Check if click is near the board area - don't lock pointer if so
        const boardArea = {
          minX: -7, maxX: 7,
          minZ: 8, maxZ: 10,
          minY: 1, maxY: 8
        };
        
        // Get click position in 3D space
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const rect = gl.domElement.getBoundingClientRect();
        
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        
        // Check if raycast hits board area
        const boardPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), -9.9);
        const intersectionPoint = new THREE.Vector3();
        
        if (raycaster.ray.intersectPlane(boardPlane, intersectionPoint)) {
          if (intersectionPoint.x >= boardArea.minX && intersectionPoint.x <= boardArea.maxX &&
              intersectionPoint.y >= boardArea.minY && intersectionPoint.y <= boardArea.maxY) {
            return; // Don't lock pointer, let board handle the click
          }
        }
        
        // Lock pointer when clicking in the scene
        if (!isMouseLocked.current) {
          event.stopPropagation();
          event.preventDefault();
          gl.domElement.requestPointerLock();
        }
      };

      const requestPointerLockOnMovement = () => {
        if (!isMouseLocked.current && !isTransitioning && !showBoardContent) {
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

      // Don't auto-enable pointer lock - let user click to enable it

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
    }, [camera, gl, isTransitioning]);

    useFrame(() => {
      if (isTransitioning || showBoardContent) return;
      
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
      if (moveState.current.up) {
        direction.y += speed;
      }
      if (moveState.current.down) {
        direction.y -= speed;
      }

      // Apply camera rotation to movement direction (only horizontal rotation for movement)
      if (direction.length() > 0) {
        const euler = new THREE.Euler(0, yaw.current, 0);
        direction.applyEuler(euler);
      }
      
      // Add bounds to keep camera within reasonable limits
      const newPosition = camera.position.clone().add(direction);
      newPosition.x = Math.max(-50, Math.min(50, newPosition.x));
      newPosition.y = Math.max(0.5, Math.min(30, newPosition.y));
      newPosition.z = Math.max(-50, Math.min(50, newPosition.z));
      
      camera.position.copy(newPosition);
      
      // Update look target to maintain current view direction
      const viewDirection = new THREE.Vector3(
        -Math.sin(yaw.current) * Math.cos(pitch.current),
        Math.sin(pitch.current),
        -Math.cos(yaw.current) * Math.cos(pitch.current)
      );
      lookTarget.current.copy(camera.position).add(viewDirection);
      camera.lookAt(lookTarget.current);
    });

    return null;
  }
);

EnhancedCameraControls.displayName = 'EnhancedCameraControls';