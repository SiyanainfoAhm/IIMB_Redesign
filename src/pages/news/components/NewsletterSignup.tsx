import { useState } from "react";
import type { FormEvent } from "react";

const FORM_URL = "https://readdy.ai/api/form/db164m32asjjtt1sl5mg";
const STORAGE_KEY = "iimb_newsletter_topics";

const TOPICS = [
  { id: "Alumni", label: "Alumni", icon: "ri-user-star-line" },
  { id: "Rankings", label: "Rankings", icon: "ri-trophy-line" },
  { id: "Research", label: "Research", icon: "ri-flask-line" },
  { id: "Placements", label: "Placements", icon: "ri-briefcase-line" },
  { id: "Campus", label: "Campus life", icon: "ri-plant-line" },
  { id: "Events", label: "Events", icon: "ri-calendar-event-line" },
];

type Status = "idle" | "submitting" | "success" | "error";
type View = "subscribe" | "manage";

const readStoredTopics = (): string[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
};

const topicMeta = (id: string) => TOPICS.find((topic) => topic.id === id);

export default function NewsletterSignup() {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  const [saved, setSaved] = useState<string[]>(readStoredTopics);
  const [topics, setTopics] = useState<string[]>(readStoredTopics);
  const [view, setView] = useState<View>(() => (readStoredTopics().length > 0 ? "manage" : "subscribe"));
  const [justSaved, setJustSaved] = useState(false);

  const toggleTopic = (id: string) => {
    setTopics((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const allSelected = topics.length === TOPICS.length;

  const toggleAll = () => {
    setTopics(allSelected ? [] : TOPICS.map((topic) => topic.id));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const honeypot = (data.get("website_alt") as string | null)?.trim() ?? "";
    if (honeypot) {
      setStatus("success");
      form.reset();
      setTopics([]);
      return;
    }
    data.delete("website_alt");

    if (topics.length === 0) {
      setStatus("error");
      setFormError("Pick at least one topic so we know what to send you.");
      return;
    }

    setStatus("submitting");
    setFormError("");
    setNotice("");

    const params = new URLSearchParams();
    data.forEach((value, key) => {
      params.append(key, value.toString());
    });

    try {
      const response = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const responseText = await response.text();
      let parsed: {
        code?: string;
        message?: string;
        meta?: { message?: string; detail?: string };
      } | null = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }
      const serverMsg =
        parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText;
      const isSpam = typeof serverMsg === "string" && serverMsg.toLowerCase().includes("spam");

      if (response.ok && parsed?.code === "OK" && !isSpam) {
        const next = [...topics];
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Storage may be unavailable; the subscription still succeeded.
        }
        setSaved(next);
        setJustSaved(true);
        setStatus("success");
        form.reset();
        setView("manage");
      } else {
        setStatus("error");
        setFormError(
          isSpam
            ? "We couldn't process that submission. Please check your details and try again."
            : typeof serverMsg === "string" && serverMsg.length > 0
              ? serverMsg
              : "Something went wrong while subscribing. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setFormError("We couldn't reach the server. Please check your connection and try again.");
    }
  };

  const startEditing = () => {
    setTopics(saved);
    setStatus("idle");
    setFormError("");
    setNotice("");
    setJustSaved(false);
    setView("subscribe");
  };

  const handleUnsubscribe = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
    setSaved([]);
    setTopics([]);
    setStatus("idle");
    setFormError("");
    setJustSaved(false);
    setNotice("You've been unsubscribed. You can re-subscribe to topics at any time.");
    setView("subscribe");
  };

  const isEditing = view === "subscribe" && saved.length > 0;

  return (
    <div className="overflow-hidden rounded-lg border border-background-200 bg-primary-950">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:border-r lg:border-primary-900">
          <div className="p-7 md:p-10">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-300">
              <span className="h-px w-6 bg-secondary-300/60" />
              Stay in the loop
            </div>
            <h2 className="mt-4 font-heading text-2xl leading-tight text-background-50 md:text-3xl">
              Subscribe to the stories you care about
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-primary-200">
              Choose your topics and we'll send a curated digest — only the research, alumni news, placements
              and campus moments you actually want. No spam, unsubscribe anytime.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-primary-200">
              <li className="flex items-center gap-2">
                <i className="ri-check-line text-secondary-300" />
                You pick the topics, we handle the rest
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-check-line text-secondary-300" />
                Monthly, never more than once a week
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-check-line text-secondary-300" />
                Change or pause your topics anytime
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="p-7 md:p-10">
            {view === "manage" ? (
              <div>
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-300">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary-500 text-primary-950">
                    <i className="ri-notification-3-line text-sm" />
                  </span>
                  Your subscription
                </span>
                <h3 className="mt-4 font-heading text-xl text-background-50 md:text-2xl">
                  You're following {saved.length} {saved.length === 1 ? "topic" : "topics"}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-200">
                  We'll tailor your monthly digest to these. Changed your mind? Update your topics or pause
                  anytime.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {saved.map((id) => {
                    const meta = topicMeta(id);
                    return (
                      <span
                        key={id}
                        className="flex items-center gap-2 rounded-full border border-secondary-500/60 bg-primary-900 px-3.5 py-2 text-sm font-medium text-background-50"
                      >
                        <i className={`${meta?.icon ?? "ri-bookmark-line"} text-base text-secondary-300`} />
                        {meta?.label ?? id}
                      </span>
                    );
                  })}
                </div>

                {justSaved ? (
                  <div
                    role="status"
                    className="mt-5 flex items-start gap-3 rounded-md border border-primary-700 bg-primary-900 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary-500 text-background-50">
                      <i className="ri-checkbox-circle-line text-lg" />
                    </span>
                    <p className="text-sm leading-relaxed text-primary-100">
                      Your topics are saved. We'll send your first personalised digest soon.
                    </p>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={startEditing}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-accent-600 px-6 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-accent-700"
                  >
                    <i className="ri-edit-line text-base" />
                    Manage topics
                  </button>
                  <button
                    type="button"
                    onClick={handleUnsubscribe}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-primary-700 px-6 py-3 text-sm font-semibold text-background-50 transition-colors hover:border-accent-500 hover:text-accent-300"
                  >
                    <i className="ri-close-circle-line text-base" />
                    Unsubscribe
                  </button>
                </div>
              </div>
            ) : (
              <form id="newsletter-form" data-readdy-form onSubmit={handleSubmit}>
                {notice ? (
                  <div
                    role="status"
                    className="mb-5 flex items-start gap-3 rounded-md border border-primary-700 bg-primary-900 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary-500 text-background-50">
                      <i className="ri-information-line text-lg" />
                    </span>
                    <p className="text-sm leading-relaxed text-primary-100">{notice}</p>
                  </div>
                ) : null}

                <label htmlFor="newsletter-email" className="block text-sm font-semibold text-background-50">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-md border border-primary-800 bg-primary-900 px-4 py-3 text-sm text-background-50 placeholder:text-primary-400 focus:border-secondary-400 focus:outline-none"
                />

                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-background-50">Topics to follow</span>
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="cursor-pointer whitespace-nowrap text-xs font-semibold text-secondary-300 transition-colors hover:text-secondary-200"
                  >
                    {allSelected ? "Clear all" : "Select all"}
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {TOPICS.map((topic) => {
                    const checked = topics.includes(topic.id);
                    return (
                      <label
                        key={topic.id}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                          checked
                            ? "border-secondary-400 bg-secondary-500 text-primary-950"
                            : "border-primary-800 bg-primary-900 text-primary-100 hover:border-secondary-500"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="topics"
                          value={topic.id}
                          checked={checked}
                          onChange={() => toggleTopic(topic.id)}
                          className="sr-only"
                        />
                        <span className="flex h-4 w-4 items-center justify-center">
                          <i className={`${topic.icon} text-base`} />
                        </span>
                        {topic.label}
                      </label>
                    );
                  })}
                </div>

                <p className="mt-3 text-xs text-primary-300">
                  {topics.length === 0
                    ? "Select one or more topics to personalise your digest."
                    : `${topics.length} topic${topics.length === 1 ? "" : "s"} selected`}
                </p>

                <div className="field-offscreen" aria-hidden="true">
                  <label htmlFor="newsletter-website-alt">Leave this field empty</label>
                  <input
                    id="newsletter-website-alt"
                    name="website_alt"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    readOnly
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-accent-600 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status === "submitting" ? (
                    <>
                      <i className="ri-loader-4-line animate-spin text-base" />
                      {isEditing ? "Updating…" : "Subscribing…"}
                    </>
                  ) : (
                    <>
                      {isEditing ? "Update topics" : "Subscribe to topics"}
                      <i className="ri-mail-send-line text-base" />
                    </>
                  )}
                </button>

                {isEditing ? (
                  <button
                    type="button"
                    onClick={() => {
                      setView("manage");
                      setStatus("idle");
                      setFormError("");
                    }}
                    className="mt-6 ml-0 inline-flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-primary-800 px-6 py-3.5 text-sm font-semibold text-primary-200 transition-colors hover:text-background-50 sm:ml-3 sm:w-auto"
                  >
                    Cancel
                  </button>
                ) : null}

                <p className="mt-4 text-xs leading-relaxed text-primary-300">
                  By subscribing you agree to receive updates from IIMB. You can unsubscribe at any time.
                </p>

                {status === "error" ? (
                  <div
                    role="alert"
                    className="mt-5 flex items-start gap-3 rounded-md border border-accent-500 bg-primary-900 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-600 text-background-50">
                      <i className="ri-error-warning-line text-lg" />
                    </span>
                    <p className="text-sm leading-relaxed text-primary-100">{formError}</p>
                  </div>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}