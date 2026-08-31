/** Style: Market Ledger — navigation moves between a public catalogue and a focused merchant workspace. */
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { queryClient } from "./lib/queryClient";
import { useSession } from "./features/auth/authQueries";
import { useAuthStore } from "./store/authStore";
import LoadingScreen from "./components/common/LoadingScreen";
import ProtectedRoute from "./routes/ProtectedRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ShopsPage = lazy(() => import("./pages/ShopsPage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const CustomerCenterPage = lazy(() => import("./pages/CustomerCenterPage"));
const HelpPage = lazy(() => import("./pages/HelpPage"));
const PolicyPage = lazy(() => import("./pages/PolicyPage"));
const GrowthPage = lazy(() => import("./pages/GrowthPage"));
const MerchantOnboardingPage = lazy(() => import("./pages/MerchantOnboardingPage"));
const AdminGovernancePage = lazy(() => import("./pages/AdminGovernancePage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetailsPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function SessionBootstrap({ children }) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
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
    return () => window.removeEventListener("guzolink:unauthorized", handleUnauthorized);
  }, [clearUser]);
  return children;
}

function App() {
  return <QueryClientProvider client={queryClient}><BrowserRouter><SessionBootstrap><Toaster position="bottom-right" richColors closeButton /><Suspense fallback={<LoadingScreen />}><Routes>
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
    <Route element={<ProtectedRoute />}><Route path="/account" element={<CustomerCenterPage />} /><Route path="/orders" element={<OrdersPage />} /><Route path="/orders/:id" element={<OrderDetailsPage />} /></Route>
    <Route element={<ProtectedRoute merchantOnly />}><Route path="/dashboard/*" element={<DashboardPage />} /></Route>
    <Route element={<ProtectedRoute merchantOnly />}><Route path="/merchant/onboarding" element={<MerchantOnboardingPage />} /></Route>
    <Route element={<ProtectedRoute adminOnly />}><Route path="/admin" element={<AdminPage />} /></Route>
    <Route element={<ProtectedRoute adminOnly />}><Route path="/admin/governance" element={<AdminGovernancePage />} /></Route>
    <Route path="/help" element={<HelpPage />} /><Route path="/policies/:slug" element={<PolicyPage />} /><Route path="/growth" element={<GrowthPage />} />
    <Route path="/notifications" element={<NotificationsPage />} />
    <Route path="/404" element={<NotFoundPage />} /><Route path="*" element={<Navigate to="/404" replace />} />
  </Routes></Suspense></SessionBootstrap></BrowserRouter></QueryClientProvider>;
}
export default App;
