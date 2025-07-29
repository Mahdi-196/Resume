interface ChandelierOptionProps {
  position: [number, number, number];
  isLit?: boolean;
  onSelect?: () => void;
  label: string;
}

// Option 1: Classic Victorian Crystal Chandelier
export const VictorianCrystalChandelier = ({ position, isLit = true, onSelect, label }: ChandelierOptionProps) => {
  return (
    <group position={position} onClick={onSelect}>
      {/* Label */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.02]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Main body - ornate crystal design */}
      <group position={[0, -1, 0]}>
        {/* Central brass frame */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Three tiers of arms */}
        {[0.3, 0, -0.3].map((yPos, tier) => (
          <group key={tier} position={[0, yPos, 0]}>
            {[0, Math.PI/2, Math.PI, 3*Math.PI/2].map((angle, i) => (
              <group key={i} rotation={[0, angle, 0]}>
                <mesh position={[0.4, 0, 0]}>
                  <cylinderGeometry args={[0.01, 0.01, 0.2]} />
                  <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Candle */}
                <mesh position={[0.5, 0.1, 0]}>
                  <cylinderGeometry args={[0.01, 0.01, 0.08]} />
                  <meshStandardMaterial color="#fffacd" />
                </mesh>
                {/* Crystal drops */}
                <mesh position={[0.45, -0.1, 0]}>
                  <octahedronGeometry args={[0.02]} />
                  <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
                </mesh>
              </group>
            ))}
          </group>
        ))}

        {/* Central crystal */}
        <mesh position={[0, -0.6, 0]}>
          <octahedronGeometry args={[0.05]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>

        {isLit && (
          <pointLight position={[0, -0.5, 0]} color="#ffcc77" intensity={0.8} distance={8} />
        )}
      </group>
    </group>
  );
};

// Option 2: Simple Brass Gas Chandelier
export const BrassGasChandelier = ({ position, isLit = true, onSelect, label }: ChandelierOptionProps) => {
  return (
    <group position={position} onClick={onSelect}>
      {/* Label */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.02]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      <group position={[0, -0.8, 0]}>
        {/* Central hub */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* 6 gas lamp arms */}
        {[0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            {/* Curved arm */}
            <mesh position={[0.25, -0.05, 0]} rotation={[0, 0, Math.PI/8]}>
              <cylinderGeometry args={[0.015, 0.015, 0.35]} />
              <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Gas shade */}
            <mesh position={[0.4, 0.1, 0]}>
              <coneGeometry args={[0.06, 0.12, 8]} />
              <meshStandardMaterial color="#f5f5dc" transparent opacity={0.7} />
            </mesh>

            {/* Flame */}
            {isLit && (
              <mesh position={[0.4, 0.15, 0]}>
                <coneGeometry args={[0.01, 0.03]} />
                <meshBasicMaterial color="#ff6b00" />
              </mesh>
            )}
          </group>
        ))}

        {isLit && (
          <pointLight position={[0, 0, 0]} color="#ff8844" intensity={0.6} distance={6} />
        )}
      </group>
    </group>
  );
};

// Option 3: Wrought Iron Medieval Style
export const WroughtIronChandelier = ({ position, isLit = true, onSelect, label }: ChandelierOptionProps) => {
  return (
    <group position={position} onClick={onSelect}>
      {/* Label */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.02]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      <group position={[0, -0.9, 0]}>
        {/* Iron ring */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.4, 0.02]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Hanging chains */}
        {[0, Math.PI/2, Math.PI, 3*Math.PI/2].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            {/* Chain links */}
            {[0, -0.1, -0.2].map((y, j) => (
              <mesh key={j} position={[0.4, y, 0]} rotation={[Math.PI/2, 0, j % 2 * Math.PI/2]}>
                <torusGeometry args={[0.01, 0.003]} />
                <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
              </mesh>
            ))}
            
            {/* Candle holder */}
            <mesh position={[0.4, -0.25, 0]}>
              <cylinderGeometry args={[0.02, 0.015, 0.06]} />
              <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
            </mesh>

            {/* Candle */}
            <mesh position={[0.4, -0.15, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.1]} />
              <meshStandardMaterial color="#fffacd" />
            </mesh>

            {/* Flame */}
            {isLit && (
              <mesh position={[0.4, -0.1, 0]}>
                <coneGeometry args={[0.008, 0.03]} />
                <meshBasicMaterial color="#ff6b00" />
              </mesh>
            )}
          </group>
        ))}

        {isLit && (
          <pointLight position={[0, -0.2, 0]} color="#ffaa44" intensity={0.5} distance={5} />
        )}
      </group>
    </group>
  );
};

// Option 4: Art Deco Modern Chandelier
export const ArtDecoChandelier = ({ position, isLit = true, onSelect, label }: ChandelierOptionProps) => {
  return (
    <group position={position} onClick={onSelect}>
      {/* Label */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.02]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      <group position={[0, -0.7, 0]}>
        {/* Geometric brass structure */}
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.15]} />
          <meshStandardMaterial color="#b8860b" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Frosted glass panels */}
        {[0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh position={[0.25, 0, 0]} rotation={[0, 0, Math.PI/4]}>
              <boxGeometry args={[0.15, 0.25, 0.02]} />
              <meshStandardMaterial color="#f0f8ff" transparent opacity={0.6} />
            </mesh>
          </group>
        ))}

        {/* Central light diffuser */}
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.12]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>

        {isLit && (
          <pointLight position={[0, 0, 0]} color="#ffffff" intensity={1.2} distance={10} />
        )}
      </group>
    </group>
  );
};

// Option 5: Ornate Rococo Style
export const RococoChandelier = ({ position, isLit = true, onSelect, label }: ChandelierOptionProps) => {
  return (
    <group position={position} onClick={onSelect}>
      {/* Label */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.02]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      <group position={[0, -1, 0]}>
        {/* Ornate central column */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.12, 0.8]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Decorative swirls */}
        {[0.2, 0, -0.2].map((y, tier) => (
          <group key={tier} position={[0, y, 0]}>
            {[0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4].map((angle, i) => (
              <group key={i} rotation={[0, angle, 0]}>
                {/* Curved decorative arm */}
                <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI/6]}>
                  <torusGeometry args={[0.08, 0.008]} />
                  <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
                </mesh>
                
                {/* Small crystal */}
                <mesh position={[0.28, 0.05, 0]}>
                  <octahedronGeometry args={[0.015]} />
                  <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
                </mesh>
              </group>
            ))}
          </group>
        ))}

        {/* Large central crystal */}
        <mesh position={[0, -0.5, 0]}>
          <octahedronGeometry args={[0.08]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.95} />
        </mesh>

        {isLit && (
          <>
            <pointLight position={[0, 0, 0]} color="#fff8dc" intensity={0.9} distance={8} />
            <pointLight position={[0, -0.5, 0]} color="#fff8dc" intensity={0.4} distance={4} />
          </>
        )}
      </group>
    </group>
  );
};