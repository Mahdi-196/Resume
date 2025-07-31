import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CareerTimelineProps {
  position: [number, number, number];
  isActive: boolean;
  onClick: () => void;
  onInteraction: (type: string, data?: unknown) => void;
}

interface CareerEvent {
  id: string;
  title: string;
  company: string;
  period: string;
  type: 'job' | 'project' | 'certification' | 'achievement';
  description: string;
  technologies: string[];
}

const careerEvents: CareerEvent[] = [
  {
    id: 'start',
    title: 'Junior Developer',
    company: 'StartUp Innovations',
    period: '2019-2020',
    type: 'job',
    description: 'First case - learned the ropes of web development',
    technologies: ['JavaScript', 'React', 'Node.js']
  },
  {
    id: 'aws-cert',
    title: 'AWS Certified',
    company: 'Amazon Web Services',
    period: '2020',
    type: 'certification',
    description: 'Earned AWS Solutions Architect certification',
    technologies: ['AWS', 'Cloud Architecture']
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    company: 'Digital Agency Pro',
    period: '2020-2022',
    type: 'job',
    description: 'Solved complex web application mysteries',
    technologies: ['React', 'TypeScript', 'Python', 'PostgreSQL']
  },
  {
    id: 'ecommerce-project',
    title: 'E-commerce Platform',
    company: 'Major Retail Client',
    period: '2021',
    type: 'project',
    description: 'Built scalable platform handling 100k+ users',
    technologies: ['Next.js', 'AWS', 'Microservices']
  },
  {
    id: 'senior',
    title: 'Senior Software Engineer',
    company: 'TechCorp Solutions',
    period: '2022-Present',
    type: 'job',
    description: 'Leading complex investigations and mentoring junior detectives',
    technologies: ['AWS', 'Kubernetes', 'React', 'Python']
  },
  {
    id: 'achievement',
    title: 'Team Lead',
    company: 'TechCorp Solutions',
    period: '2023',
    type: 'achievement',
    description: 'Promoted to lead a team of 5 developers',
    technologies: ['Leadership', 'Architecture', 'Mentoring']
  }
];

export const CareerTimeline = ({ position, isActive, onClick, onInteraction }: CareerTimelineProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.02);
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(1);
    }
  });

  const handleEventClick = (eventId: string, event: any) => {
    event.stopPropagation();
    setSelectedEvent(selectedEvent === eventId ? null : eventId);
    onInteraction('career-event-clicked', eventId);
  };

  const getEventColor = (type: string): string => {
    switch (type) {
      case 'job': return "#2196F3";
      case 'project': return "#4CAF50";
      case 'certification': return "#FF9800";
      case 'achievement': return "#9C27B0";
      default: return "#654321";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'job':
        return (
          <mesh>
            <boxGeometry args={[0.08, 0.08, 0.02]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        );
      case 'project':
        return (
          <mesh>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        );
      case 'certification':
        return (
          <mesh>
            <cylinderGeometry args={[0.05, 0.05, 0.02]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        );
      case 'achievement':
        return (
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.06, 0.06, 0.02]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        );
      default:
        return null;
    }
  };

  const renderTimelineEvent = (event: CareerEvent, position: [number, number, number], index: number) => {
    const isHovered = hoveredEvent === event.id;
    const isSelected = selectedEvent === event.id;
    const eventColor = getEventColor(event.type);
    
    return (
      <group key={event.id} position={position}>
        {/* Event Marker */}
        <mesh
          onClick={(e) => handleEventClick(event.id, e)}
          onPointerOver={() => {
            setHoveredEvent(event.id);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredEvent(null);
            document.body.style.cursor = 'zoom-in';
          }}
        >
          <cylinderGeometry args={[0.08, 0.08, 0.05]} />
          <meshStandardMaterial 
            color={isHovered || isSelected ? eventColor : "#654321"} 
            emissive={isHovered || isSelected ? eventColor : "#000000"}
            emissiveIntensity={isHovered || isSelected ? 0.3 : 0}
          />
        </mesh>

        {/* Event Icon */}
        <group position={[0, 0, 0.03]}>
          {getEventIcon(event.type)}
        </group>

        {/* Event Info Card - Always visible but highlighted when hovered/selected */}
        <group position={[0, 0.3, 0.02]}>
          <mesh>
            <planeGeometry args={[1.8, 0.8]} />
            <meshStandardMaterial 
              color={isHovered || isSelected ? "#F5F5DC" : "#E5E5D0"} 
              emissive={isHovered || isSelected ? eventColor : "#000000"}
              emissiveIntensity={isHovered || isSelected ? 0.1 : 0}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Title */}
          <mesh position={[0, 0.25, 0.01]}>
            <planeGeometry args={[1.6, 0.15]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>

          {/* Company */}
          <mesh position={[0, 0.1, 0.01]}>
            <planeGeometry args={[1.6, 0.12]} />
            <meshStandardMaterial color="#654321" />
          </mesh>

          {/* Period */}
          <mesh position={[0, -0.1, 0.01]}>
            <planeGeometry args={[1, 0.1]} />
            <meshStandardMaterial color={eventColor} />
          </mesh>

          {/* Tech Stack Indicators */}
          <group position={[0, -0.25, 0.01]}>
            {event.technologies.slice(0, 3).map((tech, i) => (
              <mesh key={`tech-${i}`} position={[i * 0.4 - 0.4, 0, 0]}>
                <boxGeometry args={[0.12, 0.08, 0.01]} />
                <meshStandardMaterial 
                  color={eventColor} 
                  emissive={eventColor}
                  emissiveIntensity={0.2}
                />
              </mesh>
            ))}
          </group>
        </group>

        {/* Detailed Info - Only when selected */}
        {isSelected && (
          <group position={[0, -0.6, 0.03]}>
            <mesh>
              <planeGeometry args={[2.2, 0.6]} />
              <meshStandardMaterial 
                color="#F5F5DC" 
                emissive={eventColor}
                emissiveIntensity={0.1}
              />
            </mesh>
            
            {/* Description */}
            <mesh position={[0, 0.1, 0.01]}>
              <planeGeometry args={[2, 0.15]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* All Technologies */}
            <group position={[0, -0.15, 0.01]}>
              {event.technologies.map((tech, i) => (
                <mesh key={`detail-tech-${i}`} position={[
                  (i % 4) * 0.5 - 0.75, 
                  Math.floor(i / 4) * -0.15, 
                  0
                ]}>
                  <planeGeometry args={[0.4, 0.1]} />
                  <meshStandardMaterial color={eventColor} />
                </mesh>
              ))}
            </group>
          </group>
        )}

        {/* Connection to timeline */}
        <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>
    );
  };

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Section Background */}
      <mesh>
        <planeGeometry args={[12, 2]} />
        <meshStandardMaterial 
          color={isActive ? "#F5F5DC" : "#E5E5D0"} 
          emissive={isActive ? "#b8860b" : "#000000"}
          emissiveIntensity={isActive ? 0.1 : 0}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Timeline Thread (Main Line) */}
      <mesh position={[0, -0.1, 0.01]}>
        <cylinderGeometry args={[0.01, 0.01, 10]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Section Title */}
      <mesh position={[0, 0.8, 0.01]}>
        <planeGeometry args={[3, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Investigation History Subtitle */}
      <mesh position={[0, 0.5, 0.01]}>
        <planeGeometry args={[4, 0.2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Timeline Events */}
      <group position={[0, 0, 0.02]}>
        {careerEvents.map((event, index) => {
          const xPos = (index - (careerEvents.length - 1) / 2) * 2;
          return renderTimelineEvent(event, [xPos, 0, 0], index);
        })}
      </group>

      {/* Timeline Endpoints */}
      <mesh position={[-5, -0.1, 0.02]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial 
          color="#4CAF50" 
          emissive="#4CAF50"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[5, -0.1, 0.02]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial 
          color="#2196F3" 
          emissive="#2196F3"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Legend */}
      <group position={[0, -0.8, 0.02]}>
        <mesh>
          <planeGeometry args={[8, 0.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[7.8, 0.35]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        
        {/* Legend Items */}
        <group position={[0, 0, 0.02]}>
          {[
            { type: 'job', label: 'Position' },
            { type: 'project', label: 'Project' },
            { type: 'certification', label: 'Certification' },
            { type: 'achievement', label: 'Achievement' }
          ].map((item, i) => (
            <group key={`legend-${i}`} position={[i * 2 - 3, 0, 0]}>
              <mesh>
                <cylinderGeometry args={[0.04, 0.04, 0.02]} />
                <meshStandardMaterial color={getEventColor(item.type)} />
              </mesh>
              <mesh position={[0, -0.1, 0]}>
                <planeGeometry args={[1.2, 0.08]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* Section border when active */}
      {isActive && (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[12.2, 2.2]} />
          <meshStandardMaterial 
            color="#b8860b" 
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Detective elements */}
      {/* Evidence tags */}
      <mesh position={[-5.5, 0.5, 0.03]}>
        <planeGeometry args={[0.8, 0.3]} />
        <meshStandardMaterial 
          color="#FFD700" 
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh position={[5.5, 0.5, 0.03]}>
        <planeGeometry args={[0.8, 0.3]} />
        <meshStandardMaterial 
          color="#FFD700" 
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Push pins at timeline ends */}
      <mesh position={[-5.8, 0.8, 0.05]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>
      <mesh position={[5.8, 0.8, 0.05]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>
    </group>
  );
};