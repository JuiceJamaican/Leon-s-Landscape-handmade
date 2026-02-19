// Icon imports removed as they are no longer used in the dropdown
import { useSiteContent } from "@/hooks/use-site-content";
import { ServiceCard } from "@/components/ServiceCard";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Star, User } from "lucide-react"; // Re-added Star and User
import { Link } from "wouter";
import { useState, useEffect } from "react";

const testimonials = [
  {
    text: "Leon's has been our go-to for years. Reliable, honest pricing and they always show up when they say they will. The quality of the oak is excellent.",
    author: "S. Miller"
  },
  {
    text: "Needed river rock for a drainage project. The gravel calculator on their site helped me order exactly what I needed. Fair prices and quick delivery.",
    author: "John T."
  },
  {
    text: "Best landscape supply in Georgetown. The garden mix is premium - our raised beds are thriving. Highly recommend Leon's.",
    author: "Maria Garcia"
  },
  {
    text: "Called for a cord of mesquite. It was delivered and stacked perfectly. Very professional service from start to finish.",
    author: "Robert P."
  },
  {
    text: "Great experience ordering road base. The driver was skilled and dumped it exactly where I needed it. Leon is a pleasure to work with.",
    author: "David L."
  }
];

export default function Home() {
  const { data: content, isLoading } = useSiteContent();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-300" />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[550px] flex items-center justify-center bg-neutral-50 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.05),transparent_40%)]" />
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-x-0 -top-24 -z-10 flex items-center justify-center opacity-10 select-none pointer-events-none">
              <img 
                src="/assets/logo.png" 
                alt="" 
                className="w-96 h-auto"
              />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-neutral-900 mb-2 leading-tight">
              Leon's Landscape Supplies
            </h1>
            <p className="text-xl md:text-2xl font-bold text-neutral-900 tracking-widest mb-8">
              Est. 2025
            </p>
            
            <div className="flex justify-center gap-4 mb-12">
              <Link href="/contact" className="px-8 py-3 bg-black text-white text-sm font-medium tracking-widest hover:bg-neutral-800 transition-all rounded-sm shadow-lg">
                GET A QUOTE
              </Link>
            </div>

            {/* Testimonial Carousel */}
            <div className="max-w-2xl mx-auto h-32 relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-neutral-100 shadow-sm"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-xs">★</span>
                      ))}
                    </div>
                    <blockquote className="text-neutral-700 italic font-light text-base mb-2">
                      "{(content?.reviews || testimonials)[currentTestimonial % (content?.reviews?.length || testimonials.length)]?.statement || (content?.reviews || testimonials)[currentTestimonial % (content?.reviews?.length || testimonials.length)]?.text}"
                    </blockquote>
                    <cite className="text-neutral-500 text-xs font-medium not-italic">— {(content?.reviews || testimonials)[currentTestimonial % (content?.reviews?.length || testimonials.length)]?.customer || (content?.reviews || testimonials)[currentTestimonial % (content?.reviews?.length || testimonials.length)]?.author}</cite>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
        >
          <ServiceCard
            title="Landscape Supplies"
            description="Fill dirt, sand, stone, and gravel for all your construction and aesthetic needs."
            imageUrl={content?.landscapeImgUrl || ""}
            href="/supplies"
          />
          <ServiceCard
            title="Firewood"
            description="Premium seasoned firewood delivered directly to your door, stacked and ready to burn."
            imageUrl={content?.firewoodImgUrl || ""}
            href="/firewood"
          />
        </motion.div>
      </section>

      {/* Trust/Info Strip */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="font-serif text-2xl mb-2">Locally Owned</h3>
            <p className="text-neutral-400 font-light">Serving our community with pride and dedication for years.</p>
          </div>
          <div>
            <h3 className="font-serif text-2xl mb-2">Premium Quality</h3>
            <p className="text-neutral-400 font-light">We source only the best materials for your projects.</p>
          </div>
          <div>
            <h3 className="font-serif text-2xl mb-2">Fast Delivery</h3>
            <p className="text-neutral-400 font-light">Prompt service to keep your schedule on track.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
