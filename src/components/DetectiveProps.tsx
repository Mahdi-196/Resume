// Detective Props Component - scattered papers, magnifying glass, pipe, etc.
export const DetectiveProps = ({ position, type }: { 
  position: [number, number, number]; 
  type: 'papers' | 'magnifying-glass' | 'pipe' | 'evidence-box' | 'newspaper' | 'violin-case' | 'pipe-rack' | 'case-files' | 'map'
}) => {
  switch (type) {
    case 'papers':
      return (
        <group position={position}>
          {/* Scattered papers */}
          {[...Array(6)].map((_, i) => (
            <mesh key={`paper-${i}`} position={[
              (Math.random() - 0.5) * 0.4,
              i * 0.005,
              (Math.random() - 0.5) * 0.4
            ]} rotation={[0, Math.random() * Math.PI, 0]}>
              <boxGeometry args={[0.15, 0.001, 0.2]} />
              <meshStandardMaterial color="#f5f5dc" roughness={0.9} />
            </mesh>
          ))}
          
          {/* Some papers with text */}
          {[...Array(3)].map((_, i) => (
            <mesh key={`text-paper-${i}`} position={[
              (Math.random() - 0.5) * 0.3,
              0.02 + i * 0.005,
              (Math.random() - 0.5) * 0.3
            ]} rotation={[0, Math.random() * Math.PI, 0]}>
              <boxGeometry args={[0.12, 0.001, 0.18]} />
              <meshStandardMaterial color="#fffff0" roughness={0.9} />
            </mesh>
          ))}
        </group>
      );

    case 'magnifying-glass':
      return (
        <group position={position} rotation={[0, Math.PI/4, 0.1]}>
          {/* Handle */}
          <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.2]} />
            <meshStandardMaterial color="#654321" roughness={0.8} />
          </mesh>
          
          {/* Lens rim */}
          <mesh position={[0, 0, -0.05]}>
            <torusGeometry args={[0.06, 0.005]} />
            <meshStandardMaterial color="#8b7355" metalness={0.7} roughness={0.3} />
          </mesh>
          
          {/* Glass lens */}
          <mesh position={[0, 0, -0.05]}>
            <cylinderGeometry args={[0.055, 0.055, 0.002]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.3} 
              metalness={0.1} 
              roughness={0.1} 
            />
          </mesh>
        </group>
      );

    case 'pipe':
      return (
        <group position={position} rotation={[0, 0, 0.3]}>
          {/* Pipe stem */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.15]} />
            <meshStandardMaterial color="#8b4513" roughness={0.9} />
          </mesh>
          
          {/* Pipe bowl */}
          <mesh position={[0, 0.08, 0]}>
            <sphereGeometry args={[0.025]} />
            <meshStandardMaterial color="#654321" roughness={0.9} />
          </mesh>
          
          {/* Bowl opening */}
          <mesh position={[0, 0.085, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.01]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>
      );

    case 'evidence-box':
      return (
        <group position={position}>
          {/* Box */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.25, 0.1, 0.15]} />
            <meshStandardMaterial color="#8b4513" roughness={0.8} />
          </mesh>
          
          {/* Box lid (slightly open) */}
          <mesh position={[0, 0.12, -0.02]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[0.24, 0.02, 0.14]} />
            <meshStandardMaterial color="#654321" roughness={0.8} />
          </mesh>
          
          {/* Evidence tags */}
          {[...Array(3)].map((_, i) => (
            <mesh key={`tag-${i}`} position={[
              -0.08 + (i * 0.08),
              0.11,
              0.02
            ]}>
              <boxGeometry args={[0.04, 0.01, 0.03]} />
              <meshStandardMaterial color="#f5f5dc" roughness={0.9} />
            </mesh>
          ))}
        </group>
      );

    case 'newspaper':
      return (
        <group position={position}>
          {/* Folded newspaper */}
          <mesh position={[0, 0.01, 0]} rotation={[0, 0.3, 0]}>
            <boxGeometry args={[0.25, 0.02, 0.35]} />
            <meshStandardMaterial color="#f5f5dc" roughness={0.9} />
          </mesh>
          
          {/* Headline area */}
          <mesh position={[0, 0.025, 0]} rotation={[0, 0.3, 0]}>
            <boxGeometry args={[0.24, 0.001, 0.08]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          
          {/* Text columns */}
          {[...Array(3)].map((_, i) => (
            <mesh key={`column-${i}`} position={[
              -0.06 + (i * 0.06),
              0.022,
              0.05
            ]} rotation={[0, 0.3, 0]}>
              <boxGeometry args={[0.04, 0.001, 0.15]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
          ))}
        </group>
      );

    case 'violin-case':
      return (
        <group position={position} rotation={[0, 0.5, 0]}>
          {/* Violin case */}
          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[0.6, 0.06, 0.2]} />
            <meshStandardMaterial color="#2a1810" roughness={0.8} />
          </mesh>
          
          {/* Case latches */}
          <mesh position={[0.2, 0.07, 0]}>
            <boxGeometry args={[0.02, 0.01, 0.03]} />
            <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[-0.2, 0.07, 0]}>
            <boxGeometry args={[0.02, 0.01, 0.03]} />
            <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Handle */}
          <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.04, 0.008]} />
            <meshStandardMaterial color="#654321" roughness={0.7} />
          </mesh>
        </group>
      );

    case 'pipe-rack':
      return (
        <group position={position}>
          {/* Wooden base */}
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.25, 0.04, 0.08]} />
            <meshStandardMaterial color="#654321" roughness={0.8} />
          </mesh>
          
          {/* Pipe holders */}
          {[...Array(4)].map((_, i) => (
            <mesh key={`holder-${i}`} position={[-0.08 + (i * 0.055), 0.06, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 0.04]} />
              <meshStandardMaterial color="#654321" roughness={0.8} />
            </mesh>
          ))}
          
          {/* Pipes in holders */}
          {[...Array(3)].map((_, i) => (
            <group key={`pipe-${i}`} position={[-0.08 + (i * 0.055), 0.08, 0]}>
              <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 0.08]} />
                <meshStandardMaterial color="#8b4513" roughness={0.9} />
              </mesh>
              <mesh position={[0, 0, 0.04]}>
                <sphereGeometry args={[0.012]} />
                <meshStandardMaterial color="#654321" roughness={0.9} />
              </mesh>
            </group>
          ))}
        </group>
      );

    case 'case-files':
      return (
        <group position={position}>
          {/* Stack of case files */}
          {[...Array(5)].map((_, i) => (
            <mesh key={`file-${i}`} position={[
              (Math.random() - 0.5) * 0.02,
              i * 0.008,
              (Math.random() - 0.5) * 0.02
            ]} rotation={[0, Math.random() * 0.2, 0]}>
              <boxGeometry args={[0.2, 0.005, 0.28]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#8b7355" : "#654321"} roughness={0.8} />
            </mesh>
          ))}
          
          {/* File tabs */}
          {[...Array(3)].map((_, i) => (
            <mesh key={`tab-${i}`} position={[
              0.08,
              0.04,
              -0.08 + (i * 0.08)
            ]}>
              <boxGeometry args={[0.03, 0.015, 0.04]} />
              <meshStandardMaterial color="#f5f5dc" />
            </mesh>
          ))}
        </group>
      );

    case 'map':
      return (
        <group position={position} rotation={[0, 0.3, 0]}>
          {/* Map */}
          <mesh position={[0, 0.001, 0]}>
            <boxGeometry args={[0.4, 0.001, 0.3]} />
            <meshStandardMaterial color="#f5f5dc" roughness={0.9} />
          </mesh>
          
          {/* Map details - streets */}
          {[...Array(8)].map((_, i) => (
            <mesh key={`street-${i}`} position={[
              -0.15 + (i * 0.04),
              0.002,
              -0.1 + (Math.random() * 0.2)
            ]} rotation={[0, Math.random() * Math.PI, 0]}>
              <boxGeometry args={[0.002, 0.001, 0.08]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
          ))}
          
          {/* Push pins */}
          {[...Array(3)].map((_, i) => (
            <mesh key={`pin-${i}`} position={[
              -0.1 + (Math.random() * 0.2),
              0.008,
              -0.08 + (Math.random() * 0.16)
            ]}>
              <sphereGeometry args={[0.003]} />
              <meshStandardMaterial color="#dc143c" />
            </mesh>
          ))}
        </group>
      );

    default:
      return null;
  }
};