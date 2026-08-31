/** Style: Market Ledger — private routes explain access rather than silently leaving a visitor stranded. */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useSession } from "../features/auth/authQueries";
import LoadingScreen from "../components/common/LoadingScreen";
export default function ProtectedRoute({
  merchantOnly = false,
  adminOnly = false,
}) {
  const user = useAuthStore(state => state.user);
  const location = useLocation();
  const session = useSession();
  if (session.isPending || (session.data?.user && !user))
    return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (merchantOnly && !["merchant", "admin"].includes(user.role))
    return <Navigate to="/account" replace />;
  if (adminOnly && user.role !== "admin")
    return <Navigate to="/account" replace />;
  return <Outlet />;
}
