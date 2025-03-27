import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGsapFromTo } from '@/hooks/use-gsap';
import FloatingParticles from './FloatingParticles';
import { experiences } from '@/data/portfolio-data';

interface ExperienceItemProps {
  experience: any;
  index: number;
}

const ExperienceItem = ({ experience, index }: ExperienceItemProps) => {
  return (
    <motion.div 
      className="relative mb-16 last:mb-0"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="flex flex-col md:flex-row items-start">
        {experience.position === 'left' ? (
          <>
            <div className="flex md:w-1/2 md:justify-end mb-4 md:mb-0 md:pr-12">
              <div className="md:text-right">
                <h3 className={`text-xl font-space font-bold text-${experience.color}`}>
                  {experience.title}
                </h3>
                <p className="text-sm opacity-80">{experience.period}</p>
                <p className="text-lg mt-2">{experience.organization}</p>
                <p className="opacity-80">{experience.description}</p>
              </div>
            </div>
            <motion.div 
              className={`timeline-dot absolute left-[-8px] md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-${experience.color} group top-1 cursor-pointer`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span 
                className="absolute inset-0 rounded-full"
                animate={{ 
                  boxShadow: ['0 0 0px currentColor', '0 0 10px currentColor', '0 0 2px currentColor']
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <div className="md:w-1/2 md:pl-12"></div>
          </>
        ) : (
          <>
            <div className="md:w-1/2 md:pr-12"></div>
            <motion.div 
              className={`timeline-dot absolute left-[-8px] md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-${experience.color} group top-1 cursor-pointer`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span 
                className="absolute inset-0 rounded-full"
                animate={{ 
                  boxShadow: ['0 0 0px currentColor', '0 0 10px currentColor', '0 0 2px currentColor']
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <div className="md:w-1/2 md:pl-12">
              <h3 className={`text-xl font-space font-bold text-${experience.color}`}>
                {experience.title}
              </h3>
              <p className="text-sm opacity-80">{experience.period}</p>
              <p className="text-lg mt-2">{experience.organization}</p>
              <p className="opacity-80">{experience.description}</p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // GSAP animations for title and timeline
  useGsapFromTo(
    '.experience-title',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    { trigger: '#experience', start: "top 80%" }
  );

  
  return (
    <section id="experience" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles count={200} color="#8A2BE2" />
      
      <div className="container mx-auto px-4">
        <h2 className="experience-title text-4xl md:text-5xl font-space font-bold mb-16 text-center">
          <span className="relative after:content-[''] after:absolute after:-bottom-2 after:left-1/4 after:w-1/2 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary">Experience & Achievements</span>
        </h2>
        
        {/* 3D Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:translate-x-[-0.5px]"></div>
          
          {/* Timeline items */}
          {experiences.map((experience, index) => (
            <ExperienceItem key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
