interface VictorianChandelierProps {
  position: [number, number, number];
  isLit?: boolean;
}

export const VictorianChandelier = ({ 
  position, 
  isLit = true 
}: VictorianChandelierProps) => {
  return (
    <group position={position}>
      {/* Main chandelier body */}
      <group position={[0, -0.5, 0]}>
        {/* Central brass column - 1.5x original size */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.225, 0.225, 1.8]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Ornate top cap - 1.5x original size */}
        <mesh position={[0, 1.05, 0]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Decorative ring - 1.5x original size */}
        <mesh position={[0, 0.3, 0]}>
          <torusGeometry args={[0.375, 0.06]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Bottom ornamental piece - 1.5x original size */}
        <mesh position={[0, -1.2, 0]}>
          <coneGeometry args={[0.18, 0.45]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Arms extending outward for candles - 1.5x original size */}
        {[0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            {/* Curved arm - 1.5x original size */}
            <mesh position={[0.75, -0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
              <cylinderGeometry args={[0.045, 0.045, 0.9]} />
              <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Candle holder - 1.5x original size */}
            <mesh position={[1.2, 0.15, 0]}>
              <cylinderGeometry args={[0.075, 0.06, 0.24]} />
              <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Candle - 1.5x original size */}
            <mesh position={[1.2, 0.45, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.36]} />
              <meshStandardMaterial color="#fffacd" roughness={0.6} />
            </mesh>

            {/* Flame (when lit) - 1.5x original size */}
            {isLit && (
              <mesh position={[1.2, 0.69, 0]}>
                <coneGeometry args={[0.024, 0.12]} />
                <meshBasicMaterial color="#ff6b00" />
              </mesh>
            )}

            {/* Wax drips - 1.5x original size */}
            <mesh position={[1.2, 0.27, 0]}>
              <coneGeometry args={[0.015, 0.06]} />
              <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
            </mesh>

            {/* Crystal drops - 1.5x original size */}
            <mesh position={[1.05, -0.15, 0]}>
              <octahedronGeometry args={[0.06]} />
              <meshStandardMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.9} 
                roughness={0.1}
                metalness={0.1}
              />
            </mesh>

            <mesh position={[1.35, -0.09, 0]}>
              <octahedronGeometry args={[0.045]} />
              <meshStandardMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.9} 
                roughness={0.1}
                metalness={0.1}
              />
            </mesh>
          </group>
        ))}

        {/* Hanging crystal strands - 1.5x original size */}
        {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4].map((angle, i) => (
          <group key={`crystal-${i}`} rotation={[0, angle, 0]}>
            {/* Crystal strand - 1.5x original size */}
            {[0, -0.24, -0.48, -0.72].map((yOffset, j) => (
              <mesh key={j} position={[0.36, yOffset - 0.6, 0]}>
                <octahedronGeometry args={[0.024 + j * 0.006]} />
                <meshStandardMaterial 
                  color="#ffffff" 
                  transparent 
                  opacity={0.8} 
                  roughness={0.1}
                  metalness={0.1}
                />
              </mesh>
            ))}
          </group>
        ))}

        {/* Central hanging crystal - 1.5x original size */}
        <mesh position={[0, -1.8, 0]}>
          <octahedronGeometry args={[0.12]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.9} 
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* Ceiling chain/mounting - 1.5x original size */}
      <group position={[0, 3.75, 0]}>
        {/* Extended chain links - 1.5x original size */}
        {[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2, 1.35, 1.5, 1.65, 1.8, 1.95, 2.1, 2.25].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, i % 2 * Math.PI / 2]}>
            <torusGeometry args={[0.045, 0.012]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* Ceiling mounting plate - 1.5x original size */}
        <mesh position={[0, 2.4, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.06]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Decorative ceiling medallion - 1.5x original size */}
        <mesh position={[0, 2.475, 0]}>
          <cylinderGeometry args={[0.225, 0.225, 0.03]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Ornate ceiling details - 1.5x original size */}
        <mesh position={[0, 2.505, 0]}>
          <torusGeometry args={[0.18, 0.0225]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Point lights for illumination when lit - 1.5x original coverage */}
      {isLit && (
        <>
          {[0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3].map((angle, i) => (
            <pointLight
              key={`light-${i}`}
              position={[Math.cos(angle) * 1.2, -1.35, Math.sin(angle) * 1.2]}
              color="#ffcc77"
              intensity={0.9}
              distance={9}
              decay={2}
            />
          ))}
          
          {/* Central ambient light - 1.5x original */}
          <pointLight
            position={[0, -2.4, 0]}
            color="#ffcc77"
            intensity={1.5}
            distance={15}
            decay={2}
          />
        </>
      )}
    </group>
  );
};