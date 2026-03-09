import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type AssessmentInput, type AssessmentUpdateInput } from "@shared/routes";

export function useAssessments() {
  return useQuery({
    queryKey: [api.assessments.list.path],
    queryFn: async () => {
      const res = await fetch(api.assessments.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch assessments");
      return api.assessments.list.responses[200].parse(await res.json());
    },
  });
}

export function useAssessment(id: number) {
  return useQuery({
    queryKey: [api.assessments.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.assessments.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch assessment");
      return api.assessments.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AssessmentInput) => {
      const validated = api.assessments.create.input.parse(data);
      const res = await fetch(api.assessments.create.path, {
        method: api.assessments.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create assessment");
      return api.assessments.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.assessments.list.path] });
    },
  });
}

export function useUpdateAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & AssessmentUpdateInput) => {
      const validated = api.assessments.update.input.parse(updates);
      const url = buildUrl(api.assessments.update.path, { id });
      const res = await fetch(url, {
        method: api.assessments.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update assessment");
      return api.assessments.update.responses[200].parse(await res.json());
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [api.assessments.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.assessments.get.path, variables.id] });
    },
  });
}
