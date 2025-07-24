// Side Table with Detective Items
export const SideTable = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Table Top */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </mesh>
      
      {/* Table Leg */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.7]} />
        <meshStandardMaterial color="#2a1810" roughness={0.7} />
      </mesh>
      
      {/* Magnifying Glass */}
      <mesh position={[0.1, 0.75, 0.1]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3} 
          metalness={0.1} 
          roughness={0.1} 
        />
      </mesh>
      <mesh position={[0.1, 0.75, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.15]} />
        <meshStandardMaterial color="#654321" roughness={0.8} />
      </mesh>
      
      {/* Pipe */}
      <mesh position={[-0.1, 0.75, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.12]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </mesh>
      <mesh position={[-0.15, 0.78, -0.05]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>

      {/* Small notebook */}
      <mesh position={[0.15, 0.75, -0.1]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.08, 0.01, 0.12]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>

      {/* Pencil */}
      <mesh position={[0.2, 0.76, -0.15]} rotation={[0, 0, Math.PI/6]}>
        <cylinderGeometry args={[0.003, 0.003, 0.1]} />
        <meshStandardMaterial color="#ffd700" roughness={0.8} />
      </mesh>

      {/* Small evidence bag */}
      <mesh position={[-0.15, 0.75, 0.15]}>
        <boxGeometry args={[0.06, 0.001, 0.08]} />
        <meshStandardMaterial 
          color="#f5f5dc" 
          transparent 
          opacity={0.7} 
          roughness={0.9} 
        />
      </mesh>

      {/* Pocket watch */}
      <mesh position={[0, 0.75, 0.2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.01]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Watch chain */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`chain-${i}`} position={[
          i * 0.015,
          0.75,
          0.18 + (i * 0.01)
        ]}>
          <sphereGeometry args={[0.002]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};