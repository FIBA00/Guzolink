/** Style: Market Ledger — help content pairs practical self-service answers with a simple, API-backed support intake. */
import { Headphones, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ErrorState, LoadingBlock } from "../components/common/AsyncState";
import MarketplaceShell from "../components/layout/MarketplaceShell";
import {
  useCreateSupportTicket,
  useHelpContent,
} from "../features/experience/experienceQueries";
export default function HelpPage() {
  const helpQ = useHelpContent();
  const createTicket = useCreateSupportTicket();
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  async function send(event) {
    event.preventDefault();
    if (!subject || !message)
      return toast.error("Add a subject and message first.");
    await createTicket.mutateAsync({ subject, message });
    setSubject("");
    setMessage("");
    toast.success("Support request recorded.");
  }
  if (helpQ.isLoading)
    return (
      <MarketplaceShell>
        <LoadingBlock label="Loading help content…" />
      </MarketplaceShell>
    );
  if (helpQ.isError)
    return (
      <MarketplaceShell>
        <ErrorState
          title="Help is unavailable"
          description={helpQ.error.message}
          onRetry={helpQ.refetch}
        />
      </MarketplaceShell>
    );
  return (
    <MarketplaceShell>
      <div className="page-enter mx-auto max-w-[1100px] px-4 py-10 md:px-8">
        <section className="bg-moss p-6 text-white sm:p-9">
          <p className="ledger-label !text-[#d9e4d2]">Guzolink help centre</p>
          <h1 className="mt-3 font-display text-5xl">A clear next step.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#e4ede0]">
            Find an answer, check an order, or send a support request to the
            configured service team.
          </p>
        </section>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_.85fr]">
          <section className="border border-line bg-[#fffdf7] p-5 sm:p-7">
            <p className="ledger-label">Common questions</p>
            <div className="mt-5 divide-y divide-line">
              {helpQ.data.items.map(item => (
                <details key={item.q} className="group py-4">
                  <summary className="cursor-pointer text-sm font-extrabold">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[#60665f]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
          <form
            className="border border-line bg-[#fffdf7] p-5 sm:p-7"
            onSubmit={send}
          >
            <Headphones className="text-ochre-dark" size={22} />
            <p className="ledger-label mt-4">Support intake</p>
            <h2 className="mt-2 font-display text-3xl">Send a request.</h2>
            <label className="mt-5 block">
              <span className="field-label">Subject</span>
              <input
                className="text-field"
                value={subject}
                onChange={event => setSubject(event.target.value)}
                placeholder="What do you need help with?"
              />
            </label>
            <label className="mt-4 block">
              <span className="field-label">Message</span>
              <textarea
                className="text-field min-h-28 resize-y"
                value={message}
                onChange={event => setMessage(event.target.value)}
                placeholder="Include the relevant order or shop details."
              />
            </label>
            <button
              className="button-primary mt-5"
              disabled={createTicket.isPending}
            >
              <Send size={16} />{" "}
              {createTicket.isPending ? "Sending…" : "Send support request"}
            </button>
          </form>
        </div>
      </div>
    </MarketplaceShell>
  );
}
