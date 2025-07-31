import * as THREE from 'three';

// Complete Detective Office Room with wood paneling and bookshelves
export const OfficeRoom = () => {
  return (
    <group>
      {/* Hardwood Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8b4513" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Ornate Rug in center */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -2]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#8b0000" roughness={0.8} />
      </mesh>

      {/* Back Wall (North) - Dark wood paneling with window cutout - 10% shorter */}
      {/* Left section of back wall (narrow strip) */}
      <mesh position={[-8.8, 4.5, -10]}>
        <planeGeometry args={[2.4, 9]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>
      
      {/* Right section of back wall (narrow strip) */}
      <mesh position={[8.8, 4.5, -10]}>
        <planeGeometry args={[2.4, 9]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>
      
      {/* Top section above window (adjusted for lower ceiling) */}
      <mesh position={[0, 6.75, -10]}>
        <planeGeometry args={[15.6, 4.5]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>
      
      {/* Front Wall (South) - Wood paneling - 10% shorter */}
      <mesh position={[0, 4.5, 10]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[20, 9]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>
      
      {/* Left Wall (West) - Wood paneling - 10% shorter */}
      <mesh position={[-10, 4.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 9]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>
      
      {/* Right Wall (East) - Wood paneling - 10% shorter */}
      <mesh position={[10, 4.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 9]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>
      

      {/* Ceiling with wooden beams - 10% lower */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 9, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1006" roughness={0.8} />
      </mesh>
      
      {/* Wooden ceiling beams - 10% lower */}
      {[-6, -2, 2, 6].map((z, i) => (
        <mesh key={i} position={[0, 8.8, z]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.2, 20, 0.3]} />
          <meshStandardMaterial color="#654321" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
};