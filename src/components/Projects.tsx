import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CodeBracketIcon, EyeIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Web', 'Mobile', 'AI/ML', 'IoT', 'Blockchain'];

  const projects = [
    {
      id: 1,
      title: "EcoTrack",
      description: "A sustainability tracking app that helps users monitor their carbon footprint and suggests eco-friendly alternatives.",
      image: "https://images.pexels.com/photos/3008961/pexels-photo-3008961.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ['Web', 'Mobile'],
      technologies: ['React', 'Node.js', 'MongoDB', 'React Native'],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      featured: true
    },
    {
      id: 2,
      title: "Smart Campus Navigator",
      description: "An AR-based navigation system for college campus with real-time crowd density and indoor mapping.",
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ['Mobile', 'IoT'],
      technologies: ['Unity', 'ARCore', 'Firebase', 'IoT Sensors'],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      featured: true
    },
    {
      id: 3,
      title: "StudyBuddy AI",
      description: "An intelligent study companion that creates personalized learning paths and provides instant doubt resolution.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ['AI/ML', 'Web'],
      technologies: ['Python', 'TensorFlow', 'Flask', 'OpenAI API'],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      featured: false
    },
    {
      id: 4,
      title: "DeFi Portfolio Tracker",
      description: "A comprehensive DeFi portfolio management tool with automated yield farming strategies and risk assessment.",
      image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ['Blockchain', 'Web'],
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      featured: false
    },
    {
      id: 5,
      title: "HealthNet IoT",
      description: "IoT-based health monitoring system for elderly care with emergency detection and family notifications.",
      image: "https://images.pexels.com/photos/3785074/pexels-photo-3785074.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ['IoT', 'Mobile'],
      technologies: ['Arduino', 'Raspberry Pi', 'Flutter', 'Firebase'],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      featured: false
    },
    {
      id: 6,
      title: "CodeMentor Platform",
      description: "A peer-to-peer learning platform connecting students with experienced developers for mentorship and code reviews.",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ['Web'],
      technologies: ['Next.js', 'PostgreSQL', 'Socket.io', 'Docker'],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      featured: true
    }
  ];

  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(selectedFilter));

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Our Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover the innovative solutions built by our talented community members. 
            From web apps to AI models, we create technology that makes a difference.
          </p>
        </motion.div>

        {/* Featured Projects
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Projects</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)" }}
                data-cursor-hover
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-600/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <motion.a
                      href={project.githubUrl}
                      className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor-hover
                    >
                      <CodeBracketIcon className="w-4 h-4 mr-2" />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.liveUrl}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor-hover
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                      Live Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* All Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                style={{ transformStyle: 'preserve-3d' }}
                data-cursor-hover
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2 py-1 rounded text-xs font-bold">
                        FEATURED
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-600/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                        +{project.technologies.length - 2}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <motion.a
                      href={project.githubUrl}
                      className="flex items-center px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-xs flex-1 justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor-hover
                    >
                      <CodeBracketIcon className="w-4 h-4 mr-1" />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.liveUrl}
                      className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-xs flex-1 justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor-hover
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Want to showcase your project?</h3>
            <p className="text-gray-400 mb-6">Join Elevate and get featured in our project gallery!</p>
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              Submit Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;