'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { FaChalkboardTeacher, FaStar, FaGraduationCap, FaTimes } from 'react-icons/fa';
import { useTheme } from "next-themes";
import Link from 'next/link';
import { teachers } from '@/app/resources/content';
import { Button } from '@/components/ui/button';

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [experienceFilter, setExperienceFilter] = useState('all');
  const { theme } = useTheme();

  // Get unique subjects from all teachers
  const allSubjects = [...new Set(
    Object.values(teachers).flatMap(teacher => teacher.subject)
  )];

  const filteredTeachers = Object.entries(teachers).filter(([key, teacher]) => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubjects = selectedSubjects.length === 0 || 
      teacher.subject.some(sub => selectedSubjects.includes(sub));
    
    const yearsExp = parseInt(teacher.experience);
    const matchesExperience = experienceFilter === 'all' || 
      (experienceFilter === '5+' && yearsExp >= 5) ||
      (experienceFilter === '10+' && yearsExp >= 10);

    return matchesSearch && matchesSubjects && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12">Our Expert Teachers</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`md:w-64 bg-card p-6 rounded-2xl shadow-lg 
            ${showFilters ? 'fixed inset-0 z-50 md:relative' : 'hidden md:block'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="md:hidden">
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Subjects</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {allSubjects.map((subject) => (
                    <label key={subject} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedSubjects.includes(subject)}
                        onChange={(e) => {
                          setSelectedSubjects(e.target.checked 
                            ? [...selectedSubjects, subject]
                            : selectedSubjects.filter(s => s !== subject)
                          );
                        }}
                        className="rounded text-blue-600"
                      />
                      <span className="text-sm">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Experience</h3>
                <select
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  className="w-full p-2 rounded-lg border bg-card"
                >
                  <option value="all">All Experience</option>
                  <option value="5+">5+ Years</option>
                  <option value="10+">10+ Years</option>
                </select>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {/* Search and Filter Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search teachers by name or subject..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 bg-card"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={() => setShowFilters(true)}
                className=""
              >
                <FiFilter />
                Filters
              </Button>
            </div>

            {/* Teachers Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map(([key, teacher]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  className="bg-card rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <FaChalkboardTeacher className="text-2xl text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{teacher.name}</h3>
                        <div className="flex flex-wrap gap-1">
                          {teacher.subject.map((sub, index) => (
                            <span key={index} className="text-sm px-2 py-1 bg-ring rounded-full">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <FaGraduationCap className="text-blue-600" />
                        <span>{teacher.experience} Experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        <span>{teacher.rating} ({teacher.reviews} reviews)</span>
                      </div>
                    </div>

                    <p className="mt-4 text-text-foreground line-clamp-2">{teacher.bio}</p>

                    <Link href={teacher.button.link} className="block mt-6">
                      <Button className="w-full">
                        {teacher.button.text}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
