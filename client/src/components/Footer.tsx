import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          className="text-2xl font-space font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          &lt;AK/&gt;
        </motion.div>
        
        <motion.p 
          className="mb-6 opacity-80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Building innovative solutions through code.
        </motion.p>
        
        <motion.p 
          className="text-sm opacity-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          &copy; {currentYear} Ankit Kumar. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
