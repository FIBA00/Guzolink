/** @vitest-environment jsdom */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminPage from "../res/pages/AdminPage";
import { previewShops } from "../res/data/previewData";
import { useAdminStore } from "../res/store/adminStore";
import { useNotificationStore } from "../res/store/notificationStore";

vi.mock("../services/api", () => ({ isPreviewMode: () => true }));
const reviewQueue = previewShops.map((shop) => ({ ...shop, merchantName: "Demo merchant", merchantEmail: "merchant@guzolink.local", approvalStatus: "pending", submittedAt: "2026-08-25" }));
describe("AdminPage review queue", () => {
  beforeEach(() => { useAdminStore.setState({ storefronts: reviewQueue.map((shop) => ({ ...shop })) }); useNotificationStore.setState({ activities: [] }); });
  it("allows an administrator to approve a pending storefront and records the decision", async () => { const client = new QueryClient({ defaultOptions: { queries: { retry: false } } }); render(<QueryClientProvider client={client}><MemoryRouter><AdminPage /></MemoryRouter></QueryClientProvider>); fireEvent.click(await screen.findAllByRole("button", { name: "Review" }).then((buttons) => buttons[0])); fireEvent.click(screen.getByRole("button", { name: "Approve storefront" })); await waitFor(() => expect(useAdminStore.getState().storefronts[0].approvalStatus).toBe("approved")); expect(useNotificationStore.getState().activities[0]?.title).toBe("Storefront approved"); });
});
