// Filing Cabinet Component with papers and folders
export const FilingCabinet = ({ position, rotation = [0, 0, 0] }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number] 
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Main cabinet body */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.8, 2, 0.6]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.3} />
      </mesh>
      
      {/* Drawers */}
      {[0.3, 0.9, 1.5].map((y, i) => (
        <group key={`drawer-${i}`}>
          {/* Drawer front */}
          <mesh position={[0.35, y, 0]}>
            <boxGeometry args={[0.1, 0.5, 0.55]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
          </mesh>
          
          {/* Drawer handle */}
          <mesh position={[0.42, y, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.3]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Label holder */}
          <mesh position={[0.4, y + 0.15, 0]}>
            <boxGeometry args={[0.02, 0.08, 0.2]} />
            <meshStandardMaterial color="#8b7355" roughness={0.8} />
          </mesh>
        </group>
      ))}
      
      {/* Papers sticking out of top drawer */}
      {[...Array(5)].map((_, i) => (
        <mesh key={`paper-${i}`} position={[
          0.45, 
          1.7 + (i * 0.01), 
          -0.1 + (i * 0.05)
        ]} rotation={[0, Math.random() * 0.2 - 0.1, Math.random() * 0.1]}>
          <boxGeometry args={[0.01, 0.15, 0.1]} />
          <meshStandardMaterial color="#f5f5dc" roughness={0.9} />
        </mesh>
      ))}
      
      {/* File folders visible in slightly open drawer */}
      <mesh position={[0.25, 1.5, 0]}>
        <boxGeometry args={[0.2, 0.45, 0.5]} />
        <meshStandardMaterial color="#654321" roughness={0.8} />
      </mesh>
      
      {/* Individual folders */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`folder-${i}`} position={[
          0.15,
          1.3 + (i * 0.02),
          -0.2 + (i * 0.05)
        ]}>
          <boxGeometry args={[0.05, 0.2, 0.12]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#8b4513" : "#556b2f"} 
            roughness={0.8} 
          />
        </mesh>
      ))}
    </group>
  );
};