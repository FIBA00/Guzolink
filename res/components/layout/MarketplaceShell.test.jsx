/** @vitest-environment jsdom */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MarketplaceShell from "./MarketplaceShell";
import { useLocaleStore } from "../../store/localeStore";
import { useNotificationStore } from "../../store/notificationStore";

vi.mock("../../services/api", () => ({ isPreviewMode: () => true }));

function renderShell() { const client = new QueryClient({ defaultOptions: { queries: { retry: false } } }); return render(<QueryClientProvider client={client}><MemoryRouter><MarketplaceShell><p>Page content</p></MarketplaceShell></MemoryRouter></QueryClientProvider>); }

describe("MarketplaceShell navigation", () => {
  beforeEach(() => { useLocaleStore.setState({ locale: "en" }); useNotificationStore.setState({ activities: [] }); });
  it("opens and closes the accessible sidebar from the navbar menu button", () => { renderShell(); const menuButton = screen.getByRole("button", { name: "Menu" }); fireEvent.click(menuButton); const sidebar = screen.getByRole("dialog", { name: "Menu" }); expect(sidebar.className).toContain("translate-x-0"); fireEvent.click(screen.getAllByRole("button", { name: "Close menu" }).at(-1)); expect(sidebar.className).toContain("translate-x-full"); });
  it("switches shared navigation labels to Amharic", () => { renderShell(); const toggles = screen.getAllByRole("button", { name: "English / Amharic" }); fireEvent.click(toggles[0]); expect(screen.getAllByText("ይመልከቱ").length).toBeGreaterThan(0); });
});
