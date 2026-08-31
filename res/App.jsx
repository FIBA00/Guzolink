/** Style: Market Ledger — navigation moves between a public catalogue and a focused merchant workspace. */
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";

// ! internal imports
import { queryClient } from "./lib/queryClient.js";
import { useSession } from "./features/auth/authQueries.js";
import { useAuthStore } from "./store/authStore.js";
import LoadingScreen from "./components/common/LoadingScreen.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ProductsPage = lazy(() => import("./pages/ProductsPage.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
const ShopsPage = lazy(() => import("./pages/ShopsPage.jsx"));
const ShopPage = lazy(() => import("./pages/ShopPage.jsx"));
const CartPage = lazy(() => import("./pages/CartPage.jsx"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage.jsx"));
const AuthPage = lazy(() => import("./pages/AuthPage.jsx"));
const CustomerCenterPage = lazy(() => import("./pages/CustomerCenterPage.jsx"));
const HelpPage = lazy(() => import("./pages/HelpPage.jsx"));
const PolicyPage = lazy(() => import("./pages/PolicyPage.jsx"));
const GrowthPage = lazy(() => import("./pages/GrowthPage.jsx"));
const MerchantOnboardingPage = lazy(
  () => import("./pages/MerchantOnboardingPage.jsx")
);
const AdminGovernancePage = lazy(() => import("./pages/AdminGovernancePage.jsx"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage.jsx"));
const OrdersPage = lazy(() => import("./pages/OrdersPage.jsx"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetailsPage.jsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

function SessionBootstrap({ children }) {
  const setUser = useAuthStore(state => state.setUser);
  const clearUser = useAuthStore(state => state.clearUser);
  const { data, isFetched } = useSession();

  useEffect(() => {
    if (!isFetched) return;
    if (data?.user) setUser(data.user);
    else clearUser();
  }, [clearUser, data, isFetched, setUser]);

  useEffect(() => {
    function handleUnauthorized() {
      clearUser();
      toast.error("Your session has ended. Please sign in again.");
    }
    window.addEventListener("guzolink:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("guzolink:unauthorized", handleUnauthorized);
  }, [clearUser]);
  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SessionBootstrap>
          <Toaster position="bottom-right" richColors closeButton />
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<ProductsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/shops" element={<ShopsPage />} />
              <Route path="/shops/:slug" element={<ShopPage />} />
              <Route path="/shop/:slug" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/register" element={<AuthPage mode="register" />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/account" element={<CustomerCenterPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/:id" element={<OrderDetailsPage />} />
              </Route>
              <Route element={<ProtectedRoute merchantOnly />}>
                <Route path="/dashboard/*" element={<DashboardPage />} />
              </Route>
              <Route element={<ProtectedRoute merchantOnly />}>
                <Route
                  path="/merchant/onboarding"
                  element={<MerchantOnboardingPage />}
                />
              </Route>
              <Route element={<ProtectedRoute adminOnly />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
              <Route element={<ProtectedRoute adminOnly />}>
                <Route
                  path="/admin/governance"
                  element={<AdminGovernancePage />}
                />
              </Route>
              <Route path="/help" element={<HelpPage />} />
              <Route path="/policies/:slug" element={<PolicyPage />} />
              <Route path="/growth" element={<GrowthPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </SessionBootstrap>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
