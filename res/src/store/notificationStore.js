/** Style: Market Ledger — system activity is a concise, persisted record that can be reviewed from any top-level workspace. */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotificationStore = create(
  persist(
    (set) => ({
      activities: [],
      addActivity: ({ title, detail, kind = "system", link = "" }) => set((state) => ({
        activities: [{ id: `activity-${Date.now()}`, title, detail, kind, link, createdAt: new Date().toISOString(), read: false }, ...state.activities].slice(0, 50),
      })),
      markRead: (id) => set((state) => ({ activities: state.activities.map((activity) => activity.id === id ? { ...activity, read: true } : activity) })),
      markAllRead: () => set((state) => ({ activities: state.activities.map((activity) => ({ ...activity, read: true })) })),
      clearRead: () => set((state) => ({ activities: state.activities.filter((activity) => !activity.read) })),
    }),
    { name: "guzolink-system-activity-v1" },
  ),
);
