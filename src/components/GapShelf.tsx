interface GapShelfProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const GapShelf = ({ 
  position, 
  rotation = [0, 0, 0] 
}: GapShelfProps) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Main shelf surface */}
      <mesh position={[0, 0, -0.4]}>
        <boxGeometry args={[1.7, 0.08, 0.75]} />
        <meshStandardMaterial color="#8b4513" roughness={0.6} />
      </mesh>

      {/* Shelf support brackets */}
      <mesh position={[-0.7, -0.05, -0.4]}>
        <boxGeometry args={[0.15, 0.1, 0.1]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>
      <mesh position={[0.7, -0.05, -0.4]}>
        <boxGeometry args={[0.15, 0.1, 0.1]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>

      {/* Decorative items on the shelf */}
      
      {/* Ornate vase */}
      <mesh position={[-0.5, 0.15, -0.3]}>
        <cylinderGeometry args={[0.06, 0.04, 0.2]} />
        <meshStandardMaterial color="#8b4513" roughness={0.4} />
      </mesh>
      <mesh position={[-0.5, 0.25, -0.3]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#654321" roughness={0.3} />
      </mesh>

      {/* Small clock */}
      <mesh position={[0, 0.08, -0.2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.06]} />
        <meshStandardMaterial color="#2c1810" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.11, -0.15]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.1} />
      </mesh>
      {/* Clock hands */}
      <mesh position={[0, 0.12, -0.14]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.03, 0.002, 0.001]} />
        <meshStandardMaterial color="#2c1810" />
      </mesh>
      <mesh position={[0, 0.12, -0.14]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.04, 0.002, 0.001]} />
        <meshStandardMaterial color="#2c1810" />
      </mesh>

      {/* Small leather-bound book */}
      <mesh position={[0.4, 0.06, -0.3]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.12, 0.08, 0.02]} />
        <meshStandardMaterial color="#8b0000" roughness={0.8} />
      </mesh>

      {/* Magnifying glass */}
      <mesh position={[0.6, 0.05, -0.25]} rotation={[Math.PI / 2, 0, 0.5]}>
        <cylinderGeometry args={[0.001, 0.001, 0.1]} />
        <meshStandardMaterial color="#8b7355" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.55, 0.05, -0.2]} rotation={[Math.PI / 2, 0, 0.5]}>
        <torusGeometry args={[0.035, 0.005]} />
        <meshStandardMaterial color="#8b7355" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.55, 0.05, -0.2]} rotation={[Math.PI / 2, 0, 0.5]}>
        <circleGeometry args={[0.03]} />
        <meshStandardMaterial 
          color="#e6f3ff" 
          transparent 
          opacity={0.7} 
          roughness={0.1}
        />
      </mesh>

      {/* Small decorative box */}
      <mesh position={[-0.2, 0.04, -0.5]}>
        <boxGeometry args={[0.08, 0.05, 0.06]} />
        <meshStandardMaterial color="#4a3728" roughness={0.6} />
      </mesh>
      <mesh position={[-0.2, 0.065, -0.5]}>
        <boxGeometry args={[0.06, 0.01, 0.04]} />
        <meshStandardMaterial color="#8b7355" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  );
};