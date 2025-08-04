import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CalendarIcon, MapPinIcon, UsersIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Events: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const upcomingEvents = [
    {
      id: 1,
      title: "AI/ML Workshop Series",
      date: "2025-01-25",
      time: "14:00",
      location: "Tech Lab 101",
      attendees: 45,
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Deep dive into machine learning algorithms and practical implementations.",
      registrationUrl: "https://forms.google.com/ai-ml-workshop"
    },
    {
      id: 2,
      title: "Hackathon 2025: Build the Future",
      date: "2025-02-15",
      time: "09:00",
      location: "Innovation Hub",
      attendees: 120,
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "48-hour coding marathon with exciting prizes and networking opportunities.",
      registrationUrl: "https://hackathon2025.devpost.com"
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      date: "2025-03-10",
      time: "10:00",
      location: "Computer Center",
      attendees: 60,
      image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "From HTML basics to advanced React concepts in one intensive weekend.",
      registrationUrl: "https://eventbrite.com/web-bootcamp-2025"
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Blockchain & Cryptocurrency Summit",
      date: "2024-12-20",
      time: "13:30",
      location: "Auditorium A",
      attendees: 200,
      image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Industry experts shared insights on blockchain technology and crypto trends.",
      highlights: [
        "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: 5,
      title: "Cloud Computing Workshop",
      date: "2024-11-15",
      time: "15:00",
      location: "Tech Lab 205",
      attendees: 35,
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Hands-on experience with AWS, Azure, and Google Cloud platforms.",
      highlights: [
        "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3861970/pexels-photo-3861970.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3861971/pexels-photo-3861971.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    }
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const openHighlights = (event: any) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
  };

  const closeHighlights = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedEvent && selectedEvent.highlights) {
      setCurrentImageIndex((prev) => 
        prev === selectedEvent.highlights.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent && selectedEvent.highlights) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedEvent.highlights.length - 1 : prev - 1
      );
    }
  };

  const handleEventAction = (event: any) => {
    if (activeTab === 'upcoming' && event.registrationUrl) {
      window.open(event.registrationUrl, '_blank');
    } else if (activeTab === 'past' && event.highlights) {
      openHighlights(event);
    }
  };

  const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <section id="events" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Events & Workshops
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join our exciting events, workshops, and hackathons designed to enhance 
            your skills and connect with fellow developers.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gray-900 rounded-full p-1 border border-blue-500/20">
            {(['upcoming', 'past'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                data-cursor-hover
              >
                {activeTab === tab && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    layoutId="activeEventTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 capitalize">{tab}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {currentEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)" }}
                data-cursor-hover
              >
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-blue-600/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium">
                      {activeTab === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-300 text-sm">
                      <CalendarIcon className="w-4 h-4 mr-2 text-blue-400" />
                      {formatDate(event.date)} at {event.time}
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <MapPinIcon className="w-4 h-4 mr-2 text-blue-400" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <UsersIcon className="w-4 h-4 mr-2 text-blue-400" />
                      {event.attendees} {activeTab === 'upcoming' ? 'interested' : 'attended'}
                    </div>
                  </div>

                  <motion.button
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === 'upcoming'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor-hover
                    onClick={() => handleEventAction(event)}
                  >
                    {activeTab === 'upcoming' ? 'Register Now' : 'View Highlights'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Event Highlights Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeHighlights}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedEvent.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">Event Highlights</p>
                  </div>
                  <motion.button
                    onClick={closeHighlights}
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <XMarkIcon className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* Image Gallery */}
                <div className="relative">
                  <div className="aspect-video bg-gray-800 relative overflow-hidden">
                    <motion.img
                      key={currentImageIndex}
                      src={selectedEvent.highlights[currentImageIndex]}
                      alt={`${selectedEvent.title} highlight ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Navigation Arrows */}
                    {selectedEvent.highlights.length > 1 && (
                      <>
                        <motion.button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronLeftIcon className="w-6 h-6 text-white" />
                        </motion.button>
                        <motion.button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronRightIcon className="w-6 h-6 text-white" />
                        </motion.button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm">
                        {currentImageIndex + 1} / {selectedEvent.highlights.length}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {selectedEvent.highlights.length > 1 && (
                    <div className="p-4 bg-gray-800/50">
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {selectedEvent.highlights.map((image: string, index: number) => (
                          <motion.button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                              index === currentImageIndex
                                ? 'border-blue-500 scale-110'
                                : 'border-gray-600 hover:border-gray-500'
                            }`}
                            whileHover={{ scale: index === currentImageIndex ? 1.1 : 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <img
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div className="p-6 border-t border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-gray-300">
                      <CalendarIcon className="w-4 h-4 mr-2 text-blue-400" />
                      {formatDate(selectedEvent.date)}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPinIcon className="w-4 h-4 mr-2 text-blue-400" />
                      {selectedEvent.location}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <UsersIcon className="w-4 h-4 mr-2 text-blue-400" />
                      {selectedEvent.attendees} attended
                    </div>
                  </div>
                  <p className="text-gray-400 mt-4">{selectedEvent.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Next Event Countdown
        {activeTab === 'upcoming' && upcomingEvents.length > 0 && (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Next Event Coming Soon!</h3>
              <p className="text-gray-400 mb-6">Don't miss out on our upcoming {upcomingEvents[0].title}</p>
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
              >
                Join Our Community
              </motion.button>
            </div>
          </motion.div>
        )} */}
      </div>
    </section>
  );
};

export default Events;