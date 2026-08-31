/** @vitest-environment jsdom */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DashboardShop from "./DashboardShop";
import { previewShops } from "../../data/previewData";
import { useMerchantStore } from "../../store/merchantStore";
import { useNotificationStore } from "../../store/notificationStore";

vi.mock("../../services/api", () => ({ isPreviewMode: () => true }));

describe("DashboardShop approval", () => {
  beforeEach(() => { useMerchantStore.setState({ shop: { ...previewShops[0], banner: previewShops[0].image, logo: "", approvalStatus: "draft" } }); useNotificationStore.setState({ activities: [] }); });
  it("changes the storefront to pending approval and records the request", async () => { const client = new QueryClient({ defaultOptions: { queries: { retry: false } } }); render(<QueryClientProvider client={client}><DashboardShop /></QueryClientProvider>); fireEvent.click(await screen.findByRole("button", { name: "Request publishing approval" })); await waitFor(() => expect(screen.getByText("Approval pending")).toBeTruthy()); expect(useMerchantStore.getState().shop.approvalStatus).toBe("pending"); expect(useNotificationStore.getState().activities[0]?.title).toBe("Publishing approval requested"); });
});
