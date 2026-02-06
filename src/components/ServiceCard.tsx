import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  href: string;
}

export function ServiceCard({ title, description, imageUrl, href }: ServiceCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="relative h-full overflow-hidden bg-white border border-neutral-100 rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1">
        {/* Image Container */}
        <div className="aspect-[4/3] overflow-hidden bg-neutral-100 relative">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300 bg-neutral-50">
              No Image
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="font-serif text-2xl mb-3 text-neutral-900 group-hover:text-black transition-colors">{title}</h3>
          <p className="text-neutral-500 font-light leading-relaxed mb-6 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-black group-hover:translate-x-2 transition-transform duration-300">
            EXPLORE <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
