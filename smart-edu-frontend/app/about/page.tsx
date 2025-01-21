"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaUsers, FaChalkboardTeacher, FaCertificate } from 'react-icons/fa'

const About = () => {
  return <>
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-600">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Empowering Sri Lankan Students
          </motion.h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Transforming O/L education through innovative digital learning solutions
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Our Mission</h2>
            <p className="text-gray-600">
              To provide accessible, high-quality O/L education to every Sri Lankan student through innovative digital learning solutions, personalized guidance, and comprehensive study materials.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-4 text-green-600">Our Vision</h2>
            <p className="text-gray-600">
              To become the leading digital education platform in Sri Lanka, revolutionizing how students prepare for O/L examinations and building a brighter future for the next generation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCard icon={<FaUsers />} number="10,000+" label="Active Students" />
            <StatsCard icon={<FaChalkboardTeacher />} number="50+" label="Expert Teachers" />
            <StatsCard icon={<FaGraduationCap />} number="95%" label="Success Rate" />
            <StatsCard icon={<FaCertificate />} number="15+" label="Subjects Covered" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Sarah Perera', role: 'Academic Director', image: '/team/director.jpg' },
              { name: 'Mr. Rajitha Silva', role: 'Technology Head', image: '/team/tech-head.jpg' },
              { name: 'Ms. Amali Fernando', role: 'Student Success Lead', image: '/team/success-lead.jpg' },
            ].map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1 relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
}

const StatsCard = ({ icon, number, label }: { icon: React.ReactNode, number: string, label: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="text-center"
  >
    <div className="text-4xl text-blue-600 mb-2 flex justify-center">{icon}</div>
    <div className="text-3xl font-bold mb-1">{number}</div>
    <div className="text-gray-600">{label}</div>
  </motion.div>
)
export default About
