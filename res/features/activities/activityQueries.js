/** Style: Market Ledger — activity is cached from the configured REST feed in production and retained locally only while working in preview. */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isPreviewMode } from "../../services/api";
import { activitiesApi } from "../../services/apiResources";
import { useNotificationStore } from "../../store/notificationStore";

const activityKey = ["activities"];
export function useActivities(params = {}) { return useQuery({ queryKey: [...activityKey, params], queryFn: async () => { if (isPreviewMode()) return { items: useNotificationStore.getState().activities, total: useNotificationStore.getState().activities.length }; const result = await activitiesApi.list(params); const items = Array.isArray(result) ? result : result?.items || result?.activities || result?.results || []; return { items, total: result?.total || items.length }; }, staleTime: 30_000 }); }
export function useCreateActivity() { const client = useQueryClient(); return useMutation({ mutationFn: async (activity) => isPreviewMode() ? useNotificationStore.getState().addActivity(activity) : activitiesApi.create(activity), onSuccess: () => client.invalidateQueries({ queryKey: activityKey }) }); }
export function useReadActivity() { const client = useQueryClient(); return useMutation({ mutationFn: async (id) => isPreviewMode() ? useNotificationStore.getState().markRead(id) : activitiesApi.update(id, { read: true }), onSuccess: () => client.invalidateQueries({ queryKey: activityKey }) }); }
export function useClearReadActivities() { const client = useQueryClient(); return useMutation({ mutationFn: async () => isPreviewMode() ? useNotificationStore.getState().clearRead() : activitiesApi.update("read", { action: "clear" }), onSuccess: () => client.invalidateQueries({ queryKey: activityKey }) }); }
