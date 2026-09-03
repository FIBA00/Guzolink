/** Style: Market Ledger — checkout composes cached delivery options with a clear order review before the provider-neutral payment handoff. */
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CreditCard, LockKeyhole, MapPin, Truck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { EmptyState, LoadingBlock } from "../components/InlineLoading";
import MarketplaceShell from "../layout/MarketplaceShell";
import MockPaymentDialog from "../components/MockPaymentDialog";
import { useDeliveryOptions } from "../api/experienceQueries";
import { formatCurrency } from "../lib/utils";
import { isPreviewMode } from "../services/api";
import { ordersApi } from "../services/apiResources";
import { useCartStore } from "../store/cartStore";
import { useNotificationStore } from "../store/notificationStore";
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  phone: z.string().min(7, "Enter a valid phone number."),
  address: z.string().min(8, "Enter a delivery address."),
  note: z
    .string()
    .max(300, "Keep order notes under 300 characters.")
    .optional(),
});
export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const addActivity = useNotificationStore(state => state.addActivity);
  const deliveries = useDeliveryOptions();
  const [deliveryId, setDeliveryId] = useState("standard");
  const [confirmation, setConfirmation] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [orderDraft, setOrderDraft] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(checkoutSchema) });
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const options = deliveries.data || [];
  const delivery =
    options.find(option => option.id === deliveryId) || options[0];
  const total = subtotal + (delivery?.fee || 0);
  function startHandoff(customer) {
    setOrderDraft({
      customer,
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      delivery: { id: delivery?.id, fee: delivery?.fee },
      paymentMethod: "ledgerpay-sandbox",
    });
    setPaymentOpen(true);
  }
  async function completeHandoff(payment) {
    if (!orderDraft) return;
    setSavingOrder(true);
    try {
      const payload = {
        ...orderDraft,
        payment: {
          provider: payment.provider,
          status: payment.status,
          transactionId: payment.transactionId,
        },
      };
      const result = isPreviewMode()
        ? {
            id: "GL-PREVIEW-2049",
            paymentStatus: "Paid",
            orderStatus: "New",
            ...payment,
          }
        : await ordersApi.create(payload);
      setConfirmation(result);
      clearCart();
      addActivity({
        title: "Payment approved",
        detail: `${formatCurrency(total)} was approved by ${payment.provider} for order ${result.id || "confirmation"}.`,
        kind: "payment",
        link: "/orders",
      });
      toast.success("Payment handoff completed and order received.");
    } catch (error) {
      toast.error(
        error.message ||
          "The payment completed, but the order could not be saved."
      );
    } finally {
      setSavingOrder(false);
      setPaymentOpen(false);
    }
  }
  function recordFailedHandoff(error) {
    addActivity({
      title: "Payment simulation failed",
      detail: `${formatCurrency(total)} was declined by LedgerPay Sandbox. No order was created.`,
      kind: "payment",
      link: "/checkout",
    });
    toast.error(error.message || "The sandbox payment was declined.");
  }
  if (!items.length && !confirmation)
    return (
      <MarketplaceShell>
        <div className="mx-auto max-w-[1000px] px-4 py-10 md:px-8">
          <EmptyState
            title="Your checkout is waiting for a cart."
            description="Choose something from the marketplace before placing an order."
            actionLabel="Browse goods"
            actionTo="/marketplace"
          />
        </div>
      </MarketplaceShell>
    );
  if (confirmation)
    return (
      <MarketplaceShell>
        <div className="mx-auto max-w-[900px] px-4 py-16 text-center md:px-8">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e2eee0] text-moss">
            <Check size={28} />
          </span>
          <p className="ledger-label mt-7">Order received · Payment approved</p>
          <h1 className="mt-4 font-display text-5xl">
            Thank you for shopping local.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#656b64]">
            Order <strong>{confirmation.id || "received"}</strong> is with the
            merchant and its payment handoff was marked{" "}
            <strong>
              {confirmation.status || confirmation.paymentStatus || "paid"}
            </strong>
            .
          </p>
          <Link className="button-primary mt-7" to="/orders">
            View my orders
          </Link>
        </div>
      </MarketplaceShell>
    );
  return (
    <MarketplaceShell>
      <div className="page-enter mx-auto max-w-[1200px] px-4 py-10 md:px-8">
        <div className="border-b border-line pb-6">
          <p className="ledger-label">Checkout · Step 2 of 3</p>
          <h1 className="mt-3 font-display text-5xl">Review, then hand off.</h1>
        </div>
        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_21rem]">
          <form
            className="surface bg-[#fffdf7] p-5 sm:p-7"
            onSubmit={handleSubmit(startHandoff)}
            noValidate
          >
            <div className="flex items-center gap-3 border-b border-line pb-5">
              <MapPin className="text-ochre-dark" size={20} />
              <div>
                <h2 className="font-extrabold">Delivery details</h2>
                <p className="mt-1 text-xs text-[#686d66]">
                  Choose a delivery service, then provide the details needed to
                  request fulfilment.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-5">
              <label>
                <span className="field-label">Full name</span>
                <input
                  className="text-field"
                  {...register("fullName")}
                  autoComplete="name"
                />
                {errors.fullName && (
                  <span className="mt-1 block text-xs font-bold text-clay">
                    {errors.fullName.message}
                  </span>
                )}
              </label>
              <label>
                <span className="field-label">Phone number</span>
                <input
                  className="text-field"
                  {...register("phone")}
                  autoComplete="tel"
                />
                {errors.phone && (
                  <span className="mt-1 block text-xs font-bold text-clay">
                    {errors.phone.message}
                  </span>
                )}
              </label>
              <label>
                <span className="field-label">Delivery address</span>
                <textarea
                  className="text-field min-h-24 resize-y"
                  {...register("address")}
                />
                {errors.address && (
                  <span className="mt-1 block text-xs font-bold text-clay">
                    {errors.address.message}
                  </span>
                )}
              </label>
            </div>
            <fieldset className="mt-6">
              <legend className="field-label">Delivery option</legend>
              {deliveries.isLoading ? (
                <LoadingBlock label="Loading delivery options…" />
              ) : (
                <div className="grid gap-2">
                  {options.map(option => (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => setDeliveryId(option.id)}
                      className={`flex items-center justify-between border p-4 text-left ${delivery?.id === option.id ? "border-ochre bg-[#fff4dd]" : "border-line"}`}
                    >
                      <span>
                        <span className="block text-sm font-extrabold">
                          <Truck
                            className="mr-2 inline text-ochre-dark"
                            size={15}
                          />
                          {option.name}
                        </span>
                        <span className="mt-1 block text-xs text-[#6c716b]">
                          {option.window}
                        </span>
                      </span>
                      <span className="text-sm font-extrabold">
                        {formatCurrency(option.fee)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </fieldset>
            <button
              className="button-primary mt-7 w-full"
              disabled={isSubmitting || savingOrder || deliveries.isLoading}
            >
              {savingOrder ? "Saving order…" : "Continue to LedgerPay sandbox"}{" "}
              <CreditCard size={17} />
            </button>
            <p className="mt-4 flex items-center gap-2 text-xs leading-5 text-[#737870]">
              <LockKeyhole size={14} /> The next step opens a mock provider
              handoff. No payment credentials are collected in this test flow.
            </p>
          </form>
          <aside className="surface h-fit bg-[#fffdf7] p-5">
            <p className="ledger-label">Order review</p>
            <div className="mt-5 grid gap-4 border-b border-line pb-5">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 text-sm"
                >
                  <span>
                    <strong>{item.quantity}×</strong> {item.name}
                  </span>
                  <strong>{formatCurrency(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-sm">
              <span>Delivery</span>
              <strong>{delivery ? formatCurrency(delivery.fee) : "—"}</strong>
            </div>
            <div className="mt-5 flex justify-between border-t border-line pt-5">
              <span className="font-display text-2xl">Total</span>
              <span className="text-xl font-extrabold text-ochre-dark">
                {formatCurrency(total)}
              </span>
            </div>
            <div className="mt-5 border-t border-line pt-4">
              <p className="text-xs font-extrabold uppercase tracking-[.1em] text-[#72776f]">
                Payment provider
              </p>
              <p className="mt-2 text-sm font-extrabold">LedgerPay Sandbox</p>
              <p className="mt-1 text-xs leading-5 text-[#747970]">
                Mock handoff · provider-neutral integration point
              </p>
            </div>
          </aside>
        </div>
        <MockPaymentDialog
          open={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          amount={total}
          orderReference="GL-PREVIEW-2049"
          onSuccess={completeHandoff}
          onFailure={recordFailedHandoff}
        />
      </div>
    </MarketplaceShell>
  );
}
