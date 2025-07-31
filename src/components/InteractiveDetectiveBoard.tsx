interface InteractiveDetectiveBoardProps {
  onInteraction: (type: string, data?: unknown) => void;
}

export const InteractiveDetectiveBoard = ({ onInteraction }: InteractiveDetectiveBoardProps) => {
  return (
    <group position={[0, 4.5, 9.9]} rotation={[0, Math.PI, 0]}>
      {/* Main Cork Board Background - clean and empty */}
      <mesh>
        <planeGeometry args={[12.5, 6.5]} />
        <meshStandardMaterial 
          color="#8B4513" 
          roughness={0.9}
        />
      </mesh>
      
      {/* Outer Frame Background */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[13, 7]} />
        <meshStandardMaterial color="#4A3728" />
      </mesh>

      {/* 3D Raised Borders */}
      {/* Top border */}
      <mesh position={[0, 3.25, 0.02]}>
        <boxGeometry args={[13, 0.25, 0.08]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Bottom border */}
      <mesh position={[0, -3.25, 0.02]}>
        <boxGeometry args={[13, 0.25, 0.08]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Left border */}
      <mesh position={[-6.25, 0, 0.02]}>
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Right border */}
      <mesh position={[6.25, 0, 0.02]}>
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Corner brackets */}
      <mesh position={[-5.8, 2.8, 0.04]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      <mesh position={[5.8, 2.8, 0.04]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      <mesh position={[-5.8, -2.8, 0.04]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      <mesh position={[5.8, -2.8, 0.04]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
    </group>
  );
};