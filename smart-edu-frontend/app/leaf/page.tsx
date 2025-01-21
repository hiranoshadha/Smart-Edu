"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, ShoppingCart, Store, Sparkles, Plus, Gift } from 'lucide-react'
import { useState } from 'react'

export default function LeafStore() {
  const [showPacks, setShowPacks] = useState(false)

  const leafPacks = [
    { name: 'Starter Pack', leaves: 100, price: 'RS: 100.00', color: 'bg-emerald-500', popular: false },
    { name: 'Bronze Pack', leaves: 500, price: 'RS: 500.00', color: 'bg-amber-600', popular: false },
    { name: 'Silver Pack', leaves: 1000, price: 'RS: 1,000.00', color: 'bg-gray-400', popular: true },
    { name: 'Gold Pack', leaves: 2500, price: 'RS: 2,500.00', color: 'bg-yellow-500', popular: false },
    { name: 'Platinum Pack', leaves: 5000, price: 'RS: 5,000.00', color: 'bg-purple-500', popular: false },
    { name: 'Diamond Pack', leaves: 10000, price: 'RS: 10,000.00', color: 'bg-blue-500', popular: false },
  ]

  const userLeafs = {
    total: 2500,
    history: [
      { action: 'Purchased', amount: 100, date: '2024-01-15', source: 'Mathematics Class Registration' },
      { action: 'Earned', amount: 1000, date: '2024-01-10', source: 'Gold Pack' },
      { action: 'Earned', amount: 50, date: '2024-01-05', source: 'Perfect Attendance' },
    ]
  }

  const scrollToPackages = () => {
    setShowPacks(true)
    setTimeout(() => {
      document.getElementById('leafPackages')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="max-w-[1400px] mx-auto">
        {/* Add Leaf Button */}
        <motion.button
          onClick={scrollToPackages}
          className="flex items-center gap-2 mx-auto mb-8 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/80 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add Leafs</span>
        </motion.button>

        <AnimatePresence>
          {showPacks && (
            <motion.div 
              id="leafPackages"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-card rounded-2xl p-8 mb-8"
            >
              {/* Store Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Store className="w-8 h-8 text-primary" />
                  <h1 className="text-3xl font-bold">Leaf Store</h1>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Leaf className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Your Balance: {userLeafs.total}</span>
                </div>
              </div>

              {/* Packages Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {leafPacks.map((pack, index) => (
                  <motion.div
                    key={pack.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative bg-background rounded-xl p-4 shadow-lg hover:shadow-xl transition-all group"
                  >
                    {pack.popular && (
                      <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Sparkles size={12} />
                        Popular
                      </div>
                    )}
                    
                    <div className={`${pack.color} w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h3 className="font-bold">{pack.name}</h3>
                      <div>
                        <span className="text-xl font-bold text-primary">{pack.leaves}</span>
                        <span className="text-sm text-muted-foreground"> Leaves</span>
                      </div>
                      <div className="text-lg font-semibold">{pack.price}</div>
                      
                      <button className="w-full bg-primary rounded-lg py-1.5 px-3 hover:bg-primary/80 transition-colors flex items-center justify-center gap-1 text-sm">
                        <ShoppingCart size={14} />
                        Buy Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Benefits Section */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-background p-4 rounded-xl">
                  <h3 className="font-semibold mb-2">Instant Delivery</h3>
                  <p className="text-sm text-muted-foreground">Get your leaves instantly after purchase</p>
                </div>
                <div className="bg-background p-4 rounded-xl">
                  <h3 className="font-semibold mb-2">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground">100% secure payment processing</p>
                </div>
                <div className="bg-background p-4 rounded-xl">
                  <h3 className="font-semibold mb-2">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Get help anytime you need</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Section */}
        <div className="bg-card rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Leaf History</h2>
          <div className="space-y-4">
            {userLeafs.history.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-background rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {item.action === 'Earned' ? (
                    <Gift className="text-green-500" />
                  ) : (
                    <ShoppingCart className="text-blue-500" />
                  )}
                  <div>
                    <p className="font-semibold">{item.source}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className={`w-4 h-4 ${item.action === 'Earned' ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`font-bold ${item.action === 'Earned' ? 'text-green-500' : 'text-red-500'}`}>
                    {item.action === 'Earned' ? '+' : '-'}{item.amount}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
