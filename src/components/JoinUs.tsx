import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { memberAPI, handleApiError, isEmailValid, debounce } from '../utils/api';
import { 
  UserPlusIcon, 
  AcademicCapIcon, 
  TrophyIcon, 
  HeartIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const JoinUs: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    year: '',
    interests: [],
    experience: '',
    motivation: '',
    phone: '',
    github: '',
    linkedin: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const benefits = [
    {
      icon: AcademicCapIcon,
      title: "Learn & Grow",
      description: "Access to workshops, mentorship, and cutting-edge tech resources."
    },
    {
      icon: UserPlusIcon,
      title: "Network",
      description: "Connect with like-minded developers and industry professionals."
    },
    {
      icon: TrophyIcon,
      title: "Compete",
      description: "Participate in hackathons and coding competitions with prizes."
    },
    {
      icon: HeartIcon,
      title: "Contribute",
      description: "Work on open-source projects and make a real impact."
    }
  ];

  const interests = [
    'Web Development',
    'Mobile Development',
    'AI/Machine Learning',
    'Data Science',
    'Blockchain',
    'IoT',
    'Cybersecurity',
    'Game Development',
    'DevOps',
    'UI/UX Design'
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      year: "3rd Year CS",
      text: "Elevate helped me land my dream internship at Google. The community is incredibly supportive!",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Rahul Patel",
      year: "2nd Year IT",
      text: "The workshops and hackathons at Elevate pushed me to explore technologies I never thought I'd touch.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Anjali Singh",
      year: "4th Year ECE",
      text: "From a complete beginner to leading AI projects - Elevate made it all possible!",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (submitError) setSubmitError('');
    if (name === 'email' && emailExists) setEmailExists(false);
  };

  // Debounced email check
  const checkEmailExists = debounce(async (email: string) => {
    if (!isEmailValid(email)) return;
    
    setIsCheckingEmail(true);
    try {
      const response = await memberAPI.checkEmail(email);
      setEmailExists(response.exists);
    } catch (error) {
      console.error('Email check failed:', error);
    } finally {
      setIsCheckingEmail(false);
    }
  }, 500);

  // Handle email input with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    handleInputChange(e);
    
    if (email && isEmailValid(email)) {
      checkEmailExists(email);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.year || 
        !formData.motivation.trim() || formData.interests.length === 0) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    if (!isEmailValid(formData.email)) {
      setSubmitError('Please enter a valid email address');
      return;
    }

    if (emailExists) {
      setSubmitError('This email is already registered');
      return;
    }

    submitForm();
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await memberAPI.join(formData);
      setIsSubmitted(true);
    } catch (error: any) {
      setSubmitError(handleApiError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="join" className="py-20 relative" ref={ref}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-12 border border-green-500/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckIcon className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold text-white mb-4">Welcome to Elevate! 🎉</h2>
            <p className="text-xl text-gray-300 mb-6">
              Thank you for joining our community! We'll be in touch soon with details about 
              upcoming events and how to get started.
            </p>
            <p className="text-gray-400">
              Check your email for a welcome message and join our Discord server to connect 
              with other members right away!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="join" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Join the Revolution
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            🚀 Ready to elevate your coding journey? Join a community of passionate 
            developers, innovators, and problem-solvers!
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 group text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(249, 115, 22, 0.3)" }}
              data-cursor-hover
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg mb-4 mx-auto group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">What Our Members Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                data-cursor-hover
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.year}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Form */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Ready to Join? Fill out the form below! ⚡
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors"
                    placeholder="Enter your full name"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    required
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                      emailExists 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-600 focus:border-orange-500 focus:ring-orange-500/20'
                    }`}
                    placeholder="your.email@example.com"
                    whileFocus={{ scale: 1.02 }}
                  />
                  {isCheckingEmail && (
                    <div className="flex items-center mt-2 text-sm text-gray-400">
                      <div className="animate-spin w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full mr-2"></div>
                      Checking email...
                    </div>
                  )}
                  {emailExists && (
                    <div className="flex items-center mt-2 text-sm text-red-400">
                      <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
                      This email is already registered
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Academic Year *
                </label>
                <motion.select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors"
                  whileFocus={{ scale: 1.02 }}
                >
                  <option value="">Select your year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                  <option value="graduate">Graduate</option>
                </motion.select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Areas of Interest (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {interests.map((interest) => (
                    <motion.button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all duration-300 ${
                        formData.interests.includes(interest)
                          ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white border-transparent'
                          : 'bg-gray-800 text-gray-300 border-gray-600 hover:border-orange-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor-hover
                    >
                      {interest}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Experience Level
                </label>
                <motion.select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors"
                  whileFocus={{ scale: 1.02 }}
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner (Just starting out)</option>
                  <option value="intermediate">Intermediate (Some projects/courses)</option>
                  <option value="advanced">Advanced (Multiple projects/internships)</option>
                  <option value="expert">Expert (Professional experience)</option>
                </motion.select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Phone Number (Optional)
                  </label>
                  <motion.input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors"
                    placeholder="+1 (555) 123-4567"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    GitHub Profile (Optional)
                  </label>
                  <motion.input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors"
                    placeholder="https://github.com/yourusername"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  LinkedIn Profile (Optional)
                </label>
                <motion.input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors"
                  placeholder="https://linkedin.com/in/yourprofile"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Why do you want to join Elevate? *
                </label>
                <motion.textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors resize-none"
                  placeholder="Tell us about your goals, what you hope to learn, or how you want to contribute..."
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              {submitError && (
                <motion.div
                  className="bg-red-900/50 border border-red-500 rounded-lg p-4 flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                  <span className="text-red-200">{submitError}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting || emailExists}
                className={`w-full py-4 text-white font-bold rounded-lg transition-all duration-300 text-lg flex items-center justify-center ${
                  isSubmitting || emailExists
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700'
                }`}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                    Submitting...
                  </>
                ) : (
                  '🚀 Join the Dev Revolution!'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinUs;