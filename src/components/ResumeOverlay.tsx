import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import leoImage from '@/assets/leo-cat.jpg';

interface ResumeOverlayProps {
  content: string | null;
  onClose: () => void;
}

export const ResumeOverlay = ({ content, onClose }: ResumeOverlayProps) => {
  if (!content) return null;

  const renderContent = () => {
    switch (content) {
      case 'about':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-detective-glow tracking-wider">
                PRIVATE INVESTIGATOR
              </h2>
              <div className="w-24 h-0.5 bg-detective-brass mx-auto"></div>
            </div>
            
            <div className="space-y-4 text-detective-paper">
              <p className="text-lg leading-relaxed">
                Welcome to my office, partner. I'm a seasoned digital detective with over a decade 
                of experience tracking down bugs, solving complex code mysteries, and building 
                bulletproof applications that stand the test of time.
              </p>
              
              <p className="text-lg leading-relaxed">
                My beat covers the full spectrum of modern web development - from React frontends 
                that sing like a well-tuned engine, to Node.js backends that never sleep on the job. 
                I've cracked cases involving everything from small startups to enterprise-level operations.
              </p>
              
              <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
                <h3 className="text-xl font-semibold text-detective-brass mb-3">The Detective's Creed</h3>
                <p className="italic text-detective-paper">
                  "Every bug has a story. Every feature has a purpose. Every line of code 
                  is a clue in the grand mystery of building something meaningful."
                </p>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-detective-glow tracking-wider">
                TOOLS OF THE TRADE
              </h2>
              <div className="w-24 h-0.5 bg-detective-brass mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-detective-brass">Frontend Arsenal</h3>
                <div className="space-y-2">
                  {[
                    'React & Next.js',
                    'TypeScript',
                    'Tailwind CSS',
                    'Three.js & React Three Fiber',
                    'Vue.js & Nuxt.js',
                    'GSAP Animations'
                  ].map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-detective-glow rounded-full"></div>
                      <span className="text-detective-paper">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-detective-brass">Backend Investigation</h3>
                <div className="space-y-2">
                  {[
                    'Node.js & Express',
                    'Python & Django',
                    'PostgreSQL & MongoDB',
                    'AWS & Docker',
                    'GraphQL & REST APIs',
                    'Microservices Architecture'
                  ].map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-detective-glow rounded-full"></div>
                      <span className="text-detective-paper">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
              <h3 className="text-xl font-semibold text-detective-brass mb-3">Specialized Techniques</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl text-detective-glow mb-2">🔍</div>
                  <p className="text-sm text-detective-paper">Performance Optimization</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-detective-glow mb-2">🛡️</div>
                  <p className="text-sm text-detective-paper">Security Auditing</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-detective-glow mb-2">⚡</div>
                  <p className="text-sm text-detective-paper">Real-time Systems</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-detective-glow tracking-wider">
                CASE FILES
              </h2>
              <div className="w-24 h-0.5 bg-detective-brass mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-detective-brass">Senior Full-Stack Detective</h3>
                  <span className="text-detective-smoke text-sm">2021 - Present</span>
                </div>
                <p className="text-detective-glow font-medium mb-2">TechCorp Solutions</p>
                <p className="text-detective-paper">
                  Leading a team of digital investigators in solving complex web application mysteries. 
                  Reduced client bug reports by 85% through advanced debugging techniques and 
                  implemented automated testing protocols.
                </p>
              </div>

              <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-detective-brass">Frontend Specialist</h3>
                  <span className="text-detective-smoke text-sm">2019 - 2021</span>
                </div>
                <p className="text-detective-glow font-medium mb-2">Digital Agency Pro</p>
                <p className="text-detective-paper">
                  Specialized in React investigations and user experience optimization. 
                  Successfully launched 50+ high-profile cases with zero critical bugs.
                </p>
              </div>

              <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-detective-brass">Junior Code Detective</h3>
                  <span className="text-detective-smoke text-sm">2017 - 2019</span>
                </div>
                <p className="text-detective-glow font-medium mb-2">StartUp Innovations</p>
                <p className="text-detective-paper">
                  Cut my teeth on the mean streets of startup development. 
                  Learned to work fast, think on my feet, and solve problems with limited resources.
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="text-detective-brass text-lg font-semibold">Notable Achievements</div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-detective-glow">150+</div>
                  <div className="text-sm text-detective-paper">Cases Closed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-detective-glow">99.9%</div>
                  <div className="text-sm text-detective-paper">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-detective-glow">24/7</div>
                  <div className="text-sm text-detective-paper">Uptime Record</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cat':
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-detective-glow tracking-wider">
                MEET LEO
              </h2>
              <div className="w-24 h-0.5 bg-detective-brass mx-auto"></div>
            </div>

            <div className="flex justify-center">
              <img 
                src={leoImage} 
                alt="Leo the Cat" 
                className="w-48 h-48 rounded-full object-cover border-4 border-detective-brass"
              />
            </div>

            <div className="space-y-4 text-detective-paper">
              <p className="text-lg leading-relaxed">
                This distinguished gentleman is Leo, my trusted partner in crime-solving. 
                A tuxedo cat with impeccable taste and an even better eye for spotting bugs 
                in code (though he prefers the real kind).
              </p>
              
              <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass space-y-3">
                <h3 className="text-xl font-semibold text-detective-brass">Leo's Credentials</h3>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <strong className="text-detective-glow">Age:</strong> 7 years old
                  </div>
                  <div>
                    <strong className="text-detective-glow">Specialty:</strong> Code Reviews
                  </div>
                  <div>
                    <strong className="text-detective-glow">Favorite IDE:</strong> Any sunny windowsill
                  </div>
                  <div>
                    <strong className="text-detective-glow">Success Rate:</strong> Purr-fect
                  </div>
                </div>
              </div>

              <p className="text-lg italic text-detective-smoke">
                "Leo has an uncanny ability to find the exact line of code that needs attention... 
                usually by walking across my keyboard at just the right moment."
              </p>
            </div>
          </div>
        );

      case 'typewriter':
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-detective-glow tracking-wider">
                CASE SUMMARY
              </h2>
              <div className="w-24 h-0.5 bg-detective-brass mx-auto"></div>
            </div>

            <div className="bg-detective-wood p-8 rounded-lg border border-detective-brass">
              <div className="space-y-4 text-left">
                <div className="text-detective-brass font-semibold text-lg">
                  CONFIDENTIAL DOSSIER - THE DETECTIVE'S FINAL REPORT
                </div>
                
                <div className="space-y-3 text-detective-paper">
                  <p>
                    <strong>Subject:</strong> Full-Stack Web Developer
                  </p>
                  <p>
                    <strong>Years of Investigation:</strong> 10+ Years
                  </p>
                  <p>
                    <strong>Specialization:</strong> React, Node.js, TypeScript, 3D Web Experiences
                  </p>
                  <p>
                    <strong>Notable Cases:</strong> E-commerce platforms, SaaS applications, 
                    Real-time collaboration tools, Interactive 3D websites
                  </p>
                  
                  <div className="border-t border-detective-brass pt-4 mt-6">
                    <p className="italic text-detective-glow">
                      "In conclusion, this detective has proven to be a valuable asset to any team 
                      looking to solve complex digital mysteries. Highly recommended for cases 
                      requiring attention to detail, innovative problem-solving, and the ability 
                      to work under pressure."
                    </p>
                  </div>
                  
                  <div className="text-right mt-6">
                    <p className="text-detective-brass">
                      - Chief Inspector, Code Quality Division
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-detective-paper text-lg">
                Ready to hire this detective for your next case?
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" className="bg-detective-wood border-detective-brass text-detective-glow hover:bg-detective-brass hover:text-noir-shadow">
                  Contact Detective
                </Button>
                <Button variant="outline" className="bg-detective-wood border-detective-brass text-detective-glow hover:bg-detective-brass hover:text-noir-shadow">
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir-shadow bg-opacity-90">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-detective-brass m-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle className="text-detective-glow">Detective's Dossier</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-detective-smoke hover:text-detective-glow hover:bg-detective-wood"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
};