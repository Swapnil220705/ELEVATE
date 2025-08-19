import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon, 
  CalendarIcon, 
  CodeBracketIcon, 
  BookOpenIcon,
  UserGroupIcon,
  AcademicCapIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import Hero from '../components/Hero';

const Home: React.FC = () => {
  const highlights = [
    {
      title: "Upcoming Events",
      description: "Join our exciting workshops and hackathons",
      icon: CalendarIcon,
      link: "/events",
      color: "from-purple-500 to-blue-500",
      stats: "15+ Events This Month"
    },
    {
      title: "Learning Resources",
      description: "Structured roadmaps for different tech domains",
      icon: BookOpenIcon,
      link: "/resources",
      color: "from-cyan-500 to-blue-500",
      stats: "5+ Domain Roadmaps"
    },
    {
      title: "Amazing Projects",
      description: "Discover innovative projects by our members",
      icon: CodeBracketIcon,
      link: "/projects",
      color: "from-green-500 to-blue-500",
      stats: "100+ Projects"
    },
    {
      title: "Join Our Community",
      description: "Become part of the developer revolution",
      icon: UserGroupIcon,
      link: "/join",
      color: "from-orange-500 to-pink-500",
      stats: "500+ Active Members"
    }
  ];

  const quickStats = [
    { label: "Active Members", value: "500+", icon: UserGroupIcon },
    { label: "Projects Built", value: "100+", icon: CodeBracketIcon },
    { label: "Events Hosted", value: "50+", icon: CalendarIcon },
    { label: "Learning Paths", value: "25+", icon: AcademicCapIcon },
  ];

  const featuredEvents = [
    {
      title: "AI/ML Workshop Series",
      date: "Jan 25, 2025",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
      attendees: 45
    },
    {
      title: "Hackathon 2025",
      date: "Feb 15, 2025", 
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400",
      attendees: 120
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Hero />

      {/* Quick Stats */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Sections Overview */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Explore Our Platform
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover everything Elevate has to offer - from learning resources to exciting events
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" }}
                className="group"
              >
                <Link to={highlight.link}>
                  <div className={`bg-gradient-to-br ${highlight.color} p-1 rounded-2xl`}>
                    <div className="bg-gray-900 rounded-2xl p-8 h-full hover:bg-gray-800 transition-colors">
                      <div className="flex items-center mb-6">
                        <div className={`w-12 h-12 bg-gradient-to-r ${highlight.color} rounded-lg flex items-center justify-center mr-4`}>
                          <highlight.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {highlight.title}
                          </h3>
                          <p className="text-gray-400 text-sm">{highlight.stats}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-6">{highlight.description}</p>
                      <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                        <span>Explore</span>
                        <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Preview */}
      <section className="py-20 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-gray-400">Don't miss out on these exciting opportunities</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.title}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span>{event.date}</span>
                      <span>{event.attendees} interested</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/events">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Events
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-12 border border-blue-500/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TrophyIcon className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Elevate Your Skills?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community of passionate developers and start your journey to excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join">
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Now
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  className="px-8 py-3 border-2 border-blue-500 text-blue-400 font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;