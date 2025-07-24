// Lighting Setup with functional desk lamp and detective vision
export const Lighting = ({ lampOn, detectiveVision }: { lampOn: boolean; detectiveVision: boolean }) => {
  const visionMultiplier = detectiveVision ? 20 : 1;
  
  return (
    <>
      {/* Ambient light - Very low when lamp is on, much brighter with detective vision */}
      <ambientLight intensity={(lampOn ? 0.05 : 0.2) * visionMultiplier} color="#ffd700" />
      
      {/* Main Desk lamp light - positioned at banker's lamp location */}
      <pointLight 
        position={[-1.5, 3, -3]} 
        intensity={(lampOn ? 12 : 0.5) * visionMultiplier}
        color="#ffd700"
        distance={30}  // Much larger distance to reach entire room
        decay={1}      // Less decay so light travels farther
      />
      
      {/* Secondary lamp light for even coverage */}
      <pointLight 
        position={[0, 6, -2]} 
        intensity={(lampOn ? 8 : 0) * visionMultiplier}
        color="#ffeb99"  // Slightly warmer tone
        distance={35}
        decay={1}
      />
      
      {/* Window light - Dimmer when lamp is on, brighter with detective vision */}
      <directionalLight 
        position={[10, 8, -5]} 
        intensity={(lampOn ? 0.1 : 0.3) * visionMultiplier}
        color="#87ceeb"
      />
      
      {/* Ceiling fill light - Only when lamp is off, enhanced with detective vision */}
      <pointLight 
        position={[0, 9, 0]} 
        intensity={(lampOn ? 0 : 0.4) * visionMultiplier}
        color="#ffd700"
        distance={20}
        decay={2}
      />
      
      {/* Additional detective vision lights for better visibility */}
      {detectiveVision && (
        <>
          <pointLight 
            position={[5, 5, 5]} 
            intensity={10}
            color="#ffffff"
            distance={40}
            decay={1}
          />
          <pointLight 
            position={[-5, 5, 5]} 
            intensity={10}
            color="#ffffff"
            distance={40}
            decay={1}
          />
        </>
      )}
    </>
  );
};