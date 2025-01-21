"use client"

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    const ADMIN_EMAIL = "admin@smartedu.lk";
    const ADMIN_PASSWORD = "admin123";
 
    if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminToken', btoa(`${formData.email}:${Date.now()}`));
      window.location.href = '/admin';
    } else {
      alert('Invalid credentials');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen bg-background pt-16 pb-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-card backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-500 to-emerald-800 bg-clip-text text-transparent">
            Welcome Back
          </h1>
           
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-foreground/90 mb-2 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-card border border-foreground/20 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                placeholder="student@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-foreground/90 mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-foreground/20 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/70 hover:text-foreground/90"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded border-foreground/20" />
                <span className="ml-2 text-sm text-foreground/70">Remember me</span>
              </label>
              <a href="#" className="text-sm text-green-600 hover:text-green-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transform hover:scale-[1.02] transition-all duration-300"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-foreground/70">Don't have an account? </span>
            <a href="/register" className="text-green-600 hover:text-green-700 font-medium">
              Register now
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
