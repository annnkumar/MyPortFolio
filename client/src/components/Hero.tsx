import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ThreeScene from './ThreeScene';
import { personalInfo } from '@/data/portfolio-data';
import { useGsapTimeline } from '@/hooks/use-gsap';

const Hero = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const timeline = useGsapTimeline();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Cycle through taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline(prev => (prev + 1) % personalInfo.taglines.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Animate hero elements on mount
  useEffect(() => {
    if (!heroRef.current) return;
    
    const tl = timeline.current;
    
    tl.fromTo(".hero-name", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0
    )
    .fromTo(".hero-tagline", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.3
    )
    .fromTo(".hero-bio", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.5
    )
    .fromTo(".hero-btn", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 }, 0.7
    )
    .fromTo(".hero-social", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }, 0.9
    )
    .fromTo(".scroll-indicator", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.2
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* 3D Canvas Background */}
      <ThreeScene />
      
      {/* Content overlay */}
      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <div className="animate-float">
          <h1 className="hero-name text-4xl md:text-6xl lg:text-7xl font-space font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              {personalInfo.name}
            </span>
          </h1>
          <h2 className="hero-tagline text-xl md:text-3xl lg:text-4xl font-rajdhani font-light tracking-wider mb-6">
            {personalInfo.taglines[currentTagline]} <span className="inline-block w-0.5 h-6 bg-secondary animate-pulse"></span>
          </h2>
        </div>
        
        <p className="hero-bio max-w-lg text-lg md:text-xl mb-8 opacity-80">
          {personalInfo.bio}
        </p>
        
        <div className="flex gap-6 mt-4">
          <a 
            href="#projects" 
            className="hero-btn px-8 py-3 rounded-lg font-space font-medium text-lg relative overflow-hidden group"
          >
            <span className="relative z-10 text-white group-hover:text-dark transition-colors duration-300">My Work</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          <a 
            href="#contact" 
            className="hero-btn px-8 py-3 rounded-lg border border-secondary text-secondary font-space font-medium text-lg hover:bg-secondary hover:bg-opacity-10 transition-all duration-300"
          >
            Contact Me
          </a>
        </div>
        
        {/* Social Media Links */}
        <div className="flex gap-6 mt-12">
          <a 
            href={personalInfo.socials.github} 
            className="hero-social w-12 h-12 flex items-center justify-center rounded-full border border-light border-opacity-20 hover:border-primary hover:text-primary transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
          <a 
            href={personalInfo.socials.linkedin} 
            className="hero-social w-12 h-12 flex items-center justify-center rounded-full border border-light border-opacity-20 hover:border-secondary hover:text-secondary transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
          <a 
            href={`mailto:${personalInfo.email}`} 
            className="hero-social w-12 h-12 flex items-center justify-center rounded-full border border-light border-opacity-20 hover:border-accent hover:text-accent transition-all duration-300"
            aria-label="Email"
          >
            <i className="far fa-envelope text-xl"></i>
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm mb-2 opacity-70">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-light rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1.5 h-1.5 bg-light rounded-full"
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
