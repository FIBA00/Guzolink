/** Style: Market Ledger — account details, addresses, saved goods, and notification consent sit in a single practical customer ledger. */
import { Download, Heart, MapPin, Save, Trash2, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ErrorState, LoadingBlock } from "../components/InlineLoading";
import MarketplaceShell from "../layout/MarketplaceShell";
import {
  useAccountPreferences,
  useAccountProfile,
  useAddresses,
  useRemoveAddress,
  useSavedProducts,
  useUpdatePreferences,
  useUpdateProfile,
} from "../api/useMerchantQueries";
export default function CustomerCenterPage() {
  const profileQ = useAccountProfile();
  const addressQ = useAddresses();
  const savedQ = useSavedProducts();
  const prefsQ = useAccountPreferences();
  const updateProfile = useUpdateProfile();
  const updatePrefs = useUpdatePreferences();
  const removeAddress = useRemoveAddress();
  const [draft, setDraft] = useState(null);
  if (
    profileQ.isLoading ||
    addressQ.isLoading ||
    savedQ.isLoading ||
    prefsQ.isLoading
  )
    return (
      <MarketplaceShell>
        <LoadingBlock label="Opening your account centre…" />
      </MarketplaceShell>
    );
  if (profileQ.isError)
    return (
      <MarketplaceShell>
        <ErrorState
          title="Account centre unavailable"
          description={profileQ.error.message}
          onRetry={profileQ.refetch}
        />
      </MarketplaceShell>
    );
  const profile = draft || profileQ.data;
  const preferences = prefsQ.data || {};
  async function saveProfile() {
    await updateProfile.mutateAsync(profile);
    setDraft(null);
    toast.success("Profile saved.");
  }
  async function toggle(key) {
    await updatePrefs.mutateAsync({ ...preferences, [key]: !preferences[key] });
  }
  return (
    <MarketplaceShell>
      <div className="page-enter mx-auto max-w-[1200px] px-4 py-10 md:px-8">
        <p className="ledger-label">Customer centre</p>
        <h1 className="mt-3 font-display text-5xl tracking-[-.05em]">
          Your account, in order.
        </h1>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <section className="border border-line bg-[#fffdf7] p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <UserRound className="text-ochre-dark" />
              <div>
                <h2 className="font-extrabold">Profile</h2>
                <p className="text-xs text-[#70756e]">
                  Used for delivery and account communication.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["name", "Full name"],
                ["email", "Email"],
                ["phone", "Phone"],
              ].map(([key, label]) => (
                <label key={key}>
                  <span className="field-label">{label}</span>
                  <input
                    className="text-field"
                    value={profile?.[key] || ""}
                    onChange={event =>
                      setDraft({ ...profile, [key]: event.target.value })
                    }
                  />
                </label>
              ))}
            </div>
            <button className="button-primary mt-6" onClick={saveProfile}>
              <Save size={16} /> Save profile
            </button>
            <button
              className="ml-3 text-xs font-extrabold text-[#687068]"
              onClick={() =>
                toast.success(
                  "Data-export request recorded for the configured account API."
                )
              }
            >
              <Download size={14} className="mr-1 inline" /> Request my data
            </button>
          </section>
          <section className="border border-line bg-[#fffdf7] p-5 sm:p-7">
            <p className="ledger-label">Contact preferences</p>
            <h2 className="mt-2 font-display text-3xl">
              Choose what reaches you.
            </h2>
            <div className="mt-5 divide-y divide-line">
              {[
                ["orderUpdates", "Order updates"],
                ["merchantUpdates", "Favourite-shop updates"],
                ["marketing", "Marketplace news"],
              ].map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center justify-between gap-3 py-4 text-sm font-extrabold"
                >
                  <span>{label}</span>
                  <button
                    className={`h-6 w-11 rounded-full ${preferences[key] ? "bg-ochre" : "bg-[#b9b6ae]"}`}
                    role="switch"
                    aria-checked={Boolean(preferences[key])}
                    onClick={() => toggle(key)}
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white transition ${preferences[key] ? "ml-6" : "ml-1"}`}
                    />
                  </button>
                </label>
              ))}
            </div>
          </section>
        </div>
        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="border border-line bg-[#fffdf7] p-5 sm:p-7">
            <p className="ledger-label">Delivery addresses</p>
            <div className="mt-5 grid gap-3">
              {(addressQ.data || []).map(address => (
                <div
                  key={address.id}
                  className="flex justify-between gap-3 border-t border-line pt-4"
                >
                  <div>
                    <p className="text-sm font-extrabold">
                      {address.label}{" "}
                      {address.primary && (
                        <span className="ml-2 text-xs text-moss">Primary</span>
                      )}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#6b7069]">
                      {address.recipient} · {address.phone}
                      <br />
                      {address.address}
                    </p>
                  </div>
                  <button
                    className="icon-button !h-8 !w-8 !text-clay"
                    onClick={() => removeAddress.mutate(address.id)}
                    aria-label="Remove address"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
            <button
              className="button-secondary mt-5"
              onClick={() =>
                toast.info(
                  "Address creation is ready for your ACCOUNT_ADDRESSES endpoint."
                )
              }
            >
              <MapPin size={16} /> Add address
            </button>
          </div>
          <div className="border border-line bg-[#fffdf7] p-5 sm:p-7">
            <p className="ledger-label">Saved goods</p>
            <div className="mt-5 grid gap-3">
              {(savedQ.data || []).map(product => (
                <Link
                  className="flex items-center gap-3 border-t border-line pt-3"
                  to={`/products/${product.id}`}
                  key={product.id}
                >
                  <img
                    alt=""
                    src={product.image}
                    className="h-12 w-12 object-cover"
                  />
                  <span>
                    <span className="block text-sm font-extrabold">
                      {product.name}
                    </span>
                    <span className="mt-1 block text-xs text-ochre-dark">
                      ETB {product.price}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
            <Link className="button-secondary mt-5" to="/marketplace">
              <Heart size={16} /> Browse saved-ready goods
            </Link>
          </div>
        </section>
      </div>
    </MarketplaceShell>
  );
}
