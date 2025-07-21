import { Canvas } from '@react-three/fiber';

// Simple test component to verify basic Three.js setup
const SimpleScene = () => {
  console.log('SimpleScene rendering...');
  
  return (
    <>
      {/* Basic lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Simple cube */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
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
        Minimal Test Scene - If you see this, the component is mounting
      </div>
      
      <Canvas>
        <SimpleScene />
      </Canvas>

      {/* Controls Hint */}
      <div className="absolute bottom-4 left-4 text-detective-paper text-sm">
        <p>Debugging Mode - Basic 3D scene test</p>
      </div>
    </div>
  );
};