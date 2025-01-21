import { routes, renderContent } from '@/app/resources'
import { ChevronRight } from "lucide-react";
import Link from 'next/link';
import { cn } from "@/app/lib/utils";
import AnimatedGradientText from "@/app/Components/magicui/AnimatedGradientText";
import SparklesText from './Components/magicui/SparklesText';
import AnimatedGridPattern from "@/app/Components/magicui/AnimatedGridPattern";
import { FaGraduationCap, FaBook, FaVideo, FaHeadphones, FaNotesMedical, FaArrowRight } from 'react-icons/fa';
import ImageSlider from './Components/ImageSlider'
export default function Home() {
  const content = renderContent('home, about')

  return (
    <main className="min-h-screen bg-background">
      {/* Existing Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 pt-5">
        <div className="max-w-4xl text-center space-y-8">
          <SparklesText text={content.home.title} />
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground/90">
            {content.home.heading}
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            {content.home.text}
          </p>
          <div className='flex justify-center pt-2'>
            <Link href="/classes">
              <AnimatedGradientText>
                🎓{" "}
                <span
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-xl text-transparent`,
                  )}
                >
                  Start Learning Now
                </span>{" "}
                <ChevronRight className="ml-1 size-6 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedGradientText>
            </Link>
          </div>
        </div>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />
      </section>
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Features</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {content.home.features[0].description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.home.features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl  bg-neutral-200 dark:bg-neutral-900 hover:shadow-2xl hover:bg-green-200  dark:hover:bg-green-600 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">{content.home.about.title}</h2>
              <p className="text-foreground/70 mb-8">{content.home.about.text}</p>
              <Link href={content.home.about.button.link}>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
                  {content.home.about.button.text}
                  <FaArrowRight />
                </button>
              </Link>
            </div>
            <div className="relative">
              <AnimatedGridPattern className="absolute inset-0 opacity-10" />
              <div className="rounded-2xl  bg-neutral-200 dark:bg-neutral-900 hover:shadow-2xl hover:bg-green-200  dark:hover:bg-green-600 p-1">
                <div className="bg-card rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Why Choose Us?</h3>
                  <ul className="space-y-4 text-foreground/70">
                    <li className="flex items-center gap-3">
                      <FaGraduationCap className="text-primary" />
                      Expert Teachers
                    </li>
                    <li className="flex items-center gap-3">
                      <FaBook className="text-primary" />
                      Comprehensive Materials
                    </li>
                    <li className="flex items-center gap-3">
                      <FaVideo className="text-primary" />
                      Interactive Learning
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">{content.home.services.title}</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">{content.home.services.text}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(content.categories).slice(0, 3).map((category: any, index) => (
              <div key={index} className="p-6 rounded-xl  bg-neutral-200 dark:bg-neutral-900 hover:shadow-2xl hover:bg-green-200  dark:hover:bg-green-600 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-foreground">{category.name}</h3>
                <p className="text-foreground/70 mb-4">{category.description}</p>
                <Link href={category.button.link} className="text-primary hover:underline">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-background">
        
      <ImageSlider />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">{content.blog.title}</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">{content.blog.text}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">{content.contact.title}</h2>
              <p className="text-foreground/70 mb-8">{content.contact.text}</p>
              <div className="space-y-4">
                <p className="flex items-center gap-3 text-foreground">
                  <span className="text-primary">📞</span> {content.contact.number}
                </p>
                <p className="flex items-center gap-3 text-foreground">
                  <span className="text-primary">✉️</span> {content.contact.email}
                </p>
                <p className="flex items-center gap-3 text-foreground">
                  <span className="text-primary">📍</span> {content.contact.address}
                </p>
              </div>
            </div>
            <div className=" bg-neutral-200 dark:bg-neutral-900 rounded-xl p-6">
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-foreground mb-1">Name <span className="text-red-500">*</span></label>
                  <input type="text" id="name" placeholder="Name" className="w-full p-3 rounded-lg bg-white dark:bg-neutral-800" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-foreground mb-1">Email <span className="text-red-500">*</span></label>
                  <input type="email" id="email" placeholder="Email" className="w-full p-3 rounded-lg bg-white dark:bg-neutral-800" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-foreground mb-1">Message <span className="text-red-500">*</span></label>
                  <textarea id="message" placeholder="Message" rows={4} className="w-full p-3 rounded-lg bg-white dark:bg-neutral-800" required></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-blue-700 text-white dark:text-white rounded-lg hover:opacity-90">
                  Send Message
                </button>
              </form>            
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
