import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGsapFromTo } from '@/hooks/use-gsap';
import { projects } from '@/data/portfolio-data';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // GSAP animations for title
  useGsapFromTo(
    '.projects-title',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
    { trigger: '#projects', start: 'top 80%' }
  );

  // Handle navigation
  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  // Mobile swipe handlers
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextProject();
    } else if (diff < -50) {
      prevProject();
    }

    touchStartX.current = null;
  };

  // Calculate visible projects based on screen size
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

  useEffect(() => {
    const updateVisibleProjects = () => {
      const width = window.innerWidth;
      let visibleCount = width >= 1280 ? 3 : width >= 768 ? 2 : 1;

      const indices = Array.from(
        { length: visibleCount },
        (_, i) => (currentIndex + i) % projects.length
      );

      setVisibleProjects(indices);
    };

    updateVisibleProjects();
    window.addEventListener('resize', updateVisibleProjects);

    return () => {
      window.removeEventListener('resize', updateVisibleProjects);
    };
  }, [currentIndex]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-dark to-gray-900"
    >
      <div className="container mx-auto px-4">
        <h2 className="projects-title text-4xl md:text-5xl font-space font-bold mb-16 text-center">
          <span className="relative after:content-[''] after:absolute after:-bottom-2 after:left-1/4 after:w-1/2 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary">
            Featured Projects
          </span>
        </h2>

        {/* 3D Project Carousel */}
        <div
          className="relative overflow-hidden"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Project Controls */}
          <div className="flex justify-center gap-4 mb-12">
            <motion.button
              className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors duration-300"
              onClick={prevProject}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors duration-300"
              onClick={nextProject}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Projects Container */}
          <div className="perspective-1000">
            <div className="flex flex-wrap gap-8 justify-center">
              <AnimatePresence mode="wait">
                {visibleProjects.map((projectIndex, i) => {
                  const project = projects[projectIndex];
                  return (
                    <motion.div
                      key={`${project.id}-${i}`}
                      className="project-card max-w-lg group"
                      initial={{ opacity: 0, y: 50, rotateY: -10 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      exit={{ opacity: 0, y: -50, rotateY: 10 }}
                      transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 20,
                        delay: i * 0.1,
                      }}
                    >
                      <div className="relative overflow-hidden rounded-xl preserve-3d h-[450px] p-6 bg-gray-800 border border-gray-700 flex flex-col">
                        <h3 className="text-2xl font-space font-bold mb-4 text-white">
                          {project.title}
                        </h3>
                        <div className="flex gap-2 mb-4 flex-wrap">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className={`px-3 py-1 rounded-full text-xs bg-opacity-20`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm opacity-80 mb-4">{project.description}</p>
                        <div className="mt-auto pt-4 flex justify-between items-center">
                          <div className="text-xs opacity-60">{project.year}</div>
                          <div className="flex gap-3">
                            {project.github && (
                              <a
                                href={project.github}
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub repository"
                              >
                                <Github size={24} />
                              </a>
                            )}
                            {project.liveLink && (
                              <a
                                href={project.liveLink}
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-secondary transition-colors duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Live project"
                              >
                                <ExternalLink size={24} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
