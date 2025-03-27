import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useGsapFromTo } from '@/hooks/use-gsap';
import { aboutMeContent } from '@/data/portfolio-data';

const About = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Card flip animation
  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // GSAP animations for section elements
  useGsapFromTo(
    aboutRef,
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    { trigger: aboutRef, start: "top 80%" }
  );

  // Animate the card entry
  useEffect(() => {
    if (aboutRef.current) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } });
    }
  }, [controls]);

  return (
    <section id="about" ref={aboutRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary bg-opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary bg-opacity-5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-space font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="relative after:content-[''] after:absolute after:-bottom-2 after:left-1/4 after:w-1/2 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary">About Me</span>
        </motion.h2>
        
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* 3D rotating card - front is bio, back is key details */}
          <motion.div 
            className="lg:w-1/2 perspective-1000"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
          >
            <div 
              ref={cardRef}
              className={`relative preserve-3d w-full transition-all duration-1000 cursor-pointer h-[500px] ${isFlipped ? 'rotate-y-180' : ''}`}
              onClick={handleCardFlip}
              onKeyDown={(e) => e.key === 'Enter' && handleCardFlip()}
              tabIndex={0}
              role="button"
              aria-label="Flip card to see more information"
            >
              {/* Front side */}
              <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 border border-gray-700">
                <h3 className="text-2xl font-space font-bold mb-6 text-secondary">My Journey</h3>
                <div className="whitespace-pre-line">
                  {aboutMeContent.bio.split('\n').map((paragraph, index) => (
                    <p key={index} className={index < aboutMeContent.bio.split('\n').length - 1 ? "mb-4" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                <p className="text-lg font-medium mt-6">Hover to see more details</p>
                <div className="absolute bottom-6 right-6">
                  <i className="fas fa-sync-alt text-light opacity-50 text-xl"></i>
                </div>
              </div>
              
              {/* Back side */}
              <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 border border-gray-700 rotate-y-180">
                <h3 className="text-2xl font-space font-bold mb-6 text-primary">Quick Facts</h3>
                <ul className="space-y-4">
                  {aboutMeContent.facts.map((fact, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <i className={`${fact.icon} mt-1 text-secondary`}></i>
                      <div>
                        <p className="font-medium">{fact.title}</p>
                        <p className="text-sm opacity-80">{fact.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="absolute bottom-6 right-6">
                  <i className="fas fa-sync-alt text-light opacity-50 text-xl"></i>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Download resume section */}
          <motion.div 
            className="lg:w-1/2 flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-space font-bold mb-6">Want to know more?</h3>
            <p className="text-lg mb-8 max-w-lg text-center lg:text-left">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            
            {/* Futuristic glowing button */}
            <a 
              href="#" 
              className="group relative px-8 py-4 overflow-hidden rounded-lg bg-dark"
              download
            >
              <span className="relative z-10 flex items-center gap-2 font-medium font-space text-lg">
                <i className="fas fa-file-download"></i>
                Download Resume
              </span>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.span 
                  className="w-full h-full bg-gradient-to-r from-primary to-secondary blur-md"
                  animate={{ 
                    boxShadow: ['0 0 5px #8A2BE2', '0 0 20px #8A2BE2, 0 0 40px #00BFFF', '0 0 5px #8A2BE2']
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "reverse"
                  }}
                />
              </span>
              <span className="absolute inset-0.5 bg-dark rounded-lg group-hover:bg-opacity-90 transition-colors"></span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
