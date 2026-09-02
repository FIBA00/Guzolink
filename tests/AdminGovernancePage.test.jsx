import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdminGovernancePage from "../res/pages/AdminGovernancePage";
import { useAdminStore } from "../res/store/adminStore";
afterEach(() =>
  useAdminStore.setState({
    resubmissions: [
      {
        id: "rs-1",
        shop: "Oasis Loom",
        status: "Awaiting merchant",
        requestedAt: "Aug 26",
      },
    ],
  })
);
describe("AdminGovernancePage", () => {
  it("records a merchant reminder through the cached governance mutation", async () => {
    render(
      <QueryClientProvider
        client={
          new QueryClient({ defaultOptions: { queries: { retry: false } } })
        }
      >
        <MemoryRouter>
          <AdminGovernancePage />
        </MemoryRouter>
      </QueryClientProvider>
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Send reminder" })
    );
    await waitFor(() =>
      expect(useAdminStore.getState().resubmissions[0].status).toBe(
        "Reminder sent"
      )
    );
  });
});
