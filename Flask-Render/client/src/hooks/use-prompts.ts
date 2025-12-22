import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertPrompt } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function usePrompts() {
  return useQuery({
    queryKey: [api.prompts.list.path],
    queryFn: async () => {
      const res = await fetch(api.prompts.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch prompts");
      return api.prompts.list.responses[200].parse(await res.json());
    },
  });
}

export function usePrompt(id: number) {
  return useQuery({
    queryKey: [api.prompts.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.prompts.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch prompt");
      return api.prompts.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreatePrompt() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertPrompt) => {
      const validated = api.prompts.create.input.parse(data);
      const res = await fetch(api.prompts.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.prompts.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create prompt");
      }
      return api.prompts.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.prompts.list.path] });
      toast({
        title: "Success",
        description: "Prompt created successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}

export function useUpdatePrompt() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Partial<InsertPrompt>) => {
      const validated = api.prompts.update.input.parse(updates);
      const url = buildUrl(api.prompts.update.path, { id });
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.prompts.update.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        if (res.status === 404) throw new Error("Prompt not found");
        throw new Error("Failed to update prompt");
      }
      return api.prompts.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.prompts.list.path] });
      toast({
        title: "Updated",
        description: "Prompt updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}

export function useDeletePrompt() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.prompts.delete.path, { id });
      const res = await fetch(url, { method: "DELETE", credentials: "include" });
      
      if (res.status === 404) throw new Error("Prompt not found");
      if (!res.ok) throw new Error("Failed to delete prompt");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.prompts.list.path] });
      toast({
        title: "Deleted",
        description: "Prompt removed successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
