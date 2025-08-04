import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon,
  HeartIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const socialLinks = [
    { name: 'Discord', url: 'https://discord.gg/elevate', icon: '💬' },
    { name: 'GitHub', url: 'https://github.com/elevate-dev-club', icon: '🐙' },
    { name: 'Instagram', url: 'https://instagram.com/elevate_dev', icon: '📸' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/elevate-dev', icon: '💼' },
    { name: 'Twitter', url: 'https://twitter.com/elevate_dev', icon: '🐦' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Projects', href: '#projects' },
    { name: 'Join Us', href: '#join' },
    { name: 'Contact', href: '#contact' },
  ];

  const resources = [
    { name: 'Learning Paths', href: '#' },
    { name: 'Code Reviews', href: '#' },
    { name: 'Tech Blog', href: '#' },
    { name: 'Mentorship', href: '#' },
    { name: 'Open Source', href: '#' },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    setSubscriptionStatus('idle');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscriptionStatus('success');
        setMessage('Successfully subscribed to our newsletter!');
        setEmail('');
      } else {
        setSubscriptionStatus('error');
        setMessage(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setSubscriptionStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubscribing(false);
      setTimeout(() => {
        setSubscriptionStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-t from-black to-gray-900 border-t border-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CodeBracketIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Elevate
              </span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Empowering the next generation of developers through innovation, 
              collaboration, and continuous learning. Join us in building the future of technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-lg mb-4">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">
                    IIIT Nagpur<br />
                    Butibori-441108, Maharashtra, India
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <a 
                  href="mailto:elevate@iiitn.ac.in"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  elevate@iiitn.ac.in
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a 
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  +1 (234) 567-8900
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Signup with Backend Integration */}
        <motion.div
          className="border-t border-gray-800 pt-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-white font-semibold text-lg mb-2">
                  Stay Updated! 📧
                </h3>
                <p className="text-gray-400 text-sm">
                  Get the latest updates on events, workshops, and opportunities.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors disabled:opacity-50"
                  disabled={isSubscribing}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleNewsletterSubmit(e);
                    }
                  }}
                />
                <motion.button
                  onClick={handleNewsletterSubmit}
                  disabled={isSubscribing || !email.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubscribing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Subscribe</span>
                  )}
                </motion.button>
              </div>
            </div>
            
            {/* Subscription Status */}
            {subscriptionStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center space-x-2 text-sm mt-4 ${
                  subscriptionStatus === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {subscriptionStatus === 'success' ? (
                  <CheckCircleIcon className="w-4 h-4" />
                ) : (
                  <ExclamationTriangleIcon className="w-4 h-4" />
                )}
                <span>{message}</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>© {currentYear} Elevate Dev Club. Made with</span>
            <HeartIcon className="w-4 h-4 text-red-500" />
            <span>by students, for students.</span>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a 
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Code of Conduct
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center z-40"
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="text-xl">↑</span>
      </motion.button>
    </footer>
  );
};

export default Footer;