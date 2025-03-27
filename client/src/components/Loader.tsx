import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Simulate loading progress
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-dark flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="text-center">
        <motion.div 
          className="text-4xl font-space font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          &lt;AK/&gt;
        </motion.div>
        
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
