'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Add this component inside your Home component
const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const slides = [
    {
      url: '/images/women1.jpg',
      title: 'Expert Teachers',
      description: 'Learn from the best educators in Sri Lanka'
    },
    {
        url: '/images/women2.jpg',
        title: 'Interactive Learning',
      description: 'Engage with dynamic content and real-time feedback'
    },
    {
        url: '/images/women3.jpg',
        title: 'Comprehensive Resources',
      description: 'Access a wide range of study materials'
    },
    {
        url: '/images/women4.jpg',
        title: 'Flexible Schedule',
      description: 'Study at your own pace with 24/7 access to courses'
    },
    {
        url: '/images/women5.jpg',
        title: 'Community Support',
      description: 'Join a vibrant community of learners and educators'
    }
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="relative w-full max-w-5xl aspect-[16/9] px-4">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform perspective-1000 rotate-y-3 rotate-x-3">
                <motion.img
                  src={slides[currentIndex].url}
                  alt={slides[currentIndex].title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl font-bold text-white mb-2"
                    >
                      {slides[currentIndex].title}
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/90"
                    >
                      {slides[currentIndex].description}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all"
          >
            <motion.svg
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </motion.svg>
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
            className="absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all"
          >
            <motion.svg
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageSlider;