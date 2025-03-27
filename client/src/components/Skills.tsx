import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGsapFromTo } from '@/hooks/use-gsap';
import { skills } from '@/data/portfolio-data';

const SkillCard = ({ skill, index }: { skill: any, index: number }) => {
  return (
    <motion.div 
      className="skill-card group hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="h-60 preserve-3d transform-style-3d rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-6 cursor-pointer relative">
        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="flex flex-col items-center justify-center h-full backface-hidden">
          <motion.i 
            className={`${skill.icon} text-5xl mb-4 ${
              index % 3 === 0 ? 'text-secondary' : 
              index % 3 === 1 ? 'text-primary' : 'text-accent'
            }`}
            whileHover={{ 
              rotateY: 180,
              transition: { duration: 0.8 }
            }}
          />
          <h3 className="text-xl font-space font-bold mb-2">{skill.name}</h3>
          <p className="text-center text-sm opacity-80">{skill.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // GSAP animations for title
  useGsapFromTo(
    '.skills-title',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    { trigger: sectionRef, start: "top 80%" }
  );

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="skills-title text-4xl md:text-5xl font-space font-bold mb-16 text-center">
          <span className="relative after:content-[''] after:absolute after:-bottom-2 after:left-1/4 after:w-1/2 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary">Technical Skills</span>
        </h2>
        
        <div className="relative" id="skills-container">
          {/* 3D Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 perspective-1000">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
