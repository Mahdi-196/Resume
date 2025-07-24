// Victorian Armchair
export const VictorianChair = ({ position, rotation = [0, 0, 0] }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number] 
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Seat */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Backrest */}
      <mesh position={[0, 1.2, -0.35]}>
        <boxGeometry args={[0.8, 1.4, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Legs */}
      {[[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.25, z]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
};