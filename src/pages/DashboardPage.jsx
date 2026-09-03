/** Style: Market Ledger — DashboardPage remains only the merchant workspace route map; product management is modal-only within its desk. */
import { Route, Routes } from "react-router-dom";

// ! internal imports
import DashboardShell from "../layout/DashboardShell.jsx";
import DashboardOverview from "../features/merchant/pages/DashboardOverview.jsx";
import DashboardProducts from "../features/merchant/pages/DashboardProducts.jsx";
import DashboardOrders from "../features/merchant/pages/DashboardOrders.jsx";
import DashboardShop from "../features/merchant/pages/DashboardShop.jsx";
import DashboardCustomers from "../features/merchant/pages/DashboardCustomers.jsx";
import DashboardAnalytics from "../features/merchant/pages/DashboardAnalytics.jsx";
import DashboardSettings from "../features/merchant/pages/DashboardSettings.jsx";
import DashboardOperations from "../features/merchant/pages/DashboardOperations.jsx";

export default function DashboardPage() {
  return (
    <Routes>
      <Route element={<DashboardShell />}>
        <Route index element={<DashboardOverview />} />
        <Route path="products" element={<DashboardProducts />} />
        <Route path="orders" element={<DashboardOrders />} />
        <Route path="orders/:id" element={<DashboardOrders detail />} />
        <Route path="shop" element={<DashboardShop />} />
        <Route path="customers" element={<DashboardCustomers />} />
        <Route path="analytics" element={<DashboardAnalytics />} />
        <Route path="operations" element={<DashboardOperations />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>
    </Routes>
  );
}
