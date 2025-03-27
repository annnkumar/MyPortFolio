import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar toggleMobileMenu={toggleMobileMenu} />
          <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
          <main className="overflow-x-hidden">
            <Switch>
              <Route path="/" component={HomePage} />
            </Switch>
          </main>
          <Toaster />
        </>
      )}
    </>
  );
}

export default App;
