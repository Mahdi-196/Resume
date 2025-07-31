import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveDetectiveBoardProps {
  onInteraction: (type: string, data?: unknown) => void;
  onBoardClick?: () => void;
  showContent?: boolean;
  onContentClose?: () => void;
}

export const InteractiveDetectiveBoard = ({ onInteraction, onBoardClick, showContent = false, onContentClose }: InteractiveDetectiveBoardProps) => {
  // Board state is now managed by DetectiveOffice component

  return (
    <>
    <group 
      position={[0, 4.5, 9.9]} 
      rotation={[0, Math.PI, 0]}
    >
      {/* Main Wooden Board Background - Light brown wood */}
      <mesh 
        onClick={(e) => {
          e.stopPropagation();
          onBoardClick?.();
        }}
        onPointerEnter={(e) => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={(e) => {
          document.body.style.cursor = 'crosshair';
        }}
      >
        <planeGeometry args={[12.5, 6.5]} />
        <meshStandardMaterial 
          color="#D2B48C" 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Wooden Borders - Dark brown wood */}
      <mesh position={[0, 3.25, 0.02]}>
        <boxGeometry args={[13, 0.25, 0.08]} />
        <meshStandardMaterial 
          color="#654321" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, -3.25, 0.02]}>
        <boxGeometry args={[13, 0.25, 0.08]} />
        <meshStandardMaterial 
          color="#654321" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[-6.25, 0, 0.02]}>
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <meshStandardMaterial 
          color="#654321" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[6.25, 0, 0.02]}>
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <meshStandardMaterial 
          color="#654321" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Resume Content - appears when zoomed in */}
      {showContent && (
        <Html
          transform
          occlude
          position={[0, 0, 0.05]}
          distanceFactor={1}
          style={{
            width: '1200px',
            height: '650px',
            transform: 'scale(0.01)', // Scale down to fit on the board
            pointerEvents: 'auto'
          }}
        >
          <div className="relative w-full h-full p-8" style={{ 
            fontFamily: 'serif',
            backgroundColor: 'transparent'
          }}>
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onContentClose?.();
              }}
              className="absolute top-4 right-4 z-50 w-8 h-8 bg-red-600 text-white rounded-full hover:bg-red-700 text-lg font-bold"
              style={{ transform: 'scale(100)' }} // Scale back up for readability
            >
              ×
            </button>

            {/* Red string connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <line x1="15%" y1="25%" x2="45%" y2="15%" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="55%" y1="25%" x2="85%" y2="35%" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="25%" y1="65%" x2="75%" y2="55%" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="35%" y1="85%" x2="65%" y2="75%" stroke="#cc0000" strokeWidth="2" strokeDasharray="5,5" />
            </svg>

            {/* Push pins */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-red-600 rounded-full shadow-md" style={{ zIndex: 2 }}></div>
            <div className="absolute top-8 right-8 w-3 h-3 bg-red-600 rounded-full shadow-md" style={{ zIndex: 2 }}></div>
            <div className="absolute bottom-16 left-12 w-3 h-3 bg-red-600 rounded-full shadow-md" style={{ zIndex: 2 }}></div>
            <div className="absolute bottom-8 right-16 w-3 h-3 bg-red-600 rounded-full shadow-md" style={{ zIndex: 2 }}></div>

            {/* Evidence Card 1: Contact Info */}
            <div className="absolute top-2 left-8 w-64 bg-amber-50 border border-amber-200 shadow-lg transform -rotate-2" 
                 style={{ 
                   backgroundImage: 'linear-gradient(45deg, transparent 24%, rgba(139,69,19,0.1) 25%, rgba(139,69,19,0.1) 26%, transparent 27%, transparent 74%, rgba(139,69,19,0.1) 75%, rgba(139,69,19,0.1) 76%, transparent 77%)',
                   backgroundSize: '20px 20px',
                   zIndex: 3
                 }}>
              <div className="p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-2 border-b border-amber-300">CONTACT</h3>
                <div className="text-sm text-amber-800 space-y-1">
                  <p><strong>Email:</strong> leo@example.com</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                  <p><strong>Location:</strong> San Francisco, CA</p>
                  <p><strong>LinkedIn:</strong> linkedin.com/in/leoghaleb</p>
                </div>
              </div>
            </div>

            {/* Evidence Card 2: Skills */}
            <div className="absolute top-4 right-2 w-72 bg-amber-50 border border-amber-200 shadow-lg transform rotate-1" 
                 style={{ 
                   backgroundImage: 'linear-gradient(45deg, transparent 24%, rgba(139,69,19,0.1) 25%, rgba(139,69,19,0.1) 26%, transparent 27%, transparent 74%, rgba(139,69,19,0.1) 75%, rgba(139,69,19,0.1) 76%, transparent 77%)',
                   backgroundSize: '20px 20px',
                   zIndex: 3
                 }}>
              <div className="p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-2 border-b border-amber-300">TECHNICAL SKILLS</h3>
                <div className="grid grid-cols-3 gap-3 text-xs text-amber-800">
                  <div>
                    <h4 className="font-semibold text-red-800">Frontend</h4>
                    <ul className="list-disc list-inside">
                      <li>React/Next.js</li>
                      <li>TypeScript</li>
                      <li>Three.js</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800">Backend</h4>
                    <ul className="list-disc list-inside">
                      <li>Node.js</li>
                      <li>Python</li>
                      <li>PostgreSQL</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800">Tools</h4>
                    <ul className="list-disc list-inside">
                      <li>Docker</li>
                      <li>AWS</li>
                      <li>Git</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Card 3: Experience */}
            <div className="absolute top-44 left-4 w-80 bg-amber-50 border border-amber-200 shadow-lg transform rotate-1" 
                 style={{ 
                   backgroundImage: 'linear-gradient(45deg, transparent 24%, rgba(139,69,19,0.1) 25%, rgba(139,69,19,0.1) 26%, transparent 27%, transparent 74%, rgba(139,69,19,0.1) 75%, rgba(139,69,19,0.1) 76%, transparent 77%)',
                   backgroundSize: '20px 20px',
                   zIndex: 3
                 }}>
              <div className="p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-2 border-b border-amber-300">CASE HISTORY</h3>
                <div className="space-y-3 text-sm text-amber-800">
                  <div className="border-l-2 border-red-400 pl-3">
                    <h4 className="font-semibold text-red-800">Senior Developer - Tech Corp</h4>
                    <p className="text-xs text-amber-600">2021 - Present</p>
                    <ul className="text-xs mt-1 list-disc list-inside">
                      <li>Led development of interactive 3D web applications</li>
                      <li>Improved performance by 40% through optimization</li>
                      <li>Mentored junior developers and conducted code reviews</li>
                    </ul>
                  </div>
                  <div className="border-l-2 border-red-400 pl-3">
                    <h4 className="font-semibold text-red-800">Full Stack Developer - StartupXYZ</h4>
                    <p className="text-xs text-amber-600">2019 - 2021</p>
                    <ul className="text-xs mt-1 list-disc list-inside">
                      <li>Built scalable web applications from ground up</li>
                      <li>Implemented CI/CD pipelines and DevOps practices</li>
                      <li>Collaborated with design team on user experience</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Card 4: Projects */}
            <div className="absolute top-48 right-8 w-64 bg-amber-50 border border-amber-200 shadow-lg transform -rotate-1" 
                 style={{ 
                   backgroundImage: 'linear-gradient(45deg, transparent 24%, rgba(139,69,19,0.1) 25%, rgba(139,69,19,0.1) 26%, transparent 27%, transparent 74%, rgba(139,69,19,0.1) 75%, rgba(139,69,19,0.1) 76%, transparent 77%)',
                   backgroundSize: '20px 20px',
                   zIndex: 3
                 }}>
              <div className="p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-2 border-b border-amber-300">NOTABLE CASES</h3>
                <div className="space-y-2 text-sm text-amber-800">
                  <div>
                    <h4 className="font-semibold text-red-800">Detective Office 3D</h4>
                    <p className="text-xs">Interactive 3D detective office built with Three.js and React</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800">Portfolio Dashboard</h4>
                    <p className="text-xs">Real-time analytics dashboard with data visualization</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Card 5: Education */}
            <div className="absolute bottom-4 left-16 w-60 bg-amber-50 border border-amber-200 shadow-lg transform rotate-2" 
                 style={{ 
                   backgroundImage: 'linear-gradient(45deg, transparent 24%, rgba(139,69,19,0.1) 25%, rgba(139,69,19,0.1) 26%, transparent 27%, transparent 74%, rgba(139,69,19,0.1) 75%, rgba(139,69,19,0.1) 76%, transparent 77%)',
                   backgroundSize: '20px 20px',
                   zIndex: 3
                 }}>
              <div className="p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-2 border-b border-amber-300">CREDENTIALS</h3>
                <div className="text-sm text-amber-800">
                  <h4 className="font-semibold text-red-800">Bachelor of Computer Science</h4>
                  <p className="text-xs text-amber-600">University of California - 2019</p>
                  <p className="text-xs mt-1">Coursework: Computer Graphics, Web Development, Database Systems</p>
                </div>
              </div>
            </div>

            {/* Detective's magnifying glass */}
            <div className="absolute bottom-8 right-8 text-6xl opacity-20 transform rotate-12" style={{ zIndex: 1 }}>
              🔍
            </div>
          </div>
        </Html>
      )}
    </group>

    </>
  );
};