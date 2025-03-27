import { useState, useEffect } from "react";
import { Link } from "wouter";

interface NavbarProps {
  toggleMobileMenu: () => void;
}

const Navbar = ({ toggleMobileMenu }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300 ${
        scrolled 
          ? "bg-dark bg-opacity-90 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-space font-bold tracking-wider text-white relative overflow-hidden group">
          <span className="relative z-10 group-hover:text-secondary transition-colors duration-300">&lt;AK/&gt;</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
        </Link>
        
        <div className="lg:flex hidden space-x-8">
          <a href="#about" className="text-lg hover:text-secondary transition-colors duration-300 relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#skills" className="text-lg hover:text-secondary transition-colors duration-300 relative group">
            Skills
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#projects" className="text-lg hover:text-secondary transition-colors duration-300 relative group">
            Projects
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#experience" className="text-lg hover:text-secondary transition-colors duration-300 relative group">
            Experience
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#contact" className="text-lg hover:text-secondary transition-colors duration-300 relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
        
        <button 
          className="lg:hidden text-2xl focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
