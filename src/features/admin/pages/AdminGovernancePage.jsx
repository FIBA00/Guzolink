import {
  ClipboardCheck,
  History,
  MessageSquareText,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// ! internal imports 
import ErrorState from "../../../components/ErrorState.jsx";
import LoadingBlock from "../../../components/LoadingBlock.jsx";
import BrandMark from "../../../components/BrandMark.jsx";
// ? missing internal import

import {
  useGovernanceDesk,
  useGovernanceResubmission,
} from "../hooks/useAdminQueries.js";


export default function AdminGovernancePage() {
  const desk = useGovernanceDesk();
  const resubmit = useGovernanceResubmission();

  if (desk.isLoading)
    return <LoadingBlock label="Loading governance records…" />;

  if (desk.isError)
    return (
      <ErrorState
        title="Governance desk unavailable"
        description={desk.error.message}
        onRetry={desk.refetch}
      />
    );
  const data = desk.data;

  async function sendReminder(id) {
    await resubmit.mutateAsync({ id });
    toast.success("Merchant resubmission reminder recorded.");
  }
  
  return (
    <div className="min-h-screen bg-[#f4f0e7] text-ink">
      <header className="border-b border-line bg-[#fffdf7]">
        <div className="mx-auto flex min-h-[4.7rem] max-w-[1440px] items-center justify-between px-4 md:px-8">
          <BrandMark />
          <Link className="button-secondary" to="/admin">
            Review queue
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-4 py-9 md:px-8">
        <p className="ledger-label">Administrator governance</p>
        <h1 className="mt-3 font-display text-5xl">
          Make review decisions reusable.
        </h1>
        <div className="mt-7 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <section className="border border-line bg-[#fffdf7] p-6">
            <MessageSquareText className="text-ochre-dark" />
            <p className="ledger-label mt-5">Decision templates</p>
            <div className="mt-4 divide-y divide-line">
              {data.templates.map(item => (
                <button
                  type="button"
                  key={item}
                  className="w-full py-3 text-left text-sm font-bold"
                  onClick={() =>
                    toast.success("Template copied to the review note.")
                  }
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-[#6f746d]">
              Connect ADMIN_GOVERNANCE to let administrators maintain
              organization-approved templates.
            </p>
          </section>
          <section className="border border-line bg-[#fffdf7] p-6">
            <History className="text-ochre-dark" />
            <p className="ledger-label mt-5">Decision history</p>
            <div className="mt-4 divide-y divide-line">
              {data.history.map(item => (
                <article key={item.id} className="py-3">
                  <p className="text-sm font-extrabold">
                    {item.shop}{" "}
                    <span className="ml-2 text-xs text-moss">
                      {item.status}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-[#696f68]">
                    {item.reviewer} · {item.at} · {item.note}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
        <section className="mt-5 border border-line bg-[#fffdf7] p-6">
          <ClipboardCheck className="text-ochre-dark" />
          <p className="ledger-label mt-5">Merchant resubmissions</p>
          <div className="mt-4 divide-y divide-line">
            {data.resubmissions.map(item => (
              <article
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <span>
                  <strong>{item.shop}</strong>
                  <span className="ml-2 text-sm text-[#676d66]">
                    {item.status} since {item.requestedAt}
                  </span>
                </span>
                <button
                  className="button-secondary"
                  onClick={() => sendReminder(item.id)}
                  disabled={resubmit.isPending}
                >
                  <RotateCcw size={16} />{" "}
                  {resubmit.isPending ? "Sending…" : "Send reminder"}
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
