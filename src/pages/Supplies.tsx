import { useSiteContent } from "@/hooks/use-site-content";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Loader2, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Supplies() {
  const { data: content, isLoading } = useSiteContent();
  const [calc, setCalc] = useState({ length: 0, width: 0, depth: 3 });
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    // Length (in feet) x Width (in feet) x Depth (in inches) divided by 324
    const cubicYards = (calc.length * calc.width * calc.depth) / 324;
    setResult(Math.ceil(cubicYards * 100) / 100);
  };

  const categories = [
    {
      id: "rocks",
      title: "Rocks & Gravel",
      items: [
        { name: "1in Limestone", price: "$45" },
        { name: "2in Limestone", price: "$45" },
        { name: "3/8in Limestone", price: "$50" },
        { name: "1-2in River Rock", price: "$65" },
        { name: "2-4in River Rock", price: "$65" },
        { name: "3/4in River Rock", price: "$65" },
        { name: "1-5in River Rock", price: "$60" },
        { name: "3/4 Pea Gravel", price: "$75" },
        { name: "Pink Granite", price: "$75" },
        { name: "Black Star", price: "$185" },
        { name: "Decomposed Granite", price: "$65" },
      ]
    },
    {
      id: "sand",
      title: "Sand & Base Materials",
      items: [
        { name: "Road Base", price: "$35" },
        { name: "Fines", price: "$25" },
        { name: "Concrete/Masonry Sand", price: "$70" },
      ]
    },
    {
      id: "soils",
      title: "Soils & Mulches",
      items: [
        { name: "Screened Top Soil", price: "$25" },
        { name: "Fill Dirt", price: "$11" },
        { name: "Garden Mix", price: "$45" },
        { name: "Sandy Loam", price: "$35" },
        { name: "Black Mulch", price: "$70" },
        { name: "Native Mulch", price: "$70" },
      ]
    }
  ];

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-black transition-colors text-sm font-medium tracking-wide mb-8">
          <ArrowLeft size={16} /> BACK TO HOME
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 items-start mb-12"
        >
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-neutral-100 shadow-xl">
             <img 
               src={content?.landscapeImgUrl || ""} 
               alt="Landscape Supplies"
               className="w-full h-full object-cover"
             />
          </div>
          
          <div className="pt-2">
            <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">Landscape Supplies</h1>
            <div className="w-12 h-1 bg-black mb-4" />
            <p className="text-base text-neutral-600 font-light leading-relaxed mb-6">
              Quality bulk materials for all your landscaping and construction projects. All pricing listed is per cubic yard.
            </p>
            <p className="text-sm font-medium text-neutral-800 bg-neutral-50 p-3 rounded border-l-4 border-black mb-6">
              NOTE: All pricing is per cubic yard.
            </p>
            
            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-sm font-medium tracking-widest hover:bg-neutral-800 transition-all rounded-sm shadow-lg">
              GET A QUOTE <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        <Tabs defaultValue="rocks" className="w-full">
          <TabsList className="w-full flex justify-start gap-4 bg-transparent h-auto mb-8 overflow-x-auto pb-2">
            {categories.map(cat => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="px-6 py-2 border border-neutral-200 data-[state=active]:bg-black data-[state=active]:text-white rounded-full transition-all whitespace-nowrap"
              >
                {cat.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="flex items-center gap-2 mb-8 text-xs text-red-600 font-bold tracking-widest">
            <span>* = OUT OF STOCK</span>
          </div>
          
          {categories.map(cat => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, i) => {
                  const customImage = content?.materialImages?.[item.name];
                  const isOutOfStock = content?.suppliesStock?.[item.name] === false;
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group bg-neutral-50/50 border border-neutral-100 rounded-lg overflow-hidden hover:shadow-md transition-all relative"
                    >
                      {isOutOfStock && (
                        <div className="absolute top-2 right-2 z-10">
                          <span className="text-2xl text-red-600 font-bold leading-none select-none">*</span>
                        </div>
                      )}
                      <div className="aspect-video overflow-hidden bg-neutral-200 relative">
                        {customImage ? (
                          <img src={customImage} alt={item.name} className={`w-full h-full object-cover transition-transform duration-500 ${isOutOfStock ? 'grayscale opacity-60' : 'group-hover:scale-105'}`} />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center text-neutral-400 bg-neutral-100 ${isOutOfStock ? 'grayscale opacity-60' : ''}`}>
                            <span className="text-[10px] uppercase tracking-widest">Image Coming Soon</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <h3 className="font-serif text-base">{item.name} {isOutOfStock && <span className="text-red-600 ml-1">*</span>}</h3>
                        <span className="font-bold text-sm">{item.price}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Calculator Section */}
        <div className="mt-16 bg-neutral-900 text-white p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6" />
            <h2 className="font-serif text-2xl">Coverage Calculator</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">LENGTH (FEET)</label>
              <input 
                type="number" 
                value={calc.length || ''} 
                onChange={e => setCalc({...calc, length: Number(e.target.value)})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">WIDTH (FEET)</label>
              <input 
                type="number" 
                value={calc.width || ''} 
                onChange={e => setCalc({...calc, width: Number(e.target.value)})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">DEPTH (INCHES)</label>
              <input 
                type="number" 
                value={calc.depth || ''} 
                onChange={e => setCalc({...calc, depth: Number(e.target.value)})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2 text-white"
              />
            </div>
            <button 
              onClick={calculate}
              className="bg-white text-black font-bold py-2 px-6 rounded hover:bg-neutral-200 transition-colors h-[42px]"
            >
              CALCULATE
            </button>
          </div>
          {result !== null && (
            <div className="mt-8 pt-8 border-t border-neutral-800">
              <p className="text-sm text-neutral-400 mb-1">ESTIMATED VOLUME NEEDED</p>
              <p className="text-4xl font-serif">{result} Cubic Yards</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
