/** Style: Market Ledger — merchant preferences are a cached API-backed record, with only non-sensitive toggles exposed in the client. */
import { Bell, CreditCard, Globe2, Save, ShieldCheck } from "lucide-react";
import { ErrorState, LoadingBlock } from "../../components/common/AsyncState";
import {
  useMerchantSettings,
  useUpdateMerchantSettings,
} from "../../features/merchant/merchantQueries";
import { toast } from "sonner";
const settingGroups = [
  {
    key: "visibleInMarketplace",
    icon: Globe2,
    title: "Shop visibility",
    description:
      "Keep this shop discoverable in marketplace search and merchant listings.",
    control: "Visible in marketplace",
  },
  {
    key: "orderNotifications",
    icon: Bell,
    title: "Order notifications",
    description: "Receive an alert whenever a new order needs your attention.",
    control: "New order notifications",
  },
  {
    key: "paymentReady",
    icon: CreditCard,
    title: "Payment providers",
    description:
      "Manage payment connection details through the backend’s enabled provider flow.",
    control: "Payment setup required",
  },
];
export default function DashboardSettings() {
  const settingsQuery = useMerchantSettings();
  const updateSettings = useUpdateMerchantSettings();
  const settings = settingsQuery.data || {};
  async function toggle(key) {
    try {
      await updateSettings.mutateAsync({ ...settings, [key]: !settings[key] });
    } catch (error) {
      toast.error(error.message || "The setting could not be updated.");
    }
  }
  async function save() {
    try {
      await updateSettings.mutateAsync(settings);
      toast.success("Settings saved.");
    } catch (error) {
      toast.error(error.message || "The settings could not be saved.");
    }
  }
  if (settingsQuery.isLoading)
    return <LoadingBlock label="Loading merchant settings…" />;
  if (settingsQuery.isError)
    return (
      <ErrorState
        title="Settings are unavailable"
        description={settingsQuery.error.message}
        onRetry={settingsQuery.refetch}
      />
    );
  return (
    <>
      <div className="border-b border-line pb-6">
        <p className="ledger-label">Merchant settings</p>
        <h1 className="mt-3 font-display text-5xl tracking-[-.05em]">
          Settings.
        </h1>
      </div>
      <section className="mt-7 max-w-4xl border border-line bg-[#fffdf7]">
        {settingGroups.map(
          ({ key, icon: Icon, title, description, control }) => (
            <div
              key={key}
              className="flex flex-col justify-between gap-5 border-b border-line p-5 last:border-b-0 sm:flex-row sm:items-center sm:p-6"
            >
              <div className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f1e2c5] text-ochre-dark">
                  <Icon size={19} />
                </span>
                <div>
                  <h2 className="font-extrabold">{title}</h2>
                  <p className="mt-1 max-w-xl text-sm leading-6 text-[#656b64]">
                    {description}
                  </p>
                </div>
              </div>
              <label className="inline-flex min-w-48 items-center justify-between gap-3 border border-line bg-[#fcfaf4] p-3 text-xs font-extrabold">
                <span>{control}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={Boolean(settings[key])}
                  onClick={() => toggle(key)}
                  className={`relative h-6 w-11 rounded-full transition ${settings[key] ? "bg-ochre" : "bg-[#b9b6ae]"}`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${settings[key] ? "left-6" : "left-1"}`}
                  />
                </button>
              </label>
            </div>
          )
        )}
      </section>
      <div className="mt-7 flex items-start gap-3 border border-[#d6c49d] bg-[#f4e8cc] p-5">
        <ShieldCheck className="shrink-0 text-ochre-dark" size={20} />
        <p className="text-sm leading-6 text-[#625b4c]">
          Your frontend only sends merchant preference requests to the
          configured API. It never stores payment credentials or sensitive
          secrets.
        </p>
      </div>
      <button
        className="button-primary mt-6"
        onClick={save}
        disabled={updateSettings.isPending}
      >
        <Save size={16} />{" "}
        {updateSettings.isPending ? "Saving…" : "Save preferences"}
      </button>
    </>
  );
}
