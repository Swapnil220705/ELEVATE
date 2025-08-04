import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CodeBracketIcon, LightBulbIcon, UsersIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { Linkedin, Github, Instagram } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const values = [
    {
      icon: CodeBracketIcon,
      title: "Innovation First",
      description: "We push boundaries and explore cutting-edge technologies to solve real-world problems."
    },
    {
      icon: LightBulbIcon,
      title: "Creative Thinking",
      description: "Every challenge is an opportunity to think differently and create exceptional solutions."
    },
    {
      icon: UsersIcon,
      title: "Community Driven",
      description: "We believe in the power of collaboration and learning from each other's experiences."
    },
    {
      icon: RocketLaunchIcon,
      title: "Growth Mindset",
      description: "Continuous learning and improvement are at the core of everything we do."
    }
  ];

  const leadership = [
    { name: "Ayush Kathal", role: "Lead", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", bio: "Leading the club with passion for innovation", linkedin: "https://www.linkedin.com/in/ayushkathal2005?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: "https://share.google/ajRrDL8R807nrJLfJ", instagram:"https://www.instagram.com/_ayush_kathal_?igsh=MWxueWVyMjUwdmlmMA==" },
    { name: "Swapnil Jain", role: "Co-Lead", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", bio: "Guiding technical excellence and mentorship", linkedin: "https://www.linkedin.com/in/swapnil-jain-71ab66295/", github: "https://github.com/Swapnil220705", instagram: "https://www.instagram.com/_.swapnil_jain?igsh=MWhjNTdsZ283MTB1aQ==" }
  ];

  const teamNames = ["Tech", "Creatives", "Marketing", "Corporate","Management"];
  const [activeTeam, setActiveTeam] = React.useState("Tech");

  const teams = {
    Tech: [
      { name: "Arnab Mistry", role: "Web-Dev Lead", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"},
      { name: "Kunal Belwalkar", role: "App-Dev Lead", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"},
      { name: "Ojaswi Joshi", role: "Open-Source Lead", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"},
      { name: "Abhist Kamle", role: "Web-3 Lead", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"},
      { name: "Samarth Bhandegaonkar", role: "AI/ML Lead", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"},
      { name: "Suraj Shewale", role: "Web-Dev", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"},
      { name: "Arnav Timble", role: "Web-Dev", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"},
      { name: "Raveena Basarimarad", role: "AI/ML", image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"}
    ],
    Creatives: [
      { name: "Varad Chopade", role: "Design Lead", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"},
      { name: "Rutva Gandhi", role: "Social-Media Lead", image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"}    
    ],
    Marketing: [
      { name: "Manu Shrivastava", role: "Marketing Lead", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"},
      { name: "Sohan Ganji", role: "Marketing Lead", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"}
    
    ],
    Corporate: [
      { name: "Shreyam Prashar", role: "Corporate Lead", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"}
    ],
    Management: [
      { name: "Harshal Mestri", role: "EM Lead", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"},
      { name: "Nakul Maheshwari", role: "EM", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"},
      { name: "Vaidehi Turkar", role: "EM", image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400", linkedin:"#", github:"#", instagram:"#"}
    
    ]
  };

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Elevate
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're more than just a developer club. We're a community of innovators, 
            creators, and problem-solvers dedicated to pushing the boundaries of technology.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-blue-500/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-center mb-4 text-blue-400">Our Mission</h3>
          <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto">
            To create an inclusive environment where students can explore, learn, and build 
            incredible technologies while fostering innovation, collaboration, and personal growth 
            in the ever-evolving world of software development.
          </p>
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
                data-cursor-hover
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white">{value.title}</h4>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Meet the Team</h3>
          
          {/* Leadership Section */}
          <div className="mb-16">
            <h4 className="text-2xl font-semibold text-center mb-8 text-blue-400">Leadership</h4>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
              {leadership.map((leader, index) => (
                <motion.div
                  key={leader.name}
                  className="group relative max-w-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  whileHover={{ y: -10 }}
                  data-cursor-hover
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/20 p-6">
                    <div className="aspect-square overflow-hidden rounded-xl mb-4">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="text-center">
                      <h5 className="text-xl font-bold text-white mb-1">{leader.name}</h5>
                      <p className="text-blue-400 font-semibold mb-3">{leader.role}</p>
                      <p className="text-gray-400 text-sm mb-4">{leader.bio}</p>
                      <div className="flex justify-center space-x-3">
                        <motion.a
                          href={leader.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          data-cursor-hover
                        >
                          <Linkedin className="w-4 h-4 text-white" />
                        </motion.a>

                        <motion.a
                          href={leader.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          data-cursor-hover
                        >
                          <Github className="w-4 h-4 text-white" />
                        </motion.a>

                        <motion.a
                          href={leader.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          data-cursor-hover
                        >
                          <Instagram className="w-4 h-4 text-white" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {teamNames.map((teamName) => (
                <motion.button
                  key={teamName}
                  onClick={() => setActiveTeam(teamName)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative ${
                    activeTeam === teamName
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor-hover
                >
                  {activeTeam === teamName && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                      layoutId="activeTeamTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{teamName}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <motion.div
            key={activeTeam}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {teams[activeTeam as keyof typeof teams].map((member, index) => (
              <motion.div
                key={member.name}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                data-cursor-hover
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Social Media Overlay - FIXED VERSION */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="flex space-x-4">
                        {member.linkedin && (
                          <motion.a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Linkedin className="w-6 h-6 text-white" />
                          </motion.a>
                        )}
                        {member.github && (
                          <motion.a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-6 h-6 text-white" />
                          </motion.a>
                        )}
                        {member.instagram && (
                          <motion.a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Instagram className="w-6 h-6 text-white" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                    
                    {/* Bottom gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  
                  {/* Member info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h5 className="text-lg font-semibold text-white mb-1">{member.name}</h5>
                    <p className="text-blue-400 text-sm mb-2">{member.role}</p>
                    {/* <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-600/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 2 && (
                        <span className="bg-gray-600/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                          +{member.skills.length - 2}
                        </span>
                      )}
                    </div> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;