/** Style: Market Ledger — local preview review records mirror the administrator queue contract while the real API is being connected. */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { previewShops } from "../data/previewData";

const queue = previewShops.map((shop, index) => ({
  ...shop,
  merchantName: ["Mekdes Bekele", "Amanuel Tesfaye", "Hana Mekonnen"][index],
  merchantEmail: ["mekdes@guzolink.local", "amanuel@guzolink.local", "hana@guzolink.local"][index],
  approvalStatus: "pending",
  submittedAt: `2026-08-${25 - index}`,
}));

export const useAdminStore = create(
  persist(
    (set) => ({
      storefronts: queue,
      resubmissions: [{ id: "rs-1", shop: "Oasis Loom", status: "Awaiting merchant", requestedAt: "Aug 26" }],
      decide: (id, decision, reason = "") => set((state) => ({
        storefronts: state.storefronts.map((shop) => shop.id === id
          ? { ...shop, approvalStatus: decision, reviewReason: reason, reviewedAt: new Date().toISOString() }
          : shop),
      })),
      sendResubmissionReminder: (id) => set((state) => ({ resubmissions: state.resubmissions.map((item) => item.id === id ? { ...item, status: "Reminder sent" } : item) })),
    }),
    { name: "guzolink-admin-review-v1" },
  ),
);
