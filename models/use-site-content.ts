import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type SiteContentResponse, type SiteContentInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useSiteContent() {
  return useQuery<SiteContentResponse>({
    queryKey: [api.siteContent.get.path],
    queryFn: async () => {
      const res = await fetch(api.siteContent.get.path);
      if (!res.ok) throw new Error("Failed to fetch site content");
      return await res.json();
    },
  });
}

export function useUpdateSiteContent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: SiteContentInput) => {
      const res = await fetch(api.siteContent.update.path, {
        method: api.siteContent.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to update site content");
      }
      
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.siteContent.get.path] });
      toast({
        title: "Content Updated",
        description: "Your changes have been saved successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
