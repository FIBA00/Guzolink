/** Style: Market Ledger — the customer account is concise, transparent, and immediately routes toward useful history. */
import { LogOut, Package, Settings, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MarketplaceShell from "../components/layout/MarketplaceShell";
import { useAuthStore } from "../store/authStore";
import { queryClient } from "../lib/queryClient";
import { authApi } from "../services/apiResources";
import { isPreviewMode } from "../services/api";
import { useSession } from "../features/auth/authQueries";
import { toast } from "sonner";
export default function AccountPage() {
  const storedUser = useAuthStore(state => state.user);
  const sessionQuery = useSession();
  const user = sessionQuery.data?.user || storedUser;
  const clearUser = useAuthStore(state => state.clearUser);
  const navigate = useNavigate();
  async function logout() {
    try {
      if (!isPreviewMode()) await authApi.logout();
    } catch (_) {
      /* Local session is still cleared to protect the signed-in view. */
    }
    clearUser();
    queryClient.removeQueries({ queryKey: ["session"] });
    toast.success("You’re signed out.");
    navigate("/marketplace");
  }
  return (
    <MarketplaceShell>
      <div className="page-enter mx-auto max-w-[1000px] px-4 py-10 md:px-8">
        <p className="ledger-label">My account</p>
        <div className="mt-4 flex flex-col justify-between gap-4 border-b border-line pb-7 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-5xl tracking-[-.05em]">
              Hello, {user?.name?.split(" ")[0]}.
            </h1>
            <p className="mt-3 text-sm text-[#656b64]">{user?.email}</p>
          </div>
          <button
            className="inline-flex items-center gap-2 text-sm font-extrabold text-clay"
            onClick={logout}
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            className="card-hover registration-mark border border-line bg-[#fffdf7] p-6"
            to="/orders"
          >
            <Package className="text-ochre-dark" size={22} />
            <h2 className="mt-6 text-lg font-extrabold">My orders</h2>
            <p className="mt-2 text-sm leading-6 text-[#656b64]">
              Review purchases, payment progress, and delivery updates.
            </p>
          </Link>
          <div className="registration-mark border border-line bg-[#fffdf7] p-6">
            <UserRound className="text-ochre-dark" size={22} />
            <h2 className="mt-6 text-lg font-extrabold">Profile</h2>
            <p className="mt-2 text-sm leading-6 text-[#656b64]">
              Profile editing becomes available when supported by your account
              API.
            </p>
          </div>
          <div className="registration-mark border border-line bg-[#fffdf7] p-6">
            <Settings className="text-ochre-dark" size={22} />
            <h2 className="mt-6 text-lg font-extrabold">Preferences</h2>
            <p className="mt-2 text-sm leading-6 text-[#656b64]">
              Keep your personal settings in one familiar place.
            </p>
          </div>
        </div>
      </div>
    </MarketplaceShell>
  );
}
