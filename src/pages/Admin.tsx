import { useAuth } from "@/hooks/use-auth";
import { useSiteContent, useUpdateSiteContent } from "@/hooks/use-site-content";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSiteContentSchema } from "@shared/schema";
import { Loader2, Plus, Trash2, Save, LogOut } from "lucide-react";
import { useEffect } from "react";
import { z } from "zod";

// Schema for the form - needs to handle the array properly
const formSchema = insertSiteContentSchema.omit({ id: true, section: true }).extend({
  youtubeLinks: z.array(z.string()),
  projects: z.array(z.object({ name: z.string(), image: z.string() })),
  reviews: z.array(z.object({ customer: z.string(), statement: z.string() })),
  woodStock: z.record(z.boolean()),
  suppliesStock: z.record(z.boolean()),
  woodImages: z.record(z.string()),
  materialImages: z.record(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

export default function Admin() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const { data: content, isLoading: contentLoading } = useSiteContent();
  const updateMutation = useUpdateSiteContent();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landscapeImgUrl: "",
      firewoodImgUrl: "",
      headerVideoUrl: "",
      phone: "",
      email: "",
      address: "",
      facebookUrl: "",
      youtubeLinks: [],
      projects: [],
      reviews: [],
      woodStock: { "Oak": true, "Mesquite": true, "Pecan": true },
      suppliesStock: {},
      woodImages: {},
      materialImages: {},
    },
  });

  const { fields: youtubeFields, append: appendYoutube, remove: removeYoutube } = useFieldArray({
    control: form.control,
    name: "youtubeLinks" as any,
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control: form.control,
    name: "projects" as any,
  });

  const { fields: reviewFields, append: appendReview, remove: removeReview } = useFieldArray({
    control: form.control,
    name: "reviews" as any,
  });

  // Prefill form when data loads
  useEffect(() => {
    if (content) {
      form.reset({
        landscapeImgUrl: content.landscapeImgUrl || "",
        firewoodImgUrl: content.firewoodImgUrl || "",
        headerVideoUrl: content.headerVideoUrl || "",
        phone: content.phone || "",
        email: content.email || "",
        address: content.address || "",
        facebookUrl: content.facebookUrl || "",
        youtubeLinks: content.youtubeLinks || [],
        projects: content.projects || [],
        reviews: content.reviews || [],
        woodStock: content.woodStock || { "Oak": true, "Mesquite": true, "Pecan": true },
        suppliesStock: content.suppliesStock || {},
        woodImages: content.woodImages || {},
        materialImages: content.materialImages || {},
      });
    }
  }, [content, form]);

  const onSubmit = (data: FormValues) => {
    updateMutation.mutate(data);
  };

  if (authLoading || contentLoading) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  // Not authenticated? Show login button
  if (!user) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-6 bg-neutral-50">
        <h1 className="font-serif text-4xl">Admin Access</h1>
        <p className="text-neutral-500">Please log in to manage site content.</p>
        <a 
          href="/api/login" 
          className="px-8 py-3 bg-black text-white text-sm font-medium tracking-widest hover:bg-neutral-800 transition-all rounded-sm shadow-lg"
        >
          LOGIN WITH REPLIT
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl">Site Configuration</h1>
          <div className="flex items-center gap-4">
             <span className="text-sm text-neutral-500">Welcome, {user.firstName || user.email}</span>
             <button 
               onClick={() => logout()}
               className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded hover:bg-white transition-colors text-sm"
             >
               <LogOut size={14} /> Logout
             </button>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Images Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-black rounded-full" /> 
              Feature Images
            </h2>
            
            <div className="grid gap-6">
              <FormField label="Landscape Image URL" name="landscapeImgUrl" register={form.register} error={form.formState.errors.landscapeImgUrl} />
              <FormField label="Firewood Image URL" name="firewoodImgUrl" register={form.register} error={form.formState.errors.firewoodImgUrl} />
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-black rounded-full" /> 
              Contact Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Phone Number" name="phone" register={form.register} error={form.formState.errors.phone} />
              <FormField label="Email Address" name="email" register={form.register} error={form.formState.errors.email} />
              <div className="md:col-span-2">
                <FormField label="Address" name="address" register={form.register} error={form.formState.errors.address} />
              </div>
              <div className="md:col-span-2">
                <FormField label="Facebook URL" name="facebookUrl" register={form.register} error={form.formState.errors.facebookUrl} />
              </div>
            </div>
          </div>

          {/* Firewood Inventory Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-black rounded-full" /> 
              Firewood Inventory & Images
            </h2>
            
            <div className="space-y-6">
              {["Oak", "Mesquite", "Pecan"].map((wood) => (
                <div key={wood} className="flex flex-col md:flex-row gap-4 p-4 border border-neutral-100 rounded">
                  <div className="flex-1">
                    <label className="block text-xs font-bold mb-1 uppercase">{wood} IMAGE URL</label>
                    <input 
                      {...form.register(`woodImages.${wood}` as any)}
                      className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-4">
                    <input 
                      type="checkbox" 
                      id={`stock-${wood}`}
                      {...form.register(`woodStock.${wood}` as any)}
                      className="w-4 h-4"
                    />
                    <label htmlFor={`stock-${wood}`} className="text-sm font-medium uppercase">In Stock</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Landscape Supplies Stock Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-black rounded-full" /> 
              Landscape Supplies Stock
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "1in Limestone", "2in Limestone", "3/8in Limestone", "1-2in River Rock", 
                "2-4in River Rock", "3/4in River Rock", "1-5in River Rock", "3/4 Pea Gravel", 
                "Pink Granite", "Black Star", "Decomposed Granite", "Road Base", "Fines", 
                "Concrete/Masonry Sand", "Screened Top Soil", "Fill Dirt", "Garden Mix", 
                "Sandy Loam", "Black Mulch", "Native Mulch"
              ].map(mat => (
                <div key={mat} className="flex items-center gap-2 p-2 border border-neutral-50 rounded">
                  <input 
                    type="checkbox" 
                    id={`stock-mat-${mat}`}
                    {...form.register(`suppliesStock.${mat}` as any)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`stock-mat-${mat}`} className="text-xs font-medium uppercase">{mat} In Stock</label>
                </div>
              ))}
            </div>
          </div>

          {/* Material Images Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-black rounded-full" /> 
              Material Images (By Name)
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "1in Limestone", "2in Limestone", "3/8in Limestone", "1-2in River Rock", 
                "2-4in River Rock", "3/4in River Rock", "1-5in River Rock", "3/4 Pea Gravel", 
                "Pink Granite", "Black Star", "Decomposed Granite", "Road Base", "Fines", 
                "Concrete/Masonry Sand", "Screened Top Soil", "Fill Dirt", "Garden Mix", 
                "Sandy Loam", "Black Mulch", "Native Mulch"
              ].map(mat => (
                <div key={mat}>
                  <label className="block text-[10px] font-bold mb-1 text-neutral-400 uppercase">{mat}</label>
                  <input 
                    {...form.register(`materialImages.${mat}` as any)}
                    placeholder="Image URL"
                    className="w-full px-3 py-1 bg-neutral-50 border border-neutral-200 rounded text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Links Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-black rounded-full" /> 
              YouTube Videos
            </h2>
            
            <div className="space-y-4 mb-6">
              {youtubeFields.map((field, index) => (
                <div key={field.id} className="flex gap-4">
                  <div className="flex-grow">
                    <input
                      {...form.register(`youtubeLinks.${index}` as const)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeYoutube(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={() => appendYoutube("")}
              className="flex items-center gap-2 text-sm font-medium text-black hover:opacity-70 transition-opacity"
            >
              <Plus size={16} /> ADD VIDEO LINK
            </button>
          </div>

          {/* Project Gallery Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-black rounded-full" /> 
              Project Gallery
            </h2>
            
            <div className="space-y-6 mb-6">
              {projectFields.map((field, index) => (
                <div key={field.id} className="p-4 border border-neutral-100 rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Project #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid gap-4">
                    <FormField label="Project Name" name={`projects.${index}.name`} register={form.register} />
                    <FormField label="Image URL" name={`projects.${index}.image`} register={form.register} />
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={() => appendProject({ name: "", image: "" })}
              className="flex items-center gap-2 text-sm font-medium text-black hover:opacity-70 transition-opacity"
            >
              <Plus size={16} /> ADD NEW PROJECT
            </button>
          </div>

          {/* Reviews Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-black rounded-full" /> 
              Customer Reviews
            </h2>
            
            <div className="space-y-6 mb-6">
              {reviewFields.map((field, index) => (
                <div key={field.id} className="p-4 border border-neutral-100 rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Review #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeReview(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid gap-4">
                    <FormField label="Customer Name" name={`reviews.${index}.customer`} register={form.register} />
                    <div>
                      <label className="block text-sm font-medium text-neutral-600 mb-1">Statement</label>
                      <textarea
                        {...form.register(`reviews.${index}.statement` as const)}
                        rows={3}
                        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={() => appendReview({ customer: "", statement: "" })}
              className="flex items-center gap-2 text-sm font-medium text-black hover:opacity-70 transition-opacity"
            >
              <Plus size={16} /> ADD NEW REVIEW
            </button>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-8 bg-white/80 backdrop-blur p-4 rounded-xl border border-neutral-200 shadow-lg flex justify-end">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex items-center gap-2 px-8 py-3 bg-black text-white font-medium tracking-wide hover:bg-neutral-800 transition-all rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateMutation.isPending ? <Loader2 className="animate-spin" /> : <Save size={18} />}
              SAVE CHANGES
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, name, register, error }: { label: string, name: any, register: any, error?: any }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-600 mb-1">{label}</label>
      <input
        {...register(name)}
        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-black transition-colors"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}
