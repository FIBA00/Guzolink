/** Style: Market Ledger — the top-level activity feed is a cached API record in production and a persisted local ledger only in preview. */
import {
  Bell,
  CheckCheck,
  ChevronRight,
  Package,
  ReceiptText,
  Store,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ! internal imports
import {
  useActivities,
  useReadActivity,
} from "../api/activityQueries";

import { formatDate } from "../lib/utils.js";
import Modal from "./Modal.jsx";

const iconByKind = {
  product: Package,
  shop: Store,
  payment: ReceiptText,
  media: Package,
  system: Bell,
};

export default function ActivityCenter({ dark = false }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const activitiesQuery = useActivities();
  const readActivity = useReadActivity();
  const activities = activitiesQuery.data?.items || [];
  const unreadCount = activities.filter( activity => !activity.read ).length;
  
  async function selectActivity(activity) {
    try {
      await readActivity.mutateAsync(activity.id);
    } finally {
      setSelected({ ...activity, read: true });
      setOpen(false);
    }
  }

  async function markAllRead() {
    await Promise.all(
      activities
        .filter(activity => !activity.read)
        .map(activity => readActivity.mutateAsync(activity.id))
    );
  }

  function openLink() {
    if (selected?.link) navigate(selected.link);
    setSelected(null);
  }
  
  return (
    <>
      <div className="relative">
        <button
          className={`icon-button relative ${dark ? "!border-white/20 !bg-white/10 !text-white" : ""}`}
          aria-label={`Activity notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-ochre px-1 text-[9px] font-extrabold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
        {open && (
          <section
            className="absolute right-0 top-[calc(100%+.6rem)] z-50 w-[min(23rem,calc(100vw-2rem))] overflow-hidden border border-line bg-[#fffdf7] text-ink shadow-xl"
            role="dialog"
            aria-label="System activity"
          >
            <header className="flex items-center justify-between border-b border-line px-4 py-4">
              <div>
                <p className="ledger-label">System activity</p>
                <h2 className="mt-2 font-display text-2xl">Activity feed.</h2>
              </div>
              {activities.length > 0 && (
                <button
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-ochre-dark"
                  onClick={markAllRead}
                  disabled={readActivity.isPending}
                >
                  <CheckCheck size={15} /> Mark read
                </button>
              )}
            </header>
            <div className="max-h-[24rem] overflow-y-auto">
              {activitiesQuery.isLoading ? (
                <p className="p-7 text-sm text-[#666c65]">Loading activity…</p>
              ) : activitiesQuery.isError ? (
                <button
                  className="m-5 text-sm font-extrabold text-ochre-dark"
                  onClick={() => activitiesQuery.refetch()}
                >
                  Retry activity feed
                </button>
              ) : activities.length ? (
                activities.map(activity => {
                  const Icon = iconByKind[activity.kind] || Bell;
                  return (
                    <button
                      type="button"
                      key={activity.id}
                      onClick={() => selectActivity(activity)}
                      className={`flex w-full items-start gap-3 border-b border-line p-4 text-left transition hover:bg-[#faf4e8] ${activity.read ? "" : "bg-[#fff8ea]"}`}
                    >
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f2e1bf] text-ochre-dark">
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-extrabold">
                          {activity.title}
                        </span>
                        <span className="mt-1 line-clamp-2 block text-xs leading-5 text-[#656b64]">
                          {activity.detail}
                        </span>
                        <span className="mt-2 block text-[10px] font-bold uppercase tracking-[.09em] text-[#858981]">
                          {formatDate(activity.createdAt)}
                        </span>
                      </span>
                      <ChevronRight
                        className="mt-2 shrink-0 text-[#737870]"
                        size={16}
                      />
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center">
                  <Bell className="mx-auto text-ochre-dark" size={22} />
                  <p className="mt-3 text-sm font-extrabold">
                    No activity yet.
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#6e736c]">
                    Product, shop, media, and payment updates will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.title || "Activity detail"}
        eyebrow="System activity"
        size="max-w-lg"
      >
        <div className="flex gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f2e1bf] text-ochre-dark">
            <Bell size={18} />
          </span>
          <div>
            <p className="text-sm leading-7 text-[#59605a]">
              {selected?.detail}
            </p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[.1em] text-[#747970]">
              Recorded {selected ? formatDate(selected.createdAt) : ""}
            </p>
          </div>
        </div>
        {selected?.link && (
          <button className="button-primary mt-7" onClick={openLink}>
            Open related record <ChevronRight size={16} />
          </button>
        )}
      </Modal>
    </>
  );
}
