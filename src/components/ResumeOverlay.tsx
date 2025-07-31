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
                SOFTWARE & AWS DETECTIVE
              </h2>
              <div className="w-24 h-0.5 bg-detective-brass mx-auto"></div>
              <h3 className="text-2xl text-detective-paper">Mahdi Ghaleb</h3>
            </div>
            
            <div className="space-y-4 text-detective-paper">
              <p className="text-lg leading-relaxed">
                Welcome to my digital investigation office. I'm Mahdi Ghaleb, a seasoned software detective 
                with 5+ years of experience tracking down complex system mysteries, architecting scalable 
                cloud solutions, and building bulletproof applications that stand the test of time.
              </p>
              
              <p className="text-lg leading-relaxed">
                My expertise spans the full spectrum of modern development - from React frontends 
                that deliver seamless user experiences, to robust Node.js and Python backends, 
                all deployed on AWS infrastructure that scales with confidence.
              </p>
              
              <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
                <h3 className="text-xl font-semibold text-detective-brass mb-3">The Developer's Creed</h3>
                <p className="italic text-detective-paper">
                  "Every bug has a story. Every feature has a purpose. Every line of code 
                  is a clue in the grand mystery of building something meaningful and scalable."
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-detective-shadow p-4 rounded border border-detective-brass/30">
                  <h4 className="text-detective-brass font-semibold mb-2">Location</h4>
                  <p className="text-detective-paper">Available Worldwide (Remote)</p>
                </div>
                <div className="bg-detective-shadow p-4 rounded border border-detective-brass/30">
                  <h4 className="text-detective-brass font-semibold mb-2">Experience</h4>
                  <p className="text-detective-paper">5+ Years Full-Stack Development</p>
                </div>
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

      case 'aws':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-detective-glow tracking-wider">
                AWS CLOUD INVESTIGATION
              </h2>
              <div className="w-24 h-0.5 bg-detective-brass mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
                  <h3 className="text-xl font-semibold text-detective-brass mb-4">Certifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-detective-glow rounded-full"></div>
                      <span className="text-detective-paper">AWS Solutions Architect Associate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-detective-glow rounded-full"></div>
                      <span className="text-detective-paper">AWS Developer Associate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-detective-glow rounded-full"></div>
                      <span className="text-detective-paper">AWS Cloud Practitioner</span>
                    </div>
                  </div>
                </div>

                <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
                  <h3 className="text-xl font-semibold text-detective-brass mb-4">Core Services</h3>
                  <div className="space-y-2">
                    {[
                      'EC2 & Auto Scaling',
                      'Lambda & API Gateway',
                      'S3 & CloudFront',
                      'RDS & DynamoDB',
                      'CloudFormation & CDK',
                      'ECS & EKS'
                    ].map(service => (
                      <div key={service} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-detective-paper text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-detective-shadow p-6 rounded-lg border border-detective-brass/30">
                <h3 className="text-xl font-semibold text-detective-brass mb-4">Recent Cloud Cases</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-detective-brass pl-4">
                    <h4 className="text-detective-glow font-semibold">Serverless E-commerce Platform</h4>
                    <p className="text-detective-paper text-sm">Built scalable serverless architecture using Lambda, API Gateway, and DynamoDB. Achieved 99.9% uptime with automatic scaling.</p>
                  </div>
                  <div className="border-l-4 border-detective-brass pl-4">
                    <h4 className="text-detective-glow font-semibold">CI/CD Pipeline Optimization</h4>
                    <p className="text-detective-paper text-sm">Implemented CodePipeline with blue-green deployments, reducing deployment time by 60% and eliminating downtime.</p>
                  </div>
                  <div className="border-l-4 border-detective-brass pl-4">
                    <h4 className="text-detective-glow font-semibold">Data Lake Architecture</h4>
                    <p className="text-detective-paper text-sm">Designed analytics platform using S3, Glue, and Athena, processing 10TB+ daily with cost-effective querying.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ecommerce':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-detective-glow tracking-wider">
                E-COMMERCE MYSTERY SOLVED
              </h2>
              <div className="w-24 h-0.5 bg-detective-brass mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
                <h3 className="text-xl font-semibold text-detective-brass mb-3">Case Overview</h3>
                <p className="text-detective-paper mb-4">
                  A comprehensive e-commerce platform built for high-traffic retail operations. 
                  The client needed a scalable solution that could handle Black Friday traffic spikes 
                  while maintaining fast load times and secure transactions.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-detective-glow font-semibold mb-2">Tech Stack</h4>
                    <ul className="text-detective-paper text-sm space-y-1">
                      <li>• React 18 + Next.js 13</li>
                      <li>• Node.js + Express</li>
                      <li>• PostgreSQL + Redis</li>
                      <li>• Stripe Payment Integration</li>
                      <li>• AWS ECS + CloudFront</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-detective-glow font-semibold mb-2">Key Features</h4>
                    <ul className="text-detective-paper text-sm space-y-1">
                      <li>• Real-time inventory tracking</li>
                      <li>• Advanced search & filtering</li>
                      <li>• Multi-vendor marketplace</li>
                      <li>• Mobile-first responsive design</li>
                      <li>• Analytics dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-detective-shadow p-6 rounded-lg border border-detective-brass/30">
                <h3 className="text-xl font-semibold text-detective-brass mb-3">Results</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">300%</div>
                    <div className="text-sm text-detective-paper">Traffic Increase</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">1.2s</div>
                    <div className="text-sm text-detective-paper">Page Load Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">99.98%</div>
                    <div className="text-sm text-detective-paper">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'chat-app':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-detective-glow tracking-wider">
                REAL-TIME COMMUNICATION CASE
              </h2>
              <div className="w-24 h-0.5 bg-detective-brass mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
                <h3 className="text-xl font-semibold text-detective-brass mb-3">Investigation Summary</h3>
                <p className="text-detective-paper mb-4">
                  A real-time chat application with advanced features for team collaboration. 
                  The challenge was building a system that could handle thousands of concurrent users 
                  with sub-second message delivery and rich media support.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-detective-glow font-semibold mb-2">Technologies</h4>
                    <ul className="text-detective-paper text-sm space-y-1">
                      <li>• Socket.io + WebRTC</li>
                      <li>• React + TypeScript</li>
                      <li>• Node.js + Express</li>
                      <li>• MongoDB + Redis Pub/Sub</li>
                      <li>• AWS ElastiCache</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-detective-glow font-semibold mb-2">Features</h4>
                    <ul className="text-detective-paper text-sm space-y-1">
                      <li>• Voice & video calls</li>
                      <li>• File sharing & screen share</li>
                      <li>• Message reactions & threads</li>
                      <li>• Custom emoji system</li>
                      <li>• End-to-end encryption</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-detective-shadow p-6 rounded-lg border border-detective-brass/30">
                <h3 className="text-xl font-semibold text-detective-brass mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">10k+</div>
                    <div className="text-sm text-detective-paper">Concurrent Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">&lt;100ms</div>
                    <div className="text-sm text-detective-paper">Message Latency</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">500GB</div>
                    <div className="text-sm text-detective-paper">Daily Data Transfer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'aws-serverless':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-detective-glow tracking-wider">
                SERVERLESS ARCHITECTURE INVESTIGATION
              </h2>
              <div className="w-24 h-0.5 bg-detective-brass mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
                <h3 className="text-xl font-semibold text-detective-brass mb-3">Case Details</h3>
                <p className="text-detective-paper mb-4">
                  A fully serverless API platform designed to handle variable workloads with 
                  automatic scaling and cost optimization. The system processes millions of 
                  requests per month while maintaining near-zero infrastructure management overhead.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-detective-glow font-semibold mb-2">AWS Services</h4>
                    <ul className="text-detective-paper text-sm space-y-1">
                      <li>• Lambda Functions</li>
                      <li>• API Gateway</li>
                      <li>• DynamoDB</li>
                      <li>• S3 + CloudFront</li>
                      <li>• EventBridge</li>
                      <li>• Step Functions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-detective-glow font-semibold mb-2">Capabilities</h4>
                    <ul className="text-detective-paper text-sm space-y-1">
                      <li>• Auto-scaling to zero</li>
                      <li>• Pay-per-request pricing</li>
                      <li>• Multi-region deployment</li>
                      <li>• Event-driven architecture</li>
                      <li>• Serverless monitoring</li>
                      <li>• Infrastructure as Code</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-detective-shadow p-6 rounded-lg border border-detective-brass/30">
                <h3 className="text-xl font-semibold text-detective-brass mb-3">Cost & Performance Impact</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">80%</div>
                    <div className="text-sm text-detective-paper">Cost Reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">0ms</div>
                    <div className="text-sm text-detective-paper">Cold Start Optimized</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">99.99%</div>
                    <div className="text-sm text-detective-paper">Availability</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-detective-glow tracking-wider">
                DATA VISUALIZATION CASE
              </h2>
              <div className="w-24 h-0.5 bg-detective-brass mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
                <h3 className="text-xl font-semibold text-detective-brass mb-3">Investigation Brief</h3>
                <p className="text-detective-paper mb-4">
                  An advanced analytics dashboard that transforms complex business data into 
                  actionable insights. Built for executives who need real-time visibility into 
                  KPIs across multiple departments and regions.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-detective-glow font-semibold mb-2">Frontend Stack</h4>
                    <ul className="text-detective-paper text-sm space-y-1">
                      <li>• React + D3.js</li>
                      <li>• Chart.js + Plotly</li>
                      <li>• Material-UI</li>
                      <li>• WebSocket connections</li>
                      <li>• Progressive Web App</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-detective-glow font-semibold mb-2">Data Pipeline</h4>
                    <ul className="text-detective-paper text-sm space-y-1">
                      <li>• Apache Kafka streaming</li>
                      <li>• Elasticsearch aggregations</li>
                      <li>• Redis caching layer</li>
                      <li>• GraphQL API</li>
                      <li>• Real-time notifications</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-detective-shadow p-6 rounded-lg border border-detective-brass/30">
                <h3 className="text-xl font-semibold text-detective-brass mb-3">Business Impact</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">50%</div>
                    <div className="text-sm text-detective-paper">Faster Decisions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">1TB+</div>
                    <div className="text-sm text-detective-paper">Daily Data Processed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">25</div>
                    <div className="text-sm text-detective-paper">Chart Types</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cicd-pipeline':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-detective-glow tracking-wider">
                CI/CD PIPELINE INVESTIGATION
              </h2>
              <div className="w-24 h-0.5 bg-detective-brass mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="bg-detective-wood p-6 rounded-lg border border-detective-brass">
                <h3 className="text-xl font-semibold text-detective-brass mb-3">Case Summary</h3>
                <p className="text-detective-paper mb-4">
                  A comprehensive DevOps transformation that automated the entire software delivery 
                  lifecycle. From code commit to production deployment, every step was optimized 
                  for speed, reliability, and security.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-detective-glow font-semibold mb-2">Pipeline Tools</h4>
                    <ul className="text-detective-paper text-sm space-y-1">
                      <li>• GitHub Actions</li>
                      <li>• Docker + Kubernetes</li>
                      <li>• AWS CodePipeline</li>
                      <li>• Terraform</li>
                      <li>• SonarQube</li>
                      <li>• Datadog Monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-detective-glow font-semibold mb-2">Automation Features</h4>
                    <ul className="text-detective-paper text-sm space-y-1">
                      <li>• Automated testing suites</li>
                      <li>• Security vulnerability scanning</li>
                      <li>• Blue-green deployments</li>
                      <li>• Rollback capabilities</li>
                      <li>• Environment provisioning</li>
                      <li>• Slack notifications</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-detective-shadow p-6 rounded-lg border border-detective-brass/30">
                <h3 className="text-xl font-semibold text-detective-brass mb-3">Efficiency Gains</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">90%</div>
                    <div className="text-sm text-detective-paper">Faster Deployments</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">Zero</div>
                    <div className="text-sm text-detective-paper">Downtime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-detective-glow">100+</div>
                    <div className="text-sm text-detective-paper">Daily Deployments</div>
                  </div>
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