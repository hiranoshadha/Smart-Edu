"use client"

import { useState, useEffect  } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, Users, BookOpen, MessageSquare, Settings, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { users, classes } from '../resources/content'
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
  
export default function AdminDashboard() {
    const [selectedMenu, setSelectedMenu] = useState('overview')
    const router = useRouter()
    const usersCount = Object.keys(users).length
    const classesCount = Object.keys(classes).length
    const [username, setUsername] = useState<string>('')

    useEffect(() => {
        const adminEmail = localStorage.getItem('adminToken')?.split(':')[0]
        if (adminEmail) {
          const decodedEmail = atob(adminEmail)
          setUsername(decodedEmail)
        }
      }, [])
  
    const handleLogout = () => {
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('adminToken')
      window.location.href = '/login'
    }
    const stats = [
        { title: 'Total Students', value: usersCount.toString(), icon: Users, change: '+12%' },
        { title: 'Active Courses', value: classesCount.toString(), icon: BookOpen, change: '+4%' },
        { title: 'Messages', value: '1,210', icon: MessageSquare, change: '+18%' },
        { title: 'Revenue', value: 'Rs. 845K', icon: BarChart3, change: '+24%' }
      ]

  return (
    <div className="flex h-screen bg-background pt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-card shadow-lg">
      <div className="p-4">
        <h1 className="text-sm text-primary">Welcome, {username || 'Admin'}</h1>
      </div>
        
        <nav className="mt-8 space-y-2 px-4">
          {['Overview', 'Students', 'Courses', 'Messages', 'Settings'].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedMenu(item.toLowerCase())}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                selectedMenu === item.toLowerCase() 
                  ? 'bg-primary text-black' 
                  : 'hover:bg-primary/10'
              }`}
            >
              {item === 'Overview' && <BarChart3 size={20} />}
              {item === 'Students' && <Users size={20} />}
              {item === 'Courses' && <BookOpen size={20} />}
              {item === 'Messages' && <MessageSquare size={20} />}
              {item === 'Settings' && <Settings size={20} />}
              <span>{item}</span>
            </button>
          ))}
            <AlertDialog>
                <AlertDialogTrigger className='bg-red-700 w-full mt-4 py-3 rounded-lg transition-all hover:bg-red-900'>
                    logout
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-red-800/20'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. You will logout when click on Confirm.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className='bg-red-700 text-white hover:bg-red-900'>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <div className="flex items-center space-x-4">
              <Button className="">
                New Course
              </Button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.title}
                whileHover={{ scale: 1.02 }}
                className="bg-card p-6 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  </div>
                  <span className={`text-sm ${
                    stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity & Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {/* Activity items */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-4 p-3 hover:bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">New student registered</p>
                      <p className="text-sm text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Performance Analytics</h2>
              {/* Add your preferred chart component here */}
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                Chart Component
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
