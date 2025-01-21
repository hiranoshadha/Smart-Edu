'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MagicCard } from '@/app/Components/magicui/MagicCard'
import { cn } from '@/app/lib/utils'

const subjects = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Commerce',
  'ICT',
  'Sinhala',
  'Buddhism',
  'Tamil'
]

export default function UserProfileEdit() {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    address: '',
    contact: '',
    parentEmail: '',
    preferredSubjects: [] as string[],
    schoolName: '',
    grade: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubjectChange = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      preferredSubjects: prev.preferredSubjects.includes(subject)
        ? prev.preferredSubjects.filter(s => s !== subject)
        : [...prev.preferredSubjects, subject]
    }))
  }

  return (
    <div className="f-full bg-background p-4 md:p-8 w-full">

      <div className="max-w-4xl mx-auto">
        <div className="p-1 md:p-2 ">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-5 rounded-md bg-green-950/20">
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-slate-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium ">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-slate-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium ">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-slate-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium ">Contact Number</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-slate-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-slate-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Parent's Email</label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-slate-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">School Name</label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-slate-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Grade</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-slate-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Select Grade</option>
                  {Array.from({ length: 5 }, (_, i) => i + 6).map(grade => (
                    <option key={grade} value={grade}>Grade {grade}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2 mt-8 p-5 rounded-md bg-green-950/20">
              <label className="text-sm font-medium">Preferred Subjects</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {subjects.map(subject => (
                  <label
                    key={subject}
                    className={cn(
                      "flex items-center p-3 rounded-lg cursor-pointer transition-colors",
                      formData.preferredSubjects.includes(subject)
                        ? "bg-green-600 text-white"
                        : "bg-green-800/40 hover:bg-green-700 text-white"
                    )}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.preferredSubjects.includes(subject)}
                      onChange={() => handleSubjectChange(subject)}
                    />
                    <span className="text-sm">{subject}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8 p-5 rounded-md bg-red-700/20">
              <h3 className="text-lg font-semibold text-red-500 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password <span className='text-red-700'>*</span></label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={''}
                    placeholder='Enter your current password'
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={''}
                    onChange={handleInputChange}
                    placeholder='Enter your new password'
                    className="w-full px-4 py-2 rounded-lg bg-background border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={''}
                    onChange={handleInputChange}
                    placeholder='Confirm your new password'
                    className="w-full px-4 py-2 rounded-lg bg-background border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-6 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
            >
              Save Changes
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  )
}
