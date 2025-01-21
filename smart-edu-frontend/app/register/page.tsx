"use client"

import { useState } from 'react';

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Academic Info
    school: '',
    grade: '',
    stream: '',
    // Additional Info
    phoneNumber: '',
    parentEmail: '',
    subjects: [],
    interests: [],
  });

  const totalSteps = 3;

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {[1, 2, 3].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= stepNumber ? 'bg-green-600 text-white' : 'bg-foreground/10 text-foreground/50'
            }`}
          >
            {stepNumber}
          </div>
        ))}
      </div>
      <div className="h-2 bg-foreground/10 rounded-full">
        <div
          className="h-full bg-green-600 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Email Address</label>
        <input
          type="email"
          className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
      <div>
        <label className="block text-sm font-medium mb-2">School Name</label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Grade</label>
          <select className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none">
            <option>Grade 10</option>
            <option>Grade 11</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Stream</label>
          <select className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none">
            <option>Science</option>
            <option>Commerce</option>
            <option>Arts</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
      <div>
        <label className="block text-sm font-medium mb-2">Phone Number</label>
        <input
          type="tel"
          className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Parent's Email</label>
        <input
          type="email"
          className="w-full px-4 py-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Subjects Interested In</label>
        <div className="grid grid-cols-2 gap-2">
          {['Mathematics', 'Science', 'English', 'History', 'Geography', 'ICT'].map((subject) => (
            <label key={subject} className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4 rounded border-foreground/20" />
              <span>{subject}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <main className="min-h-screen bg-background pt-16 pb-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-foreground/5 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-500 to-emerald-800 bg-clip-text text-transparent">
              Create Your Account
            </h1>

            {renderProgressBar()}

            <form className="space-y-6">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}

              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="button"
                  onClick={step === totalSteps ? () => console.log('Submit') : handleNext}
                  className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transform hover:scale-[1.02] transition-all duration-300"
                >
                  {step === totalSteps ? 'Submit' : 'Next'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <span className="text-foreground/70">Already have an account? </span>
              <a href="/login" className="text-green-600 hover:text-green-700 font-medium">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
