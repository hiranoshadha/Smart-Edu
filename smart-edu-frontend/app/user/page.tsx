"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, BookOpen, MessageSquare, Settings, Bell, Edit3, Camera, Trash2, Eye, Banknote, ChevronRight, Globe, HelpCircle, Palette, Lock, X, Leaf  } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { ThemeSwitch } from '../Components/ThemeSwitch'
import UserProfileEdit from './UserProfileEdit'
export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('overview')
  const [userData, setUserData] = useState({
    name: 'Kamal Perera',
    role: 'student',
    grade: '11',
    school: 'Royal College',
    email: 'kamal@example.com',
    enrolledClasses: ['Mathematics', 'Science', 'English'],
    achievements: [
      { title: 'Perfect Attendance', date: '2024' },
      { title: 'Top Performer', date: '2023' },
    ],
    progress: {
      mathematics: 85,
      science: 20,
      english: 50
    }
  })

  const stats = [
    { title: 'Classes Enrolled', value: '3', icon: BookOpen },
    { title: 'Assignments', value: '12', icon: Edit3 },
    { title: 'Messages', value: '24', icon: MessageSquare },
    { title: 'Achievements', value: '8', icon: Users }
  ]

  return (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
            {/* Profile Header */}
            <div className="bg-card rounded-2xl p-8 mb-8 relative">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative">
                        <motion.div 
                            whileHover={{ 
                                scale: 1.3,
                                transition: { duration: 0.8, ease: "easeInOut" }
                            }}
                            className="w-24 md:w-32 h-24 md:h-32 rounded-full bg-primary/20 flex items-center justify-center relative overflow-hidden"
                        >
                            <img 
                            src="/avatar/women.jpg" 
                            alt="Profile"
                            className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white">
                            <Camera size={16} />
                        </button>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">{userData.name}</h1>
                                <p className="text-sm md:text-base text-muted-foreground">
                                Grade {userData.grade} • {userData.school}
                                </p>
                            </div>
                            <Link href="/leaf" className="text-sm md:text-base text-muted-foreground hover:text-primary">
                                <Leaf size={50} className='text-green-600' />
                                View leaf
                            </Link>
                            <div className="flex items-center gap-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger className="flex text-sm items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-900 left-0 top-0">
                                            <Edit3 size={16} />
                                            Edit Profile
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="h-[75vh] w-[175vw] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                                            <AlertDialogHeader className="relative text-white">
                                                <AlertDialogTitle>Edit Profile</AlertDialogTitle>
                                                <AlertDialogCancel className="absolute text-red-700 border-none right-0 top-0">
                                                    <X size={18} />
                                                </AlertDialogCancel>
                                            </AlertDialogHeader>
                                            <UserProfileEdit/>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>                                    
                                    </AlertDialog>                                    
                                    <AlertDialog>
                                        <AlertDialogTrigger className="flex text-sm items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                                        <Trash2 size={16} />
                                        Delete Account
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='bg-red-800/20'>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your account
                                                    and remove your data from our servers.                        
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction className='bg-red-700 text-white hover:bg-red-900'>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Enrolled Classes */}
                        <div className="bg-background rounded-xl p-6 shadow-2xl">
                            <h2 className="text-xl font-semibold mb-4">Enrolled Classes</h2>
                            <div className="space-y-4">
                                {userData.enrolledClasses.map((className) => (
                                <motion.div
                                    key={className}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                                >
                                    <span>{className}</span>
                                    <button className="text-primary hover:text-primary/80">
                                        View Class
                                    </button>
                                </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="bg-background rounded-xl p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">Achievements</h2>
                                <Link 
                                    href="/user" 
                                    className="text-primary hover:text-primary/80 group relative"
                                    >
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-800 text-white text-xs px-4 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Click_To_View
                                    </span>
                                    <Eye size={16} />
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {userData.achievements.map((achievement) => (
                                <div key={achievement.title} className="flex items-center gap-4 p-3 bg-muted/20 rounded-lg">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    🏆
                                    </div>
                                    <div>
                                    <p className="font-medium">{achievement.title}</p>
                                    <p className="text-sm text-muted-foreground">{achievement.date}</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>

                        {/* payment history */}
                        <div className="bg-background rounded-xl p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">Payment History</h2>
                                <Link 
                                    href="/user" 
                                    className="text-primary hover:text-primary/80 group relative"
                                    >
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-800 text-white text-xs px-4 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Click_To_View
                                    </span>
                                    <Eye size={16} />
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {userData.achievements.map((achievement) => (
                                <div key={achievement.title} className="flex items-center gap-4 p-3 bg-muted/20 rounded-lg">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    💸💰🪙💵
                                    </div>
                                    <div>
                                    <p className="font-medium">{achievement.title}</p>
                                    <p className="text-sm text-muted-foreground">{achievement.date}</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center Column - Progress */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-background rounded-xl p-6 shadow-2xl">
                            <h2 className="text-xl font-semibold mb-6">Learning Progress</h2>
                            {Object.entries(userData.progress).map(([subject, progress]) => (
                                <div key={subject} className="mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="capitalize">{subject}</span>
                                        <span className="text-primary">{progress}%</span>
                                    </div>
                                    <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                                        <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1 }}
                                        className={`h-full rounded-full ${
                                            progress < 30 ? 'bg-red-500' :
                                            progress >= 60 ? 'bg-green-500' :
                                            'bg-yellow-500'
                                        }`}
                                        />
                                    </div>
                                </div>
                            ))}                        
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-background rounded-xl p-6 shadow-2xl">
                            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center gap-4 p-3 bg-muted/20 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Bell size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Completed Mathematics Assignment</p>
                                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                        {/* Apple-style Settings Section */}
                        <div className="bg-background rounded-xl p-6 shadow-2xl">
                            <h2 className="text-xl font-semibold mb-6">Settings</h2>
                            <div className="space-y-3 h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                                <div className="settings-card bg-background rounded-xl p-5 justify-between flex items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="settings-icon icon-appearance">
                                        <Bell className="text-text" size={20} />
                                        </div>
                                        <div>
                                        <h6 className="font-medium">Notifications</h6>
                                        <p className="text-sm text-muted-foreground">Manage alerts and notifications</p>
                                        </div>
                                    </div>
                                    <label className="switch rounded-full relative inline-block w-12 h-6">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <hr/>
                                <div className="settings-card bg-background rounded-xl p-5 justify-between flex items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="settings-icon icon-security">
                                        <Settings className="text-text" size={20} />
                                        </div>
                                        <div>
                                        <h6 className="font-medium">Security</h6>
                                        <p className="text-sm text-muted-foreground">Password, 2FA, Recovery</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-muted-foreground" size={20} />
                                </div>
                                <hr />
                                <div className="settings-card bg-background rounded-xl p-5 justify-between flex items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="settings-icon icon-storage">
                                        <BookOpen className="text-text" size={20} />
                                        </div>
                                        <div>
                                        <h6 className="font-medium">Storage</h6>
                                        <div className="w-32 md:w-48">
                                            <div className="storage-bar">
                                            <div className="storage-progress" style={{ width: '45%' }}></div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">45.2 GB of 100 GB</p>
                                        </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-muted-foreground" size={20} />
                                </div>
                                <hr />
                                <div className="settings-card bg-background rounded-xl p-5 justify-between flex items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="settings-icon icon-privacy">
                                        <Lock className="text-text" size={20} />
                                        </div>
                                        <div>
                                        <h6 className="font-medium">Privacy</h6>
                                        <p className="text-sm text-muted-foreground">Privacy settings and data usage</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-muted-foreground" size={20} />
                                </div>
                                <hr />
                                <div className="settings-card bg-background rounded-xl p-5 justify-between flex items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="settings-icon icon-language">
                                        <Globe className="text-text" size={20} />
                                        </div>
                                        <div>
                                        <h6 className="font-medium">Language</h6>
                                        <p className="text-sm text-muted-foreground">Change app language</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-muted-foreground" size={20} />
                                </div>
                                <hr />
                                <div className="settings-card bg-background rounded-xl p-5 justify-between flex items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="settings-icon icon-appearance">
                                        <Palette className="text-text" size={20} />
                                        </div>
                                        <div>
                                        <h6 className="font-medium">Appearance</h6>
                                        <p className="text-sm text-muted-foreground">Dark mode and themes</p>
                                        </div>
                                    </div>
                                    <ThemeSwitch />
                                </div>
                                <hr />
                                <div className="settings-card bg-background rounded-xl p-5 justify-between flex items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="settings-icon icon-help">
                                        <HelpCircle className="text-text" size={20} />
                                        </div>
                                        <div>
                                        <h6 className="font-medium">Help & Support</h6>
                                        <p className="text-sm text-muted-foreground">FAQs and contact support</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-muted-foreground" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
