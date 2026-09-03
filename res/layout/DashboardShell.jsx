/** Style: Market Ledger — the merchant workspace keeps its ink operational spine while shared language controls translate the navigational chrome. */
import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  Box,
  ChevronLeft,
  CircleUserRound,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Store,
  Truck,
  Users,
} from "lucide-react";
import ActivityCenter from "../components/ActivityCenter";
import BrandMark from "../components/BrandMark";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "../i18n/useTranslation";

export default function DashboardShell() {
  const { t } = useTranslation();
  const sections = [
    {
      to: "/dashboard",
      label: t("dashboard.overview"),
      icon: LayoutDashboard,
      end: true,
    },
    { to: "/dashboard/products", label: t("nav.products"), icon: Box },
    { to: "/dashboard/orders", label: t("nav.orders"), icon: ShoppingCart },
    { to: "/dashboard/operations", label: "Operations", icon: Truck },
    { to: "/dashboard/shop", label: t("nav.shop"), icon: Store },
    { to: "/dashboard/customers", label: t("nav.customers"), icon: Users },
    { to: "/dashboard/analytics", label: t("nav.analytics"), icon: BarChart3 },
    { to: "/dashboard/settings", label: t("nav.settings"), icon: Settings },
  ];
  return (
    <div className="min-h-screen bg-[#f4f0e7] text-ink md:grid md:grid-cols-[16.5rem_1fr]">
      <aside className="hidden min-h-screen bg-ink px-5 py-7 text-[#f8f2e5] md:flex md:flex-col">
        <BrandMark dark />
        <div className="mt-11">
          <p className="ledger-label !text-[#bbb9ad]">
            {t("label.merchantWorkspace")}
          </p>
          <nav className="mt-4 grid gap-1">
            {sections.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                end={end}
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 text-sm font-bold transition-colors ${isActive ? "bg-ochre text-white" : "text-[#d0cec3] hover:bg-white/10 hover:text-white"}`
                }
              >
                <Icon size={17} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <NavLink
          to="/marketplace"
          className="mt-auto flex items-center gap-2 border-t border-white/15 pt-5 text-xs font-bold text-[#d0cec3] hover:text-white"
        >
          <ChevronLeft size={15} /> {t("nav.back")}
        </NavLink>
      </aside>
      <div className="min-w-0">
        <header className="flex min-h-[4.65rem] items-center justify-between border-b border-line bg-[#fffdf7] px-4 md:px-8">
          <div className="md:hidden">
            <BrandMark compact />
          </div>
          <div className="hidden md:block">
            <p className="ledger-label">
              Guzo Studio · {t("label.merchantWorkspace")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ActivityCenter />
            <NavLink
              to="/account"
              className="inline-flex items-center gap-2 text-sm font-extrabold"
            >
              <CircleUserRound size={18} />{" "}
              <span className="hidden sm:inline">Mekdes</span>
            </NavLink>
          </div>
        </header>
        <main className="page-enter mx-auto max-w-[1480px] p-4 pb-24 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[4.55rem] items-center justify-around border-t border-line bg-[#fffdf7] md:hidden">
        {sections.slice(0, 5).map(({ to, label, icon: Icon, end }) => (
          <NavLink
            end={end}
            key={to}
            to={to}
            className={({ isActive }) =>
              `grid place-items-center gap-1 text-[10px] font-extrabold ${isActive ? "text-ochre-dark" : "text-[#5e635d]"}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
