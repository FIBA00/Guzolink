/** Style: Market Ledger — DashboardPage remains only the merchant workspace route map; product management is modal-only within its desk. */
import { Route, Routes } from "react-router-dom";
import DashboardShell from "../components/layout/DashboardShell";
import DashboardOverview from "./dashboard/DashboardOverview";
import DashboardProducts from "./dashboard/DashboardProducts";
import DashboardOrders from "./dashboard/DashboardOrders";
import DashboardShop from "./dashboard/DashboardShop";
import DashboardCustomers from "./dashboard/DashboardCustomers";
import DashboardAnalytics from "./dashboard/DashboardAnalytics";
import DashboardSettings from "./dashboard/DashboardSettings";
import DashboardOperations from "./dashboard/DashboardOperations";
export default function DashboardPage() { return <Routes><Route element={<DashboardShell />}><Route index element={<DashboardOverview />} /><Route path="products" element={<DashboardProducts />} /><Route path="orders" element={<DashboardOrders />} /><Route path="orders/:id" element={<DashboardOrders detail />} /><Route path="shop" element={<DashboardShop />} /><Route path="customers" element={<DashboardCustomers />} /><Route path="analytics" element={<DashboardAnalytics />} /><Route path="operations" element={<DashboardOperations />} /><Route path="settings" element={<DashboardSettings />} /></Route></Routes>; }
