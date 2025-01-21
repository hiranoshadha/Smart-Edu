'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { FaBook, FaVideo, FaHeadphones, FaNewspaper, FaPencilAlt } from 'react-icons/fa';
import { categories } from '@/app/resources/content';
import Link from 'next/link';

const iconMap = {
  'Past papers': FaNewspaper,
  'Mock papers': FaPencilAlt,
  'Video lessons': FaVideo,
  'Audio lessons': FaHeadphones,
  'Notes': FaBook,
};

const gradientClasses = {
  'Past papers': 'bg-[#FF4B4B]',
  'Mock papers': 'bg-[#4CAF50]',
  'Video lessons': 'bg-[#FFB300]',
  'Audio lessons': 'bg-[#9C27B0]',
  'Notes': 'bg-[#2196F3]',
  'Addons': 'bg-[#FF5252]',
};
export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = Object.entries(categories).filter(([key, category]) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen  text-white">
      <main className="max-w-7xl bg-background mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl text-foreground md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Learning Resources
          </motion.h1>
          <motion.p 
            className="text-gray-300 text-lg text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Explore our comprehensive collection of study materials
          </motion.p>
        </div>

        <motion.div 
          className="relative max-w-2xl mx-auto mb-12 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="search"
            placeholder="Search categories..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background  border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(([key, category], index) => {
            const IconComponent = iconMap[category.name as keyof typeof iconMap];
            const gradientClass = gradientClasses[category.name as keyof typeof gradientClasses];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className={`relative overflow-hidden rounded-3xl text-foreground p-6 h-[200px] cursor-pointer bg-gradient-to-r ${gradientClass}`}
              >
                <Link href={category.button.link} className="block h-full">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl text-foreground font-bold mb-2">{category.name}</h2>
                        <p className="text-foreground">{category.description}</p>
                      </div>
                      {IconComponent && (
                        <IconComponent className="text-4xltext-foreground" />
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 transform transition-transform group-hover:translate-x-2">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center text-foreground"
                    >
                      <span className="mr-2">Explore</span>
                      <span>→</span>
                    </motion.div>
                  </div>
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
