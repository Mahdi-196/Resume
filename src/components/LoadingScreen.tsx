import { useState, useEffect } from 'react';
import photoDeveloping from '@/assets/photo-developing.jpg';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showDeveloping, setShowDeveloping] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowDeveloping(true);
          // Start developing animation, then complete
          setTimeout(() => {
            onLoadingComplete();
          }, 3000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-noir-shadow z-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Detective Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-detective-glow tracking-wider">
            THE DETECTIVE'S
          </h1>
          <h2 className="text-4xl font-light text-detective-paper tracking-widest">
            DOSSIER
          </h2>
          <div className="w-32 h-0.5 bg-detective-brass mx-auto"></div>
        </div>

        {/* Photo Developing Animation */}
        {showDeveloping ? (
          <div className="relative">
            <div className="w-80 h-60 bg-noir-shadow border-2 border-detective-brass p-4 rounded-lg">
              <img 
                src={photoDeveloping} 
                alt="Photo developing" 
                className="w-full h-full object-cover animate-photo-develop rounded"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-noir-shadow via-transparent to-transparent opacity-60 rounded-lg"></div>
            <p className="text-detective-paper text-lg mt-4 animate-typewriter overflow-hidden whitespace-nowrap">
              Developing memories...
            </p>
          </div>
        ) : (
          /* Loading Progress */
          <div className="space-y-6">
            <div className="w-80 h-2 bg-detective-wood rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-detective-brass to-detective-glow transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-detective-paper text-lg">
                Preparing the case files...
              </p>
              <p className="text-detective-smoke text-sm">
                {Math.round(loadingProgress)}%
              </p>
            </div>

            {/* Atmospheric dots */}
            <div className="flex space-x-2 justify-center">
              <div className="w-2 h-2 bg-detective-glow rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-detective-glow rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-detective-glow rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}

        {/* Vintage Badge */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-detective-smoke text-sm uppercase tracking-wider">
            Est. 1930 • Private Investigator
          </div>
        </div>
      </div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-transparent via-detective-smoke to-transparent mix-blend-multiply"></div>
    </div>
  );
};