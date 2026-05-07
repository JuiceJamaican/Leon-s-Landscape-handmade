import { useSiteContent } from "@/hooks/use-site-content";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stoneItems = [
  { name: "Chopped Stone", price: "Call for pricing" },
  { name: "Flagstone", price: "Call for pricing" },
  { name: "Ledger Stone", price: "Call for pricing" },
  { name: "Stepping Stones", price: "Call for pricing" },
  { name: "Stone Veneer", price: "Call for pricing" },
];

const boulderItems = [
  { name: "Small Boulders (1-2ft)", price: "Call for pricing" },
  { name: "Medium Boulders (2-3ft)", price: "Call for pricing" },
  { name: "Large Boulders (3ft+)", price: "Call for pricing" },
];

export default function Stone() {
  const { data: content, isLoading } = useSiteContent();

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center dark:bg-neutral-900">
      <Loader2 className="animate-spin text-neutral-400" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-medium tracking-wide mb-8">
          <ArrowLeft size={16} /> BACK TO HOME
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 items-start mb-12"
        >
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-xl border border-neutral-200 dark:border-neutral-700">
            {content?.stoneImgUrl ? (
              <img
                src={content.stoneImgUrl}
                alt="Stone & Boulders"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                <span className="text-xs uppercase tracking-widest">Image Coming Soon</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">Stone & Boulders</h1>
            <div className="w-12 h-1 bg-black dark:bg-white mb-4" />
            <p className="text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
              Natural stone and boulders for landscaping, retaining walls, water features, and decorative applications. Contact us for current pricing and availability.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-sm font-medium tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all rounded-sm shadow-lg">
              GET A QUOTE <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 mb-8 text-xs text-red-600 font-bold tracking-widest">
          <span>* = OUT OF STOCK</span>
        </div>

        <Tabs defaultValue="stone" className="w-full">
          <TabsList className="w-full flex justify-start gap-4 bg-transparent h-auto mb-8 overflow-x-auto pb-2">
            <TabsTrigger
              value="stone"
              className="px-6 py-2 border border-neutral-200 dark:border-neutral-700 data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black rounded-full transition-all whitespace-nowrap dark:text-neutral-400"
            >
              Stone
            </TabsTrigger>
            <TabsTrigger
              value="boulders"
              className="px-6 py-2 border border-neutral-200 dark:border-neutral-700 data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black rounded-full transition-all whitespace-nowrap dark:text-neutral-400"
            >
              Boulders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stone" className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stoneItems.map((item, i) => {
                const customImage = content?.stoneImages?.[item.name];
                const isOutOfStock = content?.stoneStock?.[item.name] === false;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-neutral-50/50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 rounded-lg overflow-hidden hover:shadow-md transition-all relative"
                  >
                    {isOutOfStock && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="text-2xl text-red-600 font-bold leading-none select-none">*</span>
                      </div>
                    )}
                    <div className="aspect-video overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                      {customImage ? (
                        <img
                          src={customImage}
                          alt={item.name}
                          className={`w-full h-full object-cover transition-transform duration-500 ${isOutOfStock ? 'grayscale opacity-60' : 'group-hover:scale-105'}`}
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 ${isOutOfStock ? 'grayscale opacity-60' : ''}`}>
                          <span className="text-[10px] uppercase tracking-widest">Image Coming Soon</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <h3 className="font-serif text-base dark:text-neutral-200">{item.name} {isOutOfStock && <span className="text-red-600 ml-1">*</span>}</h3>
                      <span className="font-bold text-sm dark:text-neutral-300">{item.price}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="boulders" className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {boulderItems.map((item, i) => {
                const customImage = content?.stoneImages?.[item.name];
                const isOutOfStock = content?.stoneStock?.[item.name] === false;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-neutral-50/50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 rounded-lg overflow-hidden hover:shadow-md transition-all relative"
                  >
                    {isOutOfStock && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="text-2xl text-red-600 font-bold leading-none select-none">*</span>
                      </div>
                    )}
                    <div className="aspect-video overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                      {customImage ? (
                        <img
                          src={customImage}
                          alt={item.name}
                          className={`w-full h-full object-cover transition-transform duration-500 ${isOutOfStock ? 'grayscale opacity-60' : 'group-hover:scale-105'}`}
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 ${isOutOfStock ? 'grayscale opacity-60' : ''}`}>
                          <span className="text-[10px] uppercase tracking-widest">Image Coming Soon</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <h3 className="font-serif text-base dark:text-neutral-200">{item.name} {isOutOfStock && <span className="text-red-600 ml-1">*</span>}</h3>
                      <span className="font-bold text-sm dark:text-neutral-300">{item.price}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
