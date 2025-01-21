'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { FaChalkboardTeacher, FaTimes } from 'react-icons/fa';
import { BsBook, BsStarFill } from 'react-icons/bs';
import { useTheme } from "next-themes";
import { classes } from '@/app/resources/content';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExam, setSelectedExam] = useState('all');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const { theme } = useTheme();

  const subjects = Object.values(classes).map(c => c.title);
  
  const filteredClasses = Object.entries(classes).filter(([key, classItem]) => {
    const matchesSearch = classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExam = selectedExam === 'all' || classItem.exam === selectedExam;
    const matchesSubject = selectedSubjects.length === 0 || selectedSubjects.includes(classItem.title);
    
    return matchesSearch && matchesExam && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 py-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/classes">Classes</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col md:flex-row gap-8 mt-2">
          {/* Sidebar Filters */}
          <aside className={`md:w-64 bg-card p-6 rounded-2xl shadow-lg ${showFilters ? 'fixed inset-0 z-50 md:relative' : 'hidden md:block'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl txt-text font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="md:hidden">
                <FaTimes />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Exam Type</h3>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full p-2 rounded-lg border bg-card"
                > 
                  <option value="all">All Exams</option>
                  <option value="O/L">O/L</option>
                  <option value="A/L">A/L</option>
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Subjects</h3>
                <div className="space-y-2">
                  {subjects.map((subject) => (
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
                        className="rounded"
                      />
                      <span>{subject}</span>
                    </label>
                  ))}
                </div>
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
                  placeholder="Search classes..."
                  className="w-full pl-12 pr-4 py-3 bg-card rounded-xl border focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowFilters(true)}
                className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl"
              >
                <FiFilter />
                Filters
              </button>
            </div>

            {/* Classes Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map(([key, classItem]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  className="bg-card rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{classItem.title}</h3>
                    <p className="text-text mb-4">{classItem.description}</p>
                    <div className="mt-4">
                      <Button 
                        onClick={() => window.location.href = classItem.button.link}
                        className="w-full"
                      >
                        {classItem.button.text}
                      </Button>
                    </div>
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
