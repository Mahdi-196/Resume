import { Canvas } from '@react-three/fiber';
import { Box, Plane, Sphere } from '@react-three/drei';

// Testing Drei components step by step
const OfficeRoom = () => {
  console.log('OfficeRoom rendering...');
  
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 5, -10]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      
      {/* Left Wall */}
      <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      
      {/* Right Wall */}
      <mesh position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1006" />
      </mesh>
    </group>
  );
};

// Enhanced Scene with Room
const EnhancedScene = () => {
  console.log('EnhancedScene rendering...');
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 8, 0]} intensity={0.5} color="#ffd700" />
      
      {/* Office Room */}
      <OfficeRoom />
      
      {/* Test native Three.js cube */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      {/* Test Drei Box component */}
      <Box position={[2, 1, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#ff0000" />
      </Box>
    </>
  );
};

interface DetectiveOfficeProps {
  onInteraction: (type: string, data?: any) => void;
}

export const DetectiveOffice = ({ onInteraction }: DetectiveOfficeProps) => {
  console.log('DetectiveOffice component mounting...');

  return (
    <div className="w-full h-screen bg-noir-shadow">
      <div className="absolute top-4 left-4 text-detective-glow z-10">
        Testing Drei Components - Step 3
      </div>
      
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <EnhancedScene />
      </Canvas>

      {/* Controls Hint */}
      <div className="absolute bottom-4 left-4 text-detective-paper text-sm">
        <p>Testing: Drei Box component (should see brown + red cubes)</p>
      </div>
    </div>
  );
};