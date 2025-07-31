interface DetectiveBoardModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const DetectiveBoardModal = ({ isVisible, onClose }: DetectiveBoardModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4" style={{
        backgroundColor: '#D2B48C',
        border: '8px solid #654321',
        borderRadius: '0px',
        boxShadow: '0 0 30px rgba(0,0,0,0.8)'
      }}>
        {/* Modal Header */}
        <div className="p-4 flex justify-between items-center" style={{
          backgroundColor: '#8B4513',
          borderBottom: '4px solid #654321'
        }}>
          <h2 className="text-2xl font-bold text-white">Leo Ghaleb - Resume</h2>
          <button 
            type="button"
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        {/* Detective Board Content */}
        <div className="relative p-8 min-h-[500px]" style={{ fontFamily: 'serif' }}>
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

        {/* Modal Footer */}
        <div className="p-4 text-center" style={{
          backgroundColor: '#8B4513',
          borderTop: '4px solid #654321'
        }}>
          <p className="text-sm text-white">Press 'R' or 'ESC' to close • Built with React Three Fiber</p>
        </div>
      </div>
    </div>
  );
};