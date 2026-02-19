import { useSiteContent } from "@/hooks/use-site-content";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function HowWeWork() {
  const { data: content, isLoading } = useSiteContent();

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videos = content?.youtubeLinks || [];
  const projects = content?.projects || [];

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl text-neutral-900 mb-6">How We Work</h1>
          <p className="text-xl text-neutral-500 font-light max-w-2xl mx-auto">
            A behind-the-scenes look at our past, present, and future projects.
          </p>
        </motion.div>

        {/* Project Gallery */}
        <div className="mb-24">
          <h2 className="font-serif text-3xl mb-8 text-center">Project Gallery</h2>
          {projects.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-neutral-200 rounded-lg bg-neutral-50">
              <p className="text-neutral-400">Project gallery coming soon.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-center">{project.name}</h3>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="font-serif text-3xl mb-8 text-center">Videos</h2>
          {videos.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-neutral-200 rounded-lg bg-neutral-50">
              <p className="text-neutral-400">No videos available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {videos.map((link, i) => {
                const videoId = getYoutubeId(link);
                if (!videoId) return null;
                
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black rounded-lg overflow-hidden shadow-2xl aspect-video"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`Video ${i + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
