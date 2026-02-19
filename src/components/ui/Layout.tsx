import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Instagram, Facebook, Mail, Phone, Lock, ChevronDown, Calculator, Flame, Mountain } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { data: content } = useSiteContent();

  // Secret Admin Trigger Logic
  const [secretClicks, setSecretClicks] = useState(0);

  const handleSecretClick = () => {
    // If clicked less than 5 times, return to home page
    if (secretClicks < 4) {
      setLocation("/");
    }
    setSecretClicks((prev) => {
      const next = prev + 1;
      if (next === 5) {
        setLocation("/admin");
        return 0;
      }
      return next;
    });
  };

  // Reset clicks if inactive for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setSecretClicks(0), 2000);
    return () => clearTimeout(timer);
  }, [secretClicks]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Secret Trigger */}
          <button 
            onClick={handleSecretClick}
            className="flex items-center gap-2 group outline-none focus:outline-none"
          >
            <img 
              src="/assets/logo.png" 
              alt="Leon's Landscape Supplies" 
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
            <span className="font-serif text-2xl tracking-tighter font-medium">LEON'S</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-xs font-medium tracking-widest transition-all duration-300 hover:text-black outline-none">
                HOME <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/" className="w-full flex items-center gap-2 cursor-pointer">
                    HOME
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/supplies" className="w-full flex items-center gap-2 cursor-pointer">
                    LANDSCAPE SUPPLIES
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/firewood" className="w-full flex items-center gap-2 cursor-pointer">
                    FIREWOOD
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/supplies" className="w-full flex items-center gap-2 cursor-pointer">
                    COVERAGE CALCULATOR
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink href="/how-we-work" active={location === "/how-we-work"}>HOW WE WORK</NavLink>
            <NavLink href="/construction" active={location === "/construction"}>CONSTRUCTION</NavLink>
            <NavLink href="/contact" active={location === "/contact"}>CONTACT</NavLink>
            
            {/* CTA Button */}
            <Link href="/contact" className="ml-4 px-6 py-2.5 bg-black text-white text-xs font-medium tracking-widest hover:bg-black/80 transition-colors rounded-sm">
              GET A QUOTE
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-black hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>HOME</MobileNavLink>
              <MobileNavLink href="/how-we-work" onClick={() => setIsMobileMenuOpen(false)}>HOW WE WORK</MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</MobileNavLink>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="block w-full py-4 bg-black text-white text-sm font-medium tracking-widest mt-4">
                  GET A QUOTE
                </span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-50 border-t border-black/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <img src="/assets/logo.png" alt="Leon's" className="h-8 w-auto" />
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xs mx-auto md:mx-0">
                Premium landscape supplies and firewood delivery for professional and DIY projects.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 text-sm text-neutral-600">
              <h4 className="font-medium text-black mb-1">Contact</h4>
              <a href={`tel:${content?.phone}`} className="hover:text-black transition-colors flex items-center justify-center md:justify-start gap-2">
                <Phone size={14} /> {content?.phone}
              </a>
              <a href={`mailto:${content?.email}`} className="hover:text-black transition-colors flex items-center justify-center md:justify-start gap-2">
                <Mail size={14} /> {content?.email}
              </a>
            </div>

            <div className="flex flex-col gap-4 items-center md:items-start">
              <h4 className="font-medium text-black text-sm">Follow Us</h4>
              <div className="flex gap-4">
                {content?.facebookUrl && (
                  <a href={content.facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 border border-black/10 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all duration-300">
                    <Facebook size={18} />
                  </a>
                )}
                <a href="#" className="w-10 h-10 border border-black/10 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all duration-300">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-black/5 text-center text-xs text-neutral-400 flex justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Leon's Landscape Supplies. All rights reserved.</p>
            <Link href="/admin" className="opacity-50 hover:opacity-100 transition-opacity">
              <Lock size={12} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={`text-xs font-medium tracking-widest transition-all duration-300 hover:text-black relative py-1
      ${active ? "text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-black" : "text-neutral-500"}`}>
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="text-lg font-medium tracking-wide py-2 text-neutral-800 hover:text-black">
      {children}
    </Link>
  );
}
