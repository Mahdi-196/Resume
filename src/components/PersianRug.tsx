// Persian Rug patterns
export const PersianRug = ({ position, size }: { 
  position: [number, number, number]; 
  size: [number, number] 
}) => {
  return (
    <group position={position}>
      {/* Main rug base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="#800020" roughness={0.9} />
      </mesh>
      
      {/* Pattern details - outer border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <planeGeometry args={[size[0] * 0.9, size[1] * 0.9]} />
        <meshStandardMaterial color="#b8860b" roughness={0.9} />
      </mesh>
      
      {/* Inner pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.007, 0]}>
        <planeGeometry args={[size[0] * 0.7, size[1] * 0.7]} />
        <meshStandardMaterial color="#8b0000" roughness={0.9} />
      </mesh>

      {/* Center medallion */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]}>
        <planeGeometry args={[size[0] * 0.4, size[1] * 0.4]} />
        <meshStandardMaterial color="#b8860b" roughness={0.9} />
      </mesh>

      {/* Center design */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.009, 0]}>
        <planeGeometry args={[size[0] * 0.2, size[1] * 0.2]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>


    </group>
  );
};