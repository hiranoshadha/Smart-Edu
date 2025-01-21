'use client';

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from "next-themes";
import { FaChalkboardTeacher, FaCalendarAlt, FaClock, FaUsers, FaBook } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs';
import { classes } from '@/app/resources/content';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ClassDetails({ params }: { params: Promise<{ classId: string }> }) {
  const [enrollmentStep, setEnrollmentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    grade: '',
    paymentMethod: ''
  });
  const { theme } = useTheme();
  const [classData, setClassData] = useState<any>(null);

  useEffect(() => {
    async function fetchClassData() {
      const resolvedParams = await params; // Resolve the params promise
      const classInfo = classes[`class${resolvedParams.classId}` as keyof typeof classes];
      setClassData(classInfo);
    }
    fetchClassData();
  }, [params]);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enrollmentStep < 4) {
      setEnrollmentStep(enrollmentStep + 1);
    } else {
      try {
        // Add your enrollment API call here
        console.log('Enrollment submitted:', formData);
      } catch (error) {
        console.error('Enrollment failed:', error);
      }
    }
  };

  if (!classData) {
    return <div>Loading...</div>; // Handle loading state
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
              <BreadcrumbLink href="/classes">Classes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{classData.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl shadow-xl overflow-hidden mt-2"
        >
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h1 className="text-4xl font-bold mb-4">{classData.title}</h1>
                <p className="text-text-foreground mb-6">{classData.description}</p>
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-2 bg-primary text-text rounded-full">
                    {classData.exam}
                  </span>
                  <div className="flex items-center">
                    <BsStarFill className="text-yellow-400 mr-1" />
                    <span>{classData.rating} ({classData.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">{classData.price}</div>
              </div>
              
              <div className="space-y-6">
                {classData.features.map((feature: { title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                  <div key={index} className="flex items-start gap-4">
                    <FaBook className="text-primary text-2xl flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Class Details and Enrollment Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2 space-y-8">
            {/* Schedule */}
            <section className="bg-card rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Class Schedule</h2>
              <div className="space-y-4">
                {classData.schedule.map((schedule: { day: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; time: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; type: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background rounded-xl">
                    <div className="flex items-center gap-4">
                      <FaCalendarAlt className="text-primary" />
                      <div>
                        <p className="font-semibold">{schedule.day}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{schedule.time}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-primary text-rext rounded-full text-sm">
                      {schedule.type}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Syllabus */}
            <section className="bg-card rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Course Syllabus</h2>
              <div className="space-y-4">
                {classData.syllabus.map((item: { week: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; topic: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; duration: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Week {item.week}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.topic}</p>
                      </div>
                      <span className="text-sm text-gray-500">{item.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Enrollment Form */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <motion.div 
                className="bg-card rounded-3xl p-6 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold mb-6">Enroll Now</h2>
                {/* Added benefits section */}
                <div className="mb-6 p-4 bg-card rounded-xl">
                  <h3 className="font-semibold text-primary mb-2">Why Enroll?</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Expert instructors
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Small class sizes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Flexible schedule
                    </li>
                  </ul>
                </div>
                <form onSubmit={handleEnroll} className="space-y-4">
                  {/* Step indicators with labels */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`w-3 h-3 rounded-full ${
                            step <= enrollmentStep ? 'bg-primary' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Personal Info</span>
                      <span>Contact</span>
                      <span>Details</span>
                      <span>Confirm</span>
                    </div>
                  </div>

                  {/* Dynamic form steps */}
                  {enrollmentStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="your.email@example.com"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">We'll send course updates to this email</p>
                      </div>
                    </div>
                  )}

                  {enrollmentStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your phone number"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">For important course notifications</p>
                      </div>
                      <div>
                        <label className="block mb-2">School</label>
                        <input
                          type="text"
                          value={formData.school}
                          onChange={(e) => setFormData({...formData, school: e.target.value})}
                          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your current school name"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {enrollmentStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2">Grade</label>
                        <select
                          value={formData.grade}
                          onChange={(e) => setFormData({...formData, grade: e.target.value})}
                          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Grade</option>
                          <option value="10">Grade 10</option>
                          <option value="11">Grade 11</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Choose your current grade level</p>
                      </div>
                      <div>
                        <label className="block mb-2">Payment Method</label>
                        <select
                          value={formData.paymentMethod}
                          onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Payment Method</option>
                          <option value="card">Credit/Debit Card</option>
                          <option value="bank">Bank Transfer</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Secure payment processing</p>
                      </div>
                    </div>
                  )}

                  {enrollmentStep === 4 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Confirm Your Details</h3>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl space-y-2">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <p><strong>School:</strong> {formData.school}</p>
                        <p><strong>Grade:</strong> {formData.grade}</p>
                        <p><strong>Payment:</strong> {formData.paymentMethod}</p>
                      </div>
                      <p className="text-sm text-gray-500">Please verify all information before completing enrollment</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors transform hover:scale-[1.02] duration-200"
                  >
                    {enrollmentStep === 4 ? 'Complete Enrollment' : 'Continue'}
                  </button>

                  {/* Added trust indicators */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <span>🔒 Secure enrollment</span>
                      <span>•</span>
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
