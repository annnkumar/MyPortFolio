import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { personalInfo } from '@/data/portfolio-data';
import { useGsapFromTo } from '@/hooks/use-gsap';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  });

  // GSAP animations for title and form
  useGsapFromTo(
    '.contact-title',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    { trigger: sectionRef, start: "top 80%" }
  );

  // Mutation for form submission
  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      setFormStatus('success');
      toast({
        title: "Message sent successfully!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      setFormStatus('error');
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    setFormStatus('submitting');
    mutation.mutate(data);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-gray-900 to-dark">
      <div className="container mx-auto px-4">
        <h2 className="contact-title text-4xl md:text-5xl font-space font-bold mb-16 text-center">
          <span className="relative after:content-[''] after:absolute after:-bottom-2 after:left-1/4 after:w-1/2 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary">Let's Connect</span>
        </h2>
        
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Contact Form */}
          <motion.div 
            className="lg:w-1/2 w-full relative z-10 perspective-1000"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form 
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-xl"
            >
              <h3 className="text-2xl font-space font-bold mb-6 text-secondary">Send Me a Message</h3>
              
              <div className="mb-6 perspective-1000 group focus-within:transform-style-3d transition-all duration-300">
                <label className="block text-light mb-2 font-medium" htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className={`w-full bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors`} 
                  placeholder="John Doe" 
                  {...register('name')}
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              
              <div className="mb-6 perspective-1000 group focus-within:transform-style-3d transition-all duration-300">
                <label className="block text-light mb-2 font-medium" htmlFor="email">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className={`w-full bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors`} 
                  placeholder="john@example.com" 
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              
              <div className="mb-6 perspective-1000 group focus-within:transform-style-3d transition-all duration-300">
                <label className="block text-light mb-2 font-medium" htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className={`w-full bg-gray-900 border ${errors.subject ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors`} 
                  placeholder="Project Inquiry" 
                  {...register('subject')}
                />
                {errors.subject && (
                  <p className="mt-1 text-red-500 text-sm">{errors.subject.message}</p>
                )}
              </div>
              
              <div className="mb-6 perspective-1000 group focus-within:transform-style-3d transition-all duration-300">
                <label className="block text-light mb-2 font-medium" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className={`w-full bg-gray-900 border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors`} 
                  placeholder="Hello, I'd like to discuss a project..." 
                  {...register('message')}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>
              
              <motion.button 
                type="submit" 
                className="w-full py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-light font-space font-medium text-lg relative overflow-hidden group disabled:opacity-70"
                disabled={formStatus === 'submitting'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  {formStatus === 'submitting' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </span>
                <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-secondary to-primary"></span>
              </motion.button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-space font-bold mb-6 text-primary">Contact Information</h3>
              <p className="mb-6 text-lg">Feel free to reach out to me for any inquiries, collaborations, or just to say hello!</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                    <i className="fas fa-envelope text-primary"></i>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${personalInfo.email}`} className="text-secondary hover:underline">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center">
                    <i className="fas fa-phone text-secondary"></i>
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href={`tel:${personalInfo.phone}`} className="text-secondary hover:underline">
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent bg-opacity-20 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-accent"></i>
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p>{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="text-xl font-space font-bold mb-4">Connect with me</h3>
              <div className="flex gap-4">
                <motion.a 
                  href={personalInfo.socials.github} 
                  className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                >
                  <i className="fab fa-github text-xl"></i>
                </motion.a>
                <motion.a 
                  href={personalInfo.socials.linkedin} 
                  className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-secondary transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in text-xl"></i>
                </motion.a>
                <motion.a 
                  href={personalInfo.socials.twitter} 
                  className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
