import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface UseThreeParams {
  antialias?: boolean;
  alpha?: boolean;
  clearColor?: string;
}

export const useThree = (container: React.RefObject<HTMLElement>, {
  antialias = true,
  alpha = true,
  clearColor = '#000000'
}: UseThreeParams = {}) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number | null>(null);

  // Setup and cleanup Three.js scene
  useEffect(() => {
    if (!container.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.current.clientWidth / container.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias, alpha });
    renderer.setSize(container.current.clientWidth, container.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (alpha) {
      renderer.setClearColor(0x000000, 0);
    } else {
      renderer.setClearColor(new THREE.Color(clearColor));
    }
    container.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Handle resize
    const handleResize = () => {
      if (!container.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = container.current.clientWidth;
      const height = container.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (container.current && rendererRef.current) {
        container.current.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [container, antialias, alpha, clearColor]);

  // Animation loop wrapper
  const startAnimation = (animationCallback: (time: number) => void) => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    const animate = (time: number) => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      animationCallback(time);
      
      rendererRef.current!.render(sceneRef.current!, cameraRef.current!);
    };
    
    frameIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  };

  return {
    scene: sceneRef,
    camera: cameraRef,
    renderer: rendererRef,
    startAnimation
  };
};
