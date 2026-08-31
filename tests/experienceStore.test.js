import { beforeEach, describe, expect, it } from "vitest";
import { useExperienceStore } from "../res/store/experienceStore";

describe("experience preview store", () => {
  beforeEach(() => { useExperienceStore.setState({ profile: { name: "Mekdes Bekele" }, supportTickets: [], growth: { analytics: false }, merchantOperations: { fulfilment: [{ id: "GL-2048", status: "Ready to pack" }] } }); });
  it("persists profile, support, growth, and fulfilment preview mutations through API-compatible shapes", () => { const store = useExperienceStore.getState(); store.updateProfile({ phone: "+251 911 111 111" }); store.createTicket({ subject: "Delivery question", message: "Where is my order?" }); store.updateGrowth({ analytics: true }); store.updateFulfilment("GL-2048", "Packed"); const state = useExperienceStore.getState(); expect(state.profile.phone).toBe("+251 911 111 111"); expect(state.supportTickets[0]).toMatchObject({ subject: "Delivery question", status: "Open" }); expect(state.growth.analytics).toBe(true); expect(state.merchantOperations.fulfilment[0].status).toBe("Packed"); });
});
