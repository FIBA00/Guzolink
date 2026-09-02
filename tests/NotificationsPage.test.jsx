import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import NotificationsPage from "../res/pages/NotificationsPage";
import { useNotificationStore } from "../res/store/notificationStore";
import { useExperienceStore } from "../res/store/experienceStore";
afterEach(() => {
  useNotificationStore.setState({ activities: [] });
  useExperienceStore.setState({
    preferences: {
      orderUpdates: true,
      merchantUpdates: false,
      marketing: false,
    },
  });
});
describe("NotificationsPage", () => {
  it("marks, clears, and updates preview notification controls", async () => {
    useNotificationStore.setState({
      activities: [
        {
          id: "activity-1",
          title: "Order received",
          detail: "The order has arrived.",
          kind: "order",
          createdAt: "2026-08-27T00:00:00.000Z",
          read: false,
        },
      ],
    });
    render(
      <QueryClientProvider
        client={
          new QueryClient({ defaultOptions: { queries: { retry: false } } })
        }
      >
        <MemoryRouter>
          <NotificationsPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
    fireEvent.click(await screen.findByText("Order received"));
    await waitFor(() =>
      expect(useNotificationStore.getState().activities[0].read).toBe(true)
    );
    fireEvent.click(
      screen.getByRole("switch", { name: "Order and delivery updates" })
    );
    await waitFor(() =>
      expect(useExperienceStore.getState().preferences.orderUpdates).toBe(false)
    );
    fireEvent.click(screen.getByRole("button", { name: "Clear read" }));
    await screen.findByText("Your activity record is clear.");
  });
});
