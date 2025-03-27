import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface FloatingParticlesProps {
  count?: number;
  size?: number;
  color?: string;
  className?: string;
}

const FloatingParticles = ({
  count = 300,
  size = 0.05,
  color = '#8A2BE2',
  className = ""
}: FloatingParticlesProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Create particle system
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Position
      positions[i3] = (Math.random() - 0.5) * 15;
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = (Math.random() - 0.5) * 15;

      // Velocity
      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.userData.velocities = velocities;

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Resize function
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return;
      
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = particlesRef.current.geometry.userData.velocities as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Update positions based on velocity
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Boundaries check - if particle goes out of bounds, reset its position
        if (Math.abs(positions[i]) > 7.5) {
          positions[i] = -positions[i] * 0.95;
          velocities[i] = -velocities[i] * 0.9;
        }
        
        if (Math.abs(positions[i + 1]) > 7.5) {
          positions[i + 1] = -positions[i + 1] * 0.95;
          velocities[i + 1] = -velocities[i + 1] * 0.9;
        }
        
        if (Math.abs(positions[i + 2]) > 7.5) {
          positions[i + 2] = -positions[i + 2] * 0.95;
          velocities[i + 2] = -velocities[i + 2] * 0.9;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y += 0.0005;
      
      rendererRef.current.render(scene, cameraRef.current);
      rafIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Fade in
    gsap.fromTo(
      material,
      { opacity: 0 },
      { opacity: 0.6, duration: 2, ease: 'power2.inOut' }
    );

    // Cleanup
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [count, size, color]);

  return <div ref={mountRef} className={`absolute inset-0 -z-10 ${className}`} />;
};

export default FloatingParticles;
