'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaLanguage, FaClock, FaTools, FaGraduationCap } from 'react-icons/fa';
import { useTheme } from "next-themes";
import Link from 'next/link';
import { categories } from '@/app/resources/content';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function CategoryDetails({ params }: { params: Promise<{ categoryId: string }> }) {
  const [categoryData, setCategoryData] = useState<any>(null);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchCategoryData() {
      const resolvedParams = await params;
      const categoryInfo = categories[`category${resolvedParams.categoryId}` as keyof typeof categories];
      setCategoryData(categoryInfo);
    }
    fetchCategoryData();
  }, [params]);

  if (!categoryData) {
    return <div>Loading...</div>;
  }

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
              <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{categoryData.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl shadow-xl overflow-hidden mt-6"
        >
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h1 className="text-4xl font-bold mb-4">{categoryData.name}</h1>
                <p className="text-text-foreground mb-6">{categoryData.description}</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <FaLanguage className="text-primary text-2xl" />
                    <div>
                      <h3 className="font-semibold">Available Languages</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {categoryData.languages.map((language: string, index: number) => (
                          <span key={`lang-${index}`} className="px-3 py-1 bg-primary text-white rounded-full text-sm">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <FaGraduationCap className="text-primary text-2xl" />
                    <div>
                      <h3 className="font-semibold">Difficulty Levels</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {categoryData.difficulty.map((level: string, index: number) => (
                          <span key={`diff-${index}`} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h2 className="text-xl font-bold mb-4">Available Formats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {categoryData.formats.map((format: string, index: number) => (
                      <div key={`format-${index}`} className="flex items-center gap-2">
                        <FaTools className="text-primary" />
                        <span>{format}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h2 className="text-xl font-bold mb-4">Key Features</h2>
                  <div className="grid gap-3">
                    {categoryData.features.map((feature: string, index: number) => (
                      <div key={`feature-${index}`} className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Available Subjects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.subjects.map((subject: string, index: number) => (
              <motion.div
                key={`subject-${index}`}
                whileHover={{ scale: 1.02 }}
                className="bg-card rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaBook className="text-primary text-xl" />
                    <h3 className="text-xl font-bold">{subject}</h3>
                  </div>
                  <Link href={`/subjects/${subject.toLowerCase()}`}>
                    <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl transition-colors">
                      View Materials
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Available Years</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryData.years.map((year: string, index: number) => (
              <div key={`year-${index}`} className="bg-card rounded-xl p-4 text-center border border-border">
                <FaClock className="text-primary mx-auto mb-2" />
                <span className="font-semibold">{year}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
