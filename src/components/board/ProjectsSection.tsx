import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProjectsSectionProps {
  position: [number, number, number];
  isActive: boolean;
  onClick: () => void;
  onInteraction: (type: string, data?: unknown) => void;
}

interface Project {
  id: string;
  name: string;
  status: 'SOLVED' | 'ACTIVE' | 'ARCHIVED';
  techStack: string[];
  type: 'web' | 'mobile' | 'api' | 'ml';
  priority: 'high' | 'medium' | 'low';
}

const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    name: 'E-commerce Platform',
    status: 'SOLVED',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    type: 'web',
    priority: 'high'
  },
  {
    id: 'real-time-chat',
    name: 'Real-time Chat App',
    status: 'SOLVED',
    techStack: ['Socket.io', 'React', 'MongoDB', 'Redis'],
    type: 'web',
    priority: 'high'
  },
  {
    id: 'serverless-api',
    name: 'Serverless API',
    status: 'SOLVED',
    techStack: ['Lambda', 'API Gateway', 'DynamoDB'],
    type: 'api',
    priority: 'medium'
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    status: 'ACTIVE',
    techStack: ['D3.js', 'Python', 'Elasticsearch'],
    type: 'web',
    priority: 'high'
  },
  {
    id: 'mobile-trading',
    name: 'Mobile Trading App',
    status: 'SOLVED',
    techStack: ['React Native', 'GraphQL', 'AWS'],
    type: 'mobile',
    priority: 'medium'
  },
  {
    id: 'ml-recommender',
    name: 'ML Recommender',
    status: 'ARCHIVED',
    techStack: ['Python', 'TensorFlow', 'AWS SageMaker'],
    type: 'ml',
    priority: 'low'
  }
];

export const ProjectsSection = ({ position, isActive, onClick, onInteraction }: ProjectsSectionProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.02);
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(1);
    }
  });

  const handleProjectClick = (projectId: string, event: any) => {
    event.stopPropagation();
    setExpandedProject(expandedProject === projectId ? null : projectId);
    onInteraction('project-clicked', projectId);
  };

  const handleGitHubClick = (projectId: string, event: any) => {
    event.stopPropagation();
    window.open(`https://github.com/mahdighaleb/${projectId}`, '_blank');
    onInteraction('github-link-clicked', projectId);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'SOLVED': return "#4CAF50";
      case 'ACTIVE': return "#FF9800";
      case 'ARCHIVED': return "#9E9E9E";
      default: return "#654321";
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'web': return "#2196F3";
      case 'mobile': return "#E91E63";
      case 'api': return "#9C27B0";
      case 'ml': return "#FF5722";
      default: return "#654321";
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return "#F44336";
      case 'medium': return "#FF9800";
      case 'low': return "#4CAF50";
      default: return "#654321";
    }
  };

  const renderProjectCard = (project: Project, position: [number, number, number], index: number) => {
    const isHovered = hoveredProject === project.id;
    const isExpanded = expandedProject === project.id;
    
    return (
      <group key={project.id} position={position}>
        {/* Case File Folder */}
        <mesh
          onClick={(e) => handleProjectClick(project.id, e)}
          onPointerOver={() => {
            setHoveredProject(project.id);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredProject(null);
            document.body.style.cursor = 'zoom-in';
          }}
        >
          <planeGeometry args={[1.6, 1.2]} />
          <meshStandardMaterial 
            color={isHovered ? "#D2B48C" : "#8B7355"} 
            emissive={isHovered ? "#b8860b" : "#000000"}
            emissiveIntensity={isHovered ? 0.2 : 0}
          />
        </mesh>

        {/* File Tab */}
        <mesh position={[0.6, 0.5, 0.01]}>
          <planeGeometry args={[0.4, 0.3]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* Project Name Label */}
        <mesh position={[0, 0.3, 0.02]}>
          <planeGeometry args={[1.4, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Status Stamp */}
        <group position={[0.5, -0.2, 0.02]} rotation={[0, 0, 0.3]}>
          <mesh>
            <planeGeometry args={[0.6, 0.3]} />
            <meshStandardMaterial 
              color={getStatusColor(project.status)} 
              emissive={getStatusColor(project.status)}
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.5, 0.2]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* Screenshot Preview */}
        <mesh position={[-0.3, 0, 0.02]}>
          <planeGeometry args={[0.8, 0.6]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            emissive={getTypeColor(project.type)}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Screenshot frame */}
        <mesh position={[-0.3, 0, 0.01]}>
          <planeGeometry args={[0.85, 0.65]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* Tech Stack Icons */}
        <group position={[0, -0.4, 0.02]}>
          {project.techStack.slice(0, 4).map((tech, i) => (
            <mesh key={`tech-${i}`} position={[i * 0.3 - 0.45, 0, 0]}>
              <boxGeometry args={[0.15, 0.15, 0.02]} />
              <meshStandardMaterial 
                color={getTypeColor(project.type)} 
                emissive={getTypeColor(project.type)}
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}
        </group>

        {/* Priority Indicator */}
        <mesh position={[-0.6, 0.4, 0.03]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial 
            color={getPriorityColor(project.priority)} 
            emissive={getPriorityColor(project.priority)}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* GitHub Link */}
        <group 
          position={[0.3, 0.4, 0.03]}
          onClick={(e) => handleGitHubClick(project.id, e)}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'zoom-in'; }}
        >
          <mesh>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial 
              color={isHovered ? "#333333" : "#1a1a1a"} 
              emissive={isHovered ? "#333333" : "#000000"}
              emissiveIntensity={isHovered ? 0.3 : 0}
            />
          </mesh>
        </group>

        {/* Expanded Details */}
        {isExpanded && (
          <group position={[0, -0.8, 0.04]}>
            <mesh>
              <planeGeometry args={[1.8, 0.6]} />
              <meshStandardMaterial 
                color="#F5F5DC" 
                emissive="#b8860b"
                emissiveIntensity={0.1}
              />
            </mesh>
            
            {/* Tech Stack List */}
            {project.techStack.map((tech, i) => (
              <mesh key={`expanded-tech-${i}`} position={[0, 0.2 - i * 0.15, 0.01]}>
                <planeGeometry args={[1.6, 0.1]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
            ))}
          </group>
        )}

        {/* Paper clips */}
        {[[-0.7, 0.5], [0.7, -0.5]].map((pos, i) => (
          <mesh key={`clip-${i}`} position={[pos[0], pos[1], 0.04]}>
            <torusGeometry args={[0.03, 0.008]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} />
          </mesh>
        ))}
      </group>
    );
  };

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Section Background */}
      <mesh>
        <planeGeometry args={[4, 5]} />
        <meshStandardMaterial 
          color={isActive ? "#F5F5DC" : "#E5E5D0"} 
          emissive={isActive ? "#b8860b" : "#000000"}
          emissiveIntensity={isActive ? 0.1 : 0}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Section Title */}
      <mesh position={[0, 2.3, 0.01]}>
        <planeGeometry args={[2.5, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Case Files Title */}
      <mesh position={[0, 2, 0.01]}>
        <planeGeometry args={[3, 0.2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Projects Grid */}
      <group position={[0, 0.3, 0.02]}>
        {projects.map((project, index) => {
          const row = Math.floor(index / 2);
          const col = index % 2;
          const xPos = col * 2 - 1;
          const yPos = 1.2 - row * 1.4;
          
          return renderProjectCard(project, [xPos, yPos, 0], index);
        })}
      </group>

      {/* Statistics */}
      <group position={[0, -2.2, 0.02]}>
        <mesh>
          <planeGeometry args={[3.5, 0.5]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[3.3, 0.4]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        
        {/* Stats */}
        <group position={[0, 0, 0.02]}>
          {[
            { label: 'Solved', count: projects.filter(p => p.status === 'SOLVED').length, color: '#4CAF50' },
            { label: 'Active', count: projects.filter(p => p.status === 'ACTIVE').length, color: '#FF9800' },
            { label: 'Total', count: projects.length, color: '#2196F3' }
          ].map((stat, i) => (
            <group key={`stat-${i}`} position={[i * 1.2 - 1.2, 0, 0]}>
              <mesh>
                <planeGeometry args={[0.3, 0.2]} />
                <meshStandardMaterial 
                  color={stat.color} 
                  emissive={stat.color}
                  emissiveIntensity={0.2}
                />
              </mesh>
              <mesh position={[0, -0.15, 0]}>
                <planeGeometry args={[0.8, 0.1]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* Detective Evidence Tools */}
      {/* Evidence bag */}
      <group position={[-1.5, 2, 0.03]}>
        <mesh>
          <planeGeometry args={[0.3, 0.4]} />
          <meshStandardMaterial 
            color="#87CEEB" 
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh position={[0, 0.15, 0.01]}>
          <planeGeometry args={[0.25, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      {/* Investigation strings */}
      <group>
        {[
          [[-1, 1.5, 0.01], [1, 0.5, 0.01]],
          [[-1, 0.1, 0.01], [1, -0.9, 0.01]]
        ].map((line, i) => {
          const [start, end] = line;
          const midpoint = [
            (start[0] + end[0]) / 2,
            (start[1] + end[1]) / 2,
            (start[2] + end[2]) / 2
          ];
          const distance = Math.sqrt(
            Math.pow(end[0] - start[0], 2) + 
            Math.pow(end[1] - start[1], 2) + 
            Math.pow(end[2] - start[2], 2)
          );
          const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);
          
          return (
            <mesh 
              key={`string-${i}`} 
              position={midpoint as [number, number, number]} 
              rotation={[0, 0, angle]}
            >
              <cylinderGeometry args={[0.001, 0.001, distance]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
          );
        })}
      </group>

      {/* Section border when active */}
      {isActive && (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[4.2, 5.2]} />
          <meshStandardMaterial 
            color="#b8860b" 
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Push pins */}
      <mesh position={[-1.8, 2.3, 0.05]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>
      <mesh position={[1.8, 2.3, 0.05]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>
    </group>
  );
};