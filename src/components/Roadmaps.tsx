import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MapIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  RocketLaunchIcon,
  ArrowTopRightOnSquareIcon,
  PlayIcon,
  DocumentTextIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  TrophyIcon,
  FireIcon,
  LightBulbIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Roadmaps: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeRoadmap, setActiveRoadmap] = useState('web-development');
  const [completedTopics, setCompletedTopics] = useState<{[key: string]: boolean}>({});

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('roadmap-progress');
    if (savedProgress) {
      setCompletedTopics(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: {[key: string]: boolean}) => {
    localStorage.setItem('roadmap-progress', JSON.stringify(newProgress));
  };

  const toggleTopicCompletion = (roadmapId: string, phaseIndex: number, topicIndex: number) => {
    const key = `${roadmapId}-${phaseIndex}-${topicIndex}`;
    const newProgress = {
      ...completedTopics,
      [key]: !completedTopics[key]
    };
    setCompletedTopics(newProgress);
    saveProgress(newProgress);
  };

  const calculateProgress = (roadmapId: string, phases: any[]) => {
    let totalTopics = 0;
    let completedCount = 0;

    phases.forEach((phase, phaseIndex) => {
      phase.topics.forEach((_: any, topicIndex: number) => {
        totalTopics++;
        const key = `${roadmapId}-${phaseIndex}-${topicIndex}`;
        if (completedTopics[key]) {
          completedCount++;
        }
      });
    });

    return totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
  };

  const roadmapCategories = [
    { id: 'web-development', label: 'Web Development', icon: CodeBracketIcon, color: 'from-blue-500 to-cyan-500' },
    { id: 'mobile-development', label: 'Mobile Development', icon: RocketLaunchIcon, color: 'from-purple-500 to-pink-500' },
    { id: 'ai-ml', label: 'AI/ML', icon: AcademicCapIcon, color: 'from-green-500 to-emerald-500' },
    { id: 'data-science', label: 'Data Science', icon: DocumentTextIcon, color: 'from-orange-500 to-red-500' },
    { id: 'devops', label: 'DevOps', icon: BriefcaseIcon, color: 'from-indigo-500 to-purple-500' },
  ];

  const roadmaps = {
    'web-development': {
      title: "Web Development Roadmap",
      description: "Complete path from beginner to full-stack developer",
      duration: "6-12 months",
      difficulty: "Beginner to Advanced",
      image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600",
      totalStudents: 1250,
      rating: 4.8,
      phases: [
        {
          phase: "Phase 1: Foundations",
          duration: "2-3 months",
          description: "Master the building blocks of web development",
          topics: [
            { name: "HTML5 & Semantic Markup", description: "Structure and meaning in web pages" },
            { name: "CSS3 & Responsive Design", description: "Styling and layout techniques" },
            { name: "JavaScript Fundamentals", description: "Programming logic and syntax" },
            { name: "DOM Manipulation", description: "Interactive web page behavior" },
            { name: "Git & Version Control", description: "Code management and collaboration" }
          ],
          resources: [
            { name: "MDN Web Docs", url: "https://developer.mozilla.org", type: "Documentation", icon: "📚" },
            { name: "freeCodeCamp", url: "https://freecodecamp.org", type: "Interactive", icon: "💻" },
            { name: "JavaScript.info", url: "https://javascript.info", type: "Tutorial", icon: "📖" }
          ]
        },
        {
          phase: "Phase 2: Frontend Frameworks",
          duration: "2-3 months",
          description: "Build modern, interactive user interfaces",
          topics: [
            { name: "React.js Fundamentals", description: "Component-based UI development" },
            { name: "State Management (Redux/Context)", description: "Managing application state" },
            { name: "Component Libraries (Material-UI/Tailwind)", description: "Pre-built UI components" },
            { name: "API Integration", description: "Connecting to backend services" },
            { name: "Testing (Jest/React Testing Library)", description: "Ensuring code quality" }
          ],
          resources: [
            { name: "React Documentation", url: "https://react.dev", type: "Official Docs", icon: "⚛️" },
            { name: "React Router", url: "https://reactrouter.com", type: "Library", icon: "🛣️" },
            { name: "Tailwind CSS", url: "https://tailwindcss.com", type: "Framework", icon: "🎨" }
          ]
        },
        {
          phase: "Phase 3: Backend Development",
          duration: "2-3 months",
          description: "Server-side programming and databases",
          topics: [
            { name: "Node.js & Express.js", description: "Server-side JavaScript development" },
            { name: "Database Design (MongoDB/PostgreSQL)", description: "Data storage and retrieval" },
            { name: "RESTful APIs", description: "Building web services" },
            { name: "Authentication & Authorization", description: "User security and access control" },
            { name: "Server Deployment", description: "Making applications live" }
          ],
          resources: [
            { name: "Node.js Documentation", url: "https://nodejs.org", type: "Official Docs", icon: "🟢" },
            { name: "Express.js Guide", url: "https://expressjs.com", type: "Framework", icon: "🚀" },
            { name: "MongoDB University", url: "https://university.mongodb.com", type: "Course", icon: "🍃" }
          ]
        },
        {
          phase: "Phase 4: Advanced Topics",
          duration: "2-3 months",
          description: "Professional development practices",
          topics: [
            { name: "TypeScript", description: "Type-safe JavaScript development" },
            { name: "GraphQL", description: "Modern API query language" },
            { name: "Microservices Architecture", description: "Scalable system design" },
            { name: "Performance Optimization", description: "Fast, efficient applications" },
            { name: "CI/CD Pipelines", description: "Automated deployment workflows" }
          ],
          resources: [
            { name: "TypeScript Handbook", url: "https://typescriptlang.org", type: "Documentation", icon: "📘" },
            { name: "GraphQL", url: "https://graphql.org", type: "Query Language", icon: "🔗" },
            { name: "Docker", url: "https://docker.com", type: "Containerization", icon: "🐳" }
          ]
        }
      ]
    },
    'mobile-development': {
      title: "Mobile Development Roadmap",
      description: "Build native and cross-platform mobile applications",
      duration: "4-8 months",
      difficulty: "Beginner to Advanced",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
      totalStudents: 890,
      rating: 4.7,
      phases: [
        {
          phase: "Phase 1: Mobile Fundamentals",
          duration: "1-2 months",
          description: "Understanding mobile app development principles",
          topics: [
            { name: "Mobile App Design Principles", description: "UI/UX best practices for mobile" },
            { name: "Platform Guidelines (iOS/Android)", description: "Native design standards" },
            { name: "User Experience for Mobile", description: "Touch interactions and navigation" },
            { name: "Mobile Development Overview", description: "Native vs Cross-platform approaches" }
          ],
          resources: [
            { name: "Apple Human Interface Guidelines", url: "https://developer.apple.com/design", type: "Guidelines", icon: "🍎" },
            { name: "Material Design", url: "https://material.io", type: "Design System", icon: "🎨" },
            { name: "Mobile UX Best Practices", url: "#", type: "Article", icon: "📱" }
          ]
        },
        {
          phase: "Phase 2: Cross-Platform Development",
          duration: "2-3 months",
          description: "Build apps for multiple platforms",
          topics: [
            { name: "React Native Fundamentals", description: "Cross-platform mobile development" },
            { name: "Navigation & Routing", description: "App navigation patterns" },
            { name: "State Management", description: "Managing app state across screens" },
            { name: "Native Modules Integration", description: "Accessing device features" },
            { name: "Device APIs (Camera, GPS, etc.)", description: "Hardware integration" }
          ],
          resources: [
            { name: "React Native Docs", url: "https://reactnative.dev", type: "Framework", icon: "⚛️" },
            { name: "Expo", url: "https://expo.dev", type: "Platform", icon: "🚀" },
            { name: "React Navigation", url: "https://reactnavigation.org", type: "Library", icon: "🧭" }
          ]
        },
        {
          phase: "Phase 3: Native Development",
          duration: "2-3 months",
          description: "Platform-specific development skills",
          topics: [
            { name: "Swift/Kotlin Basics", description: "Native programming languages" },
            { name: "Platform-Specific Features", description: "iOS/Android unique capabilities" },
            { name: "Performance Optimization", description: "Fast, responsive mobile apps" },
            { name: "App Store Guidelines", description: "Publishing requirements" },
            { name: "Testing & Debugging", description: "Quality assurance practices" }
          ],
          resources: [
            { name: "Swift Documentation", url: "https://swift.org", type: "Language", icon: "🦉" },
            { name: "Kotlin for Android", url: "https://kotlinlang.org", type: "Language", icon: "🤖" },
            { name: "Xcode", url: "https://developer.apple.com/xcode", type: "IDE", icon: "🛠️" }
          ]
        }
      ]
    },
    'ai-ml': {
      title: "AI/ML Roadmap",
      description: "Master artificial intelligence and machine learning",
      duration: "8-12 months",
      difficulty: "Intermediate to Advanced",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
      totalStudents: 756,
      rating: 4.9,
      phases: [
        {
          phase: "Phase 1: Mathematical Foundations",
          duration: "2-3 months",
          description: "Essential math concepts for AI/ML",
          topics: [
            { name: "Linear Algebra", description: "Vectors, matrices, and operations" },
            { name: "Statistics & Probability", description: "Data analysis fundamentals" },
            { name: "Calculus", description: "Derivatives and optimization" },
            { name: "Python Programming", description: "Programming language for AI/ML" }
          ],
          resources: [
            { name: "Khan Academy Math", url: "https://khanacademy.org", type: "Course", icon: "📊" },
            { name: "3Blue1Brown", url: "https://youtube.com/3blue1brown", type: "Video", icon: "🎥" },
            { name: "Python.org", url: "https://python.org", type: "Language", icon: "🐍" }
          ]
        },
        {
          phase: "Phase 2: Machine Learning Basics",
          duration: "3-4 months",
          description: "Core ML algorithms and techniques",
          topics: [
            { name: "Supervised Learning", description: "Classification and regression" },
            { name: "Unsupervised Learning", description: "Clustering and dimensionality reduction" },
            { name: "Feature Engineering", description: "Data preprocessing and selection" },
            { name: "Model Evaluation", description: "Performance metrics and validation" },
            { name: "Scikit-learn", description: "Python ML library" }
          ],
          resources: [
            { name: "Scikit-learn", url: "https://scikit-learn.org", type: "Library", icon: "🔬" },
            { name: "Coursera ML Course", url: "https://coursera.org", type: "Course", icon: "🎓" },
            { name: "Kaggle Learn", url: "https://kaggle.com/learn", type: "Platform", icon: "🏆" }
          ]
        },
        {
          phase: "Phase 3: Deep Learning",
          duration: "3-4 months",
          description: "Neural networks and advanced AI",
          topics: [
            { name: "Neural Networks", description: "Fundamentals of deep learning" },
            { name: "TensorFlow/PyTorch", description: "Deep learning frameworks" },
            { name: "Computer Vision", description: "Image processing and recognition" },
            { name: "Natural Language Processing", description: "Text analysis and generation" },
            { name: "Model Deployment", description: "Production AI systems" }
          ],
          resources: [
            { name: "TensorFlow", url: "https://tensorflow.org", type: "Framework", icon: "🧠" },
            { name: "PyTorch", url: "https://pytorch.org", type: "Framework", icon: "🔥" },
            { name: "Fast.ai", url: "https://fast.ai", type: "Course", icon: "⚡" }
          ]
        }
      ]
    },
    'data-science': {
      title: "Data Science Roadmap",
      description: "Extract insights from data using statistical methods",
      duration: "6-10 months",
      difficulty: "Beginner to Advanced",
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600",
      totalStudents: 634,
      rating: 4.6,
      phases: [
        {
          phase: "Phase 1: Data Fundamentals",
          duration: "2 months",
          description: "Foundation skills for data science",
          topics: [
            { name: "Python/R Programming", description: "Programming languages for data science" },
            { name: "Statistics Basics", description: "Descriptive and inferential statistics" },
            { name: "Data Types & Structures", description: "Understanding different data formats" },
            { name: "SQL Fundamentals", description: "Database querying and management" }
          ],
          resources: [
            { name: "Python for Data Science", url: "https://python.org", type: "Language", icon: "🐍" },
            { name: "R Documentation", url: "https://r-project.org", type: "Language", icon: "📈" },
            { name: "SQL Tutorial", url: "https://w3schools.com/sql", type: "Tutorial", icon: "🗃️" }
          ]
        },
        {
          phase: "Phase 2: Data Analysis",
          duration: "2-3 months",
          description: "Analyzing and visualizing data",
          topics: [
            { name: "Pandas & NumPy", description: "Data manipulation libraries" },
            { name: "Data Cleaning", description: "Preparing data for analysis" },
            { name: "Exploratory Data Analysis", description: "Understanding data patterns" },
            { name: "Data Visualization", description: "Creating meaningful charts and graphs" }
          ],
          resources: [
            { name: "Pandas Documentation", url: "https://pandas.pydata.org", type: "Library", icon: "🐼" },
            { name: "Matplotlib", url: "https://matplotlib.org", type: "Visualization", icon: "📊" },
            { name: "Seaborn", url: "https://seaborn.pydata.org", type: "Visualization", icon: "🎨" }
          ]
        },
        {
          phase: "Phase 3: Advanced Analytics",
          duration: "2-3 months",
          description: "Advanced data science techniques",
          topics: [
            { name: "Machine Learning for Data Science", description: "Predictive modeling" },
            { name: "Time Series Analysis", description: "Analyzing temporal data" },
            { name: "A/B Testing", description: "Experimental design and analysis" },
            { name: "Big Data Tools", description: "Handling large datasets" }
          ],
          resources: [
            { name: "Apache Spark", url: "https://spark.apache.org", type: "Big Data", icon: "⚡" },
            { name: "Tableau", url: "https://tableau.com", type: "Visualization", icon: "📈" },
            { name: "Power BI", url: "https://powerbi.microsoft.com", type: "Analytics", icon: "📊" }
          ]
        }
      ]
    },
    'devops': {
      title: "DevOps Roadmap",
      description: "Bridge development and operations for efficient delivery",
      duration: "4-8 months",
      difficulty: "Intermediate to Advanced",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
      totalStudents: 523,
      rating: 4.7,
      phases: [
        {
          phase: "Phase 1: Infrastructure Basics",
          duration: "1-2 months",
          description: "Foundation of DevOps practices",
          topics: [
            { name: "Linux Command Line", description: "System administration basics" },
            { name: "Networking Fundamentals", description: "How systems communicate" },
            { name: "Cloud Platforms (AWS/Azure/GCP)", description: "Cloud computing services" },
            { name: "Version Control (Git)", description: "Code collaboration and management" }
          ],
          resources: [
            { name: "Linux Journey", url: "https://linuxjourney.com", type: "Tutorial", icon: "🐧" },
            { name: "AWS Documentation", url: "https://aws.amazon.com/documentation", type: "Cloud", icon: "☁️" },
            { name: "Git Documentation", url: "https://git-scm.com", type: "Tool", icon: "📝" }
          ]
        },
        {
          phase: "Phase 2: Containerization",
          duration: "1-2 months",
          description: "Application packaging and orchestration",
          topics: [
            { name: "Docker Fundamentals", description: "Container technology basics" },
            { name: "Container Orchestration", description: "Managing multiple containers" },
            { name: "Kubernetes", description: "Container orchestration platform" },
            { name: "Container Security", description: "Securing containerized applications" }
          ],
          resources: [
            { name: "Docker Documentation", url: "https://docker.com", type: "Platform", icon: "🐳" },
            { name: "Kubernetes", url: "https://kubernetes.io", type: "Orchestration", icon: "⚙️" },
            { name: "Docker Hub", url: "https://hub.docker.com", type: "Registry", icon: "🏪" }
          ]
        },
        {
          phase: "Phase 3: CI/CD & Automation",
          duration: "2-3 months",
          description: "Automated deployment and monitoring",
          topics: [
            { name: "CI/CD Pipelines", description: "Automated testing and deployment" },
            { name: "Infrastructure as Code", description: "Managing infrastructure with code" },
            { name: "Monitoring & Logging", description: "System observability" },
            { name: "Security & Compliance", description: "DevSecOps practices" }
          ],
          resources: [
            { name: "Jenkins", url: "https://jenkins.io", type: "CI/CD", icon: "🔧" },
            { name: "Terraform", url: "https://terraform.io", type: "IaC", icon: "🏗️" },
            { name: "Prometheus", url: "https://prometheus.io", type: "Monitoring", icon: "📊" }
          ]
        }
      ]
    }
  };

  const currentRoadmap = roadmaps[activeRoadmap as keyof typeof roadmaps];
  const currentProgress = calculateProgress(activeRoadmap, currentRoadmap.phases);

  return (
    <section id="roadmaps" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Learning Roadmaps
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interactive learning paths with progress tracking. Master different technology domains 
            step by step with our comprehensive roadmaps! 🗺️✨
          </p>
        </motion.div>

        {/* Roadmap Category Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {roadmapCategories.map((category) => {
            const progress = calculateProgress(category.id, roadmaps[category.id as keyof typeof roadmaps].phases);
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveRoadmap(category.id)}
                className={`relative flex flex-col items-center px-6 py-4 rounded-2xl text-sm font-medium transition-all duration-300 min-w-[140px] ${
                  activeRoadmap === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-blue-500/25`
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
              >
                <category.icon className="w-6 h-6 mb-2" />
                <span className="text-center leading-tight">{category.label}</span>
                {progress > 0 && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {progress}%
                  </div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Roadmap Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoadmap}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {/* Roadmap Header */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 mb-8 border border-gray-700 relative overflow-hidden">
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

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={currentRoadmap.image}
                        alt={currentRoadmap.title}
                        className="w-40 h-40 rounded-2xl object-cover shadow-2xl"
                      />
                      <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-lg">
                        {currentProgress}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-4xl font-bold text-white mb-4">{currentRoadmap.title}</h3>
                    <p className="text-gray-400 text-lg mb-6">{currentRoadmap.description}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="bg-blue-600/20 text-blue-400 px-4 py-3 rounded-xl text-center">
                        <ClockIcon className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-sm font-medium">{currentRoadmap.duration}</div>
                      </div>
                      <div className="bg-purple-600/20 text-purple-400 px-4 py-3 rounded-xl text-center">
                        <AcademicCapIcon className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-sm font-medium">{currentRoadmap.difficulty}</div>
                      </div>
                      <div className="bg-green-600/20 text-green-400 px-4 py-3 rounded-xl text-center">
                        <UserGroupIcon className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-sm font-medium">{currentRoadmap.totalStudents.toLocaleString()} Students</div>
                      </div>
                      <div className="bg-yellow-600/20 text-yellow-400 px-4 py-3 rounded-xl text-center">
                        <StarIcon className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-sm font-medium">{currentRoadmap.rating} Rating</div>
                      </div>
                    </div>

                    {/* Overall Progress Bar */}
                    <div className="bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentProgress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <div className="text-sm text-gray-400 text-center lg:text-left">
                      Overall Progress: {currentProgress}% Complete
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Roadmap Phases */}
            <div className="space-y-8">
              {currentRoadmap.phases.map((phase, phaseIndex) => {
                const phaseTopics = phase.topics.length;
                const phaseCompleted = phase.topics.filter((_, topicIndex) => 
                  completedTopics[`${activeRoadmap}-${phaseIndex}-${topicIndex}`]
                ).length;
                const phaseProgress = phaseTopics > 0 ? Math.round((phaseCompleted / phaseTopics) * 100) : 0;

                return (
                  <motion.div
                    key={phaseIndex}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: phaseIndex * 0.1 }}
                  >
                    {/* Phase Header */}
                    <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-6 border-b border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {phaseIndex + 1}
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-white mb-1">{phase.phase}</h4>
                            <p className="text-cyan-400 text-sm">{phase.duration}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-cyan-400 mb-1">
                            {phaseProgress}%
                          </div>
                          <div className="text-xs text-gray-400">
                            {phaseCompleted}/{phaseTopics} completed
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{phase.description}</p>
                      
                      {/* Phase Progress Bar */}
                      <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${phaseProgress}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        />
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Topics */}
                        <div>
                          <h5 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <ChartBarIcon className="w-6 h-6 mr-3 text-cyan-400" />
                            Learning Topics
                          </h5>
                          <div className="space-y-4">
                            {phase.topics.map((topic, topicIndex) => {
                              const isCompleted = completedTopics[`${activeRoadmap}-${phaseIndex}-${topicIndex}`];
                              return (
                                <motion.div
                                  key={topicIndex}
                                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                                    isCompleted 
                                      ? 'bg-green-500/10 border-green-500/30 shadow-lg shadow-green-500/10' 
                                      : 'bg-gray-800/50 border-gray-600 hover:border-cyan-500/50 hover:bg-gray-700/50'
                                  }`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.4, delay: topicIndex * 0.1 }}
                                  whileHover={{ scale: 1.02 }}
                                  onClick={() => toggleTopicCompletion(activeRoadmap, phaseIndex, topicIndex)}
                                >
                                  <div className="flex items-start space-x-4">
                                    <motion.div 
                                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                        isCompleted 
                                          ? 'bg-green-500' 
                                          : 'bg-gray-600 border-2 border-gray-500'
                                      }`}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      {isCompleted && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          <CheckCircleIcon className="w-4 h-4 text-white" />
                                        </motion.div>
                                      )}
                                    </motion.div>
                                    <div className="flex-1">
                                      <h6 className={`font-medium mb-1 ${
                                        isCompleted ? 'text-green-400' : 'text-white'
                                      }`}>
                                        {topic.name}
                                      </h6>
                                      <p className="text-gray-400 text-sm">
                                        {topic.description}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Resources */}
                        <div>
                          <h5 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <DocumentTextIcon className="w-6 h-6 mr-3 text-blue-400" />
                            Learning Resources
                          </h5>
                          <div className="space-y-4">
                            {phase.resources.map((resource, resourceIndex) => (
                              <motion.a
                                key={resourceIndex}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 group border border-gray-600 hover:border-blue-500/50"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: resourceIndex * 0.1 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                              >
                                <div className="flex items-center space-x-4">
                                  <div className="text-2xl">{resource.icon}</div>
                                  <div>
                                    <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                      {resource.name}
                                    </div>
                                    <div className="text-gray-400 text-sm">{resource.type}</div>
                                  </div>
                                </div>
                                <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                              </motion.a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Achievement Section */}
            {currentProgress === 100 && (
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-3xl p-8 border border-yellow-500/20 max-w-2xl mx-auto">
                  <TrophyIcon className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-4">🎉 Congratulations!</h3>
                  <p className="text-gray-300 mb-6">
                    You've completed the {currentRoadmap.title}! You're now ready to build amazing projects 
                    and contribute to the tech community.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-full hover:from-yellow-700 hover:to-orange-700 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Share Achievement
                    </motion.button>
                    <motion.button
                      className="px-8 py-3 border-2 border-yellow-500 text-yellow-400 font-semibold rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Next Roadmap
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Call to Action */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-3xl p-8 border border-cyan-500/20 max-w-2xl mx-auto">
                <LightBulbIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Need guidance on your learning journey?</h3>
                <p className="text-gray-400 mb-6">
                  Join Elevate Dev Club and get mentorship, resources, and community support to follow these roadmaps effectively!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-hover
                  >
                    Join the Club
                  </motion.button>
                  <motion.button
                    className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 font-semibold rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor-hover
                  >
                    Get Mentorship
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Roadmaps;