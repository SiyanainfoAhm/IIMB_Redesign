import { useEffect, useState } from "react";
import type { FormEvent } from "react";

const FORM_URL = "https://readdy.ai/api/form/db164m32asjjtt1sl5m0";

export interface InterestEvent {
  id: string;
  title: string;
  day: string;
  month: string;
  year: string;
  time: string;
  venue: string;
}

type Status = "idle" | "submitting" | "success" | "error";

interface EventInterestDialogProps {
  event: InterestEvent | null;
  onClose: () => void;
}

export default function EventInterestDialog({ event, onClose }: EventInterestDialogProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!event) return undefined;
    setStatus("idle");
    setFormError("");

    const handleKey = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [event, onClose]);

  if (!event) return null;

  const handleSubmit = async (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    const form = submitEvent.currentTarget;
    const data = new FormData(form);

    const honeypot = (data.get("website_alt") as string | null)?.trim() ?? "";
    if (honeypot) {
      setStatus("success");
      return;
    }
    data.delete("website_alt");

    setStatus("submitting");
    setFormError("");

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
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setFormError(
          isSpam
            ? "We couldn't process that submission. Please check your details and try again."
            : typeof serverMsg === "string" && serverMsg.length > 0
              ? serverMsg
              : "Something went wrong while registering. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setFormError("We couldn't reach the server. Please check your connection and try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close registration dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-foreground-950/60 backdrop-blur-sm animate-fade-in"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-interest-title"
        className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-lg border border-background-200 bg-background-50 sm:rounded-lg animate-fade-up"
      >
        <div className="flex items-start justify-between gap-4 border-b border-background-200 bg-background-100 p-6 md:p-7">
          <div>
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-700">
              <span className="h-px w-6 bg-accent-300" />
              Register interest
            </span>
            <h2 id="event-interest-title" className="mt-3 font-heading text-xl leading-snug text-foreground-950 md:text-2xl">
              {event.title}
            </h2>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground-600">
              <span className="flex items-center gap-1.5">
                <i className="ri-calendar-line" />
                {event.day} {event.month} {event.year} · {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="ri-map-pin-2-line" />
                {event.venue}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-background-300 bg-background-50 text-foreground-600 transition-colors hover:text-foreground-950"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        <div className="p-6 md:p-7">
          {status === "success" ? (
            <div className="py-4 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100 text-secondary-900">
                <i className="ri-checkbox-circle-line text-3xl" />
              </span>
              <h3 className="mt-5 font-heading text-xl text-foreground-950">You're registered</h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-foreground-600">
                Thanks for your interest in <strong className="font-semibold text-foreground-900">{event.title}</strong>.
                We've sent a confirmation with the joining details — keep an eye on your inbox.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-700 px-6 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-800"
                >
                  <i className="ri-calendar-line text-base" />
                  Back to events
                </button>
              </div>
            </div>
          ) : (
            <form id="event-interest-form" data-readdy-form onSubmit={handleSubmit}>
              <input type="hidden" name="event" value={event.title} />
              <input type="hidden" name="event_date" value={`${event.day} ${event.month} ${event.year}`} />
              <input type="hidden" name="event_venue" value={event.venue} />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="interest-name" className="block text-sm font-semibold text-foreground-900">
                    Full name
                  </label>
                  <input
                    id="interest-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className="mt-2 w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 placeholder:text-foreground-400 focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="interest-email" className="block text-sm font-semibold text-foreground-900">
                    Email address
                  </label>
                  <input
                    id="interest-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 placeholder:text-foreground-400 focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="interest-phone" className="block text-sm font-semibold text-foreground-900">
                    Phone <span className="font-normal text-foreground-500">(optional)</span>
                  </label>
                  <input
                    id="interest-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 00000 00000"
                    className="mt-2 w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 placeholder:text-foreground-400 focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="interest-organisation" className="block text-sm font-semibold text-foreground-900">
                    Organisation
                  </label>
                  <input
                    id="interest-organisation"
                    name="organisation"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company or institution"
                    className="mt-2 w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 placeholder:text-foreground-400 focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="interest-guests" className="block text-sm font-semibold text-foreground-900">
                    Attendees
                  </label>
                  <select
                    id="interest-guests"
                    name="guests"
                    defaultValue="Just me"
                    className="mt-2 w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 focus:border-primary-500 focus:outline-none"
                  >
                    <option>Just me</option>
                    <option>2 people</option>
                    <option>3–5 people</option>
                    <option>6 or more</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="interest-notes" className="block text-sm font-semibold text-foreground-900">
                    Anything we should know? <span className="font-normal text-foreground-500">(optional)</span>
                  </label>
                  <textarea
                    id="interest-notes"
                    name="notes"
                    rows={3}
                    maxLength={500}
                    placeholder="Questions, accessibility needs or dietary requirements"
                    className="mt-2 w-full resize-none rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 placeholder:text-foreground-400 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="field-offscreen" aria-hidden="true">
                <label htmlFor="interest-website-alt">Leave this field empty</label>
                <input
                  id="interest-website-alt"
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
                className="mt-6 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-accent-600 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <i className="ri-loader-4-line animate-spin text-base" />
                    Sending…
                  </>
                ) : (
                  <>
                    <i className="ri-calendar-check-line text-base" />
                    Confirm registration
                  </>
                )}
              </button>

              <p className="mt-3 flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-foreground-500">
                <i className="ri-mail-check-line mt-0.5 shrink-0 text-base text-primary-600" />
                <span>
                  We'll send a confirmation email to the address above with your registration details,
                  joining links and any reminders. Only used for this event — no spam, ever.
                </span>
              </p>

              {status === "error" ? (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-3 rounded-md border border-accent-300 bg-accent-50 p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-600 text-background-50">
                    <i className="ri-error-warning-line text-lg" />
                  </span>
                  <p className="text-sm leading-relaxed text-accent-900">{formError}</p>
                </div>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}