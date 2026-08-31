/** Style: Market Ledger — authentication is a focused paper form that returns users quickly to their task. */
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import BrandMark from "../components/common/BrandMark";
import { useAuthAction } from "../features/auth/authQueries";
import { useAuthStore } from "../store/authStore";
import { queryClient } from "../lib/queryClient";
import { toast } from "sonner";
const signInSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(6, "Password must contain at least 6 characters."),
});
const registerSchema = signInSchema.extend({
  name: z.string().min(2, "Enter your name."),
});
export default function AuthPage({ mode }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useAuthStore(state => state.setUser);
  const action = useAuthAction(isRegister ? "register" : "login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isRegister ? registerSchema : signInSchema),
  });
  async function submit(values) {
    try {
      const result = await action.mutateAsync(values);
      const user = result.user || result;
      setUser(user);
      queryClient.setQueryData(["session"], { user });
      toast.success(isRegister ? "Your account is ready." : "Welcome back.");
      navigate(
        location.state?.from?.pathname ||
          (user.role === "merchant" ? "/dashboard" : "/account"),
        { replace: true }
      );
    } catch (error) {
      toast.error(error.message || "We could not sign you in.");
    }
  }
  return (
    <main className="paper-noise grid min-h-screen bg-[#e7dfcf] p-4 sm:p-8">
      <div className="mx-auto flex w-full max-w-[1050px] flex-col justify-between gap-8">
        <BrandMark />
        <div className="grid overflow-hidden border border-[#cfc5b4] bg-[#fffdf7] shadow-[0_24px_55px_rgba(34,35,31,.12)] md:grid-cols-[.8fr_1.2fr]">
          <aside className="bg-ink p-8 text-[#fbf7ee] sm:p-12">
            <p className="ledger-label !text-[#d3c9b5]">Guzolink account</p>
            <h1 className="mt-5 font-display text-5xl leading-[.94] tracking-[-.055em]">
              {isRegister
                ? "Put your shop in people’s path."
                : "Pick up where you left off."}
            </h1>
            <p className="mt-6 text-sm leading-7 text-[#d8d4c8]">
              {isRegister
                ? "Open an account to manage orders, save your details, or begin building a merchant shop."
                : "Sign in to see your orders, manage your account, and access your merchant workspace."}
            </p>
          </aside>
          <section className="p-8 sm:p-12">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f3e4c7] text-ochre-dark">
              <KeyRound size={20} />
            </span>
            <h2 className="mt-6 font-display text-4xl">
              {isRegister ? "Create your account" : "Sign in"}
            </h2>
            <p className="mt-2 text-sm text-[#656b64]">
              {isRegister
                ? "A few details, then you’re ready."
                : "Use the account connected to your shop or orders."}
            </p>
            <form
              className="mt-7 grid gap-5"
              onSubmit={handleSubmit(submit)}
              noValidate
            >
              {isRegister && (
                <label>
                  <span className="field-label">Full name</span>
                  <input
                    className="text-field"
                    autoComplete="name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="mt-1 block text-xs font-bold text-clay">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              )}
              <label>
                <span className="field-label">Email address</span>
                <input
                  className="text-field"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="mt-1 block text-xs font-bold text-clay">
                    {errors.email.message}
                  </span>
                )}
              </label>
              <label>
                <span className="field-label">Password</span>
                <input
                  className="text-field"
                  type="password"
                  autoComplete={
                    isRegister ? "new-password" : "current-password"
                  }
                  {...register("password")}
                />
                {errors.password && (
                  <span className="mt-1 block text-xs font-bold text-clay">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <button
                className="button-primary mt-2 w-full"
                disabled={action.isPending}
              >
                {action.isPending
                  ? "Working…"
                  : isRegister
                    ? "Create account"
                    : "Sign in"}{" "}
                <ArrowRight size={16} />
              </button>
            </form>
            <p className="mt-6 text-sm text-[#656b64]">
              {isRegister ? "Already registered?" : "New to Guzolink?"}{" "}
              <Link
                className="font-extrabold text-ochre-dark"
                to={isRegister ? "/login" : "/register"}
              >
                {isRegister ? "Sign in" : "Create an account"}
              </Link>
            </p>
          </section>
        </div>
        <Link
          className="text-sm font-extrabold text-[#555c55]"
          to="/marketplace"
        >
          ← Back to marketplace
        </Link>
      </div>
    </main>
  );
}
