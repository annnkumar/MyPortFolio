import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene = ({ className = "" }: ThreeSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  // Setup and cleanup the Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Create particle system
    const particleCount = 1500;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color('#8A2BE2'), // primary
      new THREE.Color('#00BFFF'), // secondary
      new THREE.Color('#FF4500') // accent
    ];

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Color
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    particlesRef.current = particleSystem;

    // Mouse move event listener
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Resize event listener
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return;
      
      // Gently move particles
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.001;
        positions[i + 1] += Math.cos(Date.now() * 0.0015 + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Rotate based on mouse position
      particlesRef.current.rotation.x += 0.0003;
      particlesRef.current.rotation.y += 0.0005;
      
      // Subtle camera movement
      cameraRef.current.position.x += (mouseRef.current.x * 0.5 - cameraRef.current.position.x) * 0.05;
      cameraRef.current.position.y += (mouseRef.current.y * 0.5 - cameraRef.current.position.y) * 0.05;
      cameraRef.current.lookAt(scene.position);
      
      rendererRef.current.render(scene, cameraRef.current);
      rafIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    // Fade in particles
    gsap.fromTo(
      particleMaterial,
      { opacity: 0 },
      { opacity: 0.7, duration: 2, ease: 'power2.out' }
    );

    // Cleanup
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
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
  }, []);

  return <div ref={mountRef} className={`absolute inset-0 -z-10 ${className}`} />;
};

export default ThreeScene;
