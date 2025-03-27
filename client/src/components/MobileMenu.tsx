import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // Close menu when clicking on a link
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href) {
      onClose();
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: topOffset,
            behavior: "smooth",
          });
        }
      }, 300);
    }
  };

  // Close the menu when ESC key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    
    // Prevent scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-dark bg-opacity-95 backdrop-blur-md z-50 flex flex-col justify-center items-center"
        >
          <button 
            className="absolute top-4 right-4 text-3xl focus:outline-none"
            onClick={onClose}
            aria-label="Close menu"
          >
            <i className="fas fa-times"></i>
          </button>
          
          <motion.div 
            className="flex flex-col space-y-8 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, staggerChildren: 0.1 }}
          >
            <a 
              href="#about" 
              className="text-3xl font-space hover:text-primary transition-colors duration-300"
              onClick={handleLinkClick}
            >
              About
            </a>
            <a 
              href="#skills" 
              className="text-3xl font-space hover:text-primary transition-colors duration-300"
              onClick={handleLinkClick}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className="text-3xl font-space hover:text-primary transition-colors duration-300"
              onClick={handleLinkClick}
            >
              Projects
            </a>
            <a 
              href="#experience" 
              className="text-3xl font-space hover:text-primary transition-colors duration-300"
              onClick={handleLinkClick}
            >
              Experience
            </a>
            <a 
              href="#contact" 
              className="text-3xl font-space hover:text-primary transition-colors duration-300"
              onClick={handleLinkClick}
            >
              Contact
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
