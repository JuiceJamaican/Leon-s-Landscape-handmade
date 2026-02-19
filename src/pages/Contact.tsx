import { useSiteContent } from "@/hooks/use-site-content";
import { motion } from "framer-motion";
import { Phone, Mail, Facebook, Loader2, ArrowRight } from "lucide-react";

export default function Contact() {
  const { data: content, isLoading } = useSiteContent();

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl text-neutral-900 mb-6">Contact Us</h1>
          <div className="w-12 h-1 bg-black" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-12"
          >
            <div className="group">
              <h3 className="flex items-center gap-3 text-2xl font-serif mb-2 group-hover:text-neutral-600 transition-colors">
                <Phone className="w-6 h-6" /> Phone
              </h3>
              <a href={`tel:${content?.phone}`} className="text-xl font-light text-neutral-600 hover:text-black transition-colors block pl-9">
                {content?.phone}
              </a>
            </div>

            <div className="group">
              <h3 className="flex items-center gap-3 text-2xl font-serif mb-2 group-hover:text-neutral-600 transition-colors">
                <Mail className="w-6 h-6" /> Email
              </h3>
              <a href={`mailto:${content?.email}`} className="text-xl font-light text-neutral-600 hover:text-black transition-colors block pl-9 break-all">
                {content?.email}
              </a>
            </div>

            <div className="group">
              <h3 className="flex items-center gap-3 text-2xl font-serif mb-2 group-hover:text-neutral-600 transition-colors">
                <ArrowRight className="w-6 h-6 rotate-90" /> Address
              </h3>
              <p className="text-xl font-light text-neutral-600 pl-9 mb-4">
                {content?.address || "657 county road 150, Georgetown, TX, United States, Texas"}
              </p>
              <div className="pl-9 flex flex-wrap gap-3">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content?.address || "657 county road 150, Georgetown, TX")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white transition-all text-xs font-medium tracking-wider rounded-sm"
                >
                  GOOGLE MAPS
                </a>
                <a 
                  href={`maps://maps.apple.com/?q=${encodeURIComponent(content?.address || "657 county road 150, Georgetown, TX")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white transition-all text-xs font-medium tracking-wider rounded-sm"
                >
                  APPLE MAPS
                </a>
                <a 
                  href={`https://waze.com/ul?q=${encodeURIComponent(content?.address || "657 county road 150, Georgetown, TX")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white transition-all text-xs font-medium tracking-wider rounded-sm"
                >
                  WAZE
                </a>
              </div>
            </div>

            <div className="group">
              <h3 className="flex items-center gap-3 text-2xl font-serif mb-2 group-hover:text-neutral-600 transition-colors">
                <Facebook className="w-6 h-6" /> Follow Us
              </h3>
              {content?.facebookUrl && (
                <a href={content.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-xl font-light text-neutral-600 hover:text-black transition-colors flex items-center gap-2 pl-9">
                  Leons Landscape Supplies <ArrowRight size={16} />
                </a>
              )}
            </div>

            <div className="group pt-4 border-t border-neutral-100">
              <h3 className="text-2xl font-serif mb-4">Hours of Operation</h3>
              <div className="pl-9 space-y-2 text-lg font-light text-neutral-600">
                <p><span className="font-medium text-black">Monday-Friday:</span> 8am-4pm</p>
                <p><span className="font-medium text-black">Saturday:</span> 8am-1pm</p>
                <p><span className="font-medium text-black">Sunday:</span> Closed</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-neutral-50 border border-neutral-100 p-12 rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-serif mb-6">Get In Touch</h2>
            <p className="text-lg text-neutral-600 font-light leading-relaxed mb-8">
              Have questions about our products or services? We're here to help. Contact us today and let's discuss your landscaping and construction needs.
            </p>
            
            <ul className="space-y-4 font-light text-neutral-700">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                Call for immediate assistance
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                Email us with project details
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                Message us on Facebook
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                Visit for personal consultation
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
