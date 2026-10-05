export interface CalendarEvent {
  id: string;
  title: string;
  day: string;
  month: string;
  year: string;
  time: string;
  venue: string;
  description?: string;
}

const MONTHS: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const pad = (value: number) => String(value).padStart(2, "0");

function parseTime(time: string): { hour: number; minute: number } {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return { hour: 9, minute: 0 };
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return { hour, minute };
}

const escapeText = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

const formatLocal = (date: Date) =>
  `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(
    date.getMinutes(),
  )}00`;

export function downloadEventIcs(event: CalendarEvent): void {
  const monthIndex = MONTHS[event.month] ?? 0;
  const { hour, minute } = parseTime(event.time);
  const start = new Date(Number(event.year), monthIndex, Number(event.day), hour, minute);
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//IIM Bangalore//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}@iimb.ac.in`,
    `DTSTAMP:${formatLocal(new Date())}`,
    `DTSTART:${formatLocal(start)}`,
    `DTEND:${formatLocal(end)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `LOCATION:${escapeText(event.venue)}`,
    `DESCRIPTION:${escapeText(event.description ?? `${event.title} at IIM Bangalore`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `iimb-${event.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface DeadlineReminder {
  id: string;
  title: string;
  isoDate: string;
  description?: string;
}

export function downloadDeadlineIcs(reminder: DeadlineReminder): void {
  const [year, month, day] = reminder.isoDate.split("-").map(Number);
  if (!year || !month || !day) return;

  const start = new Date(year, month - 1, day);
  const end = new Date(year, month - 1, day + 1);
  const dateOnly = (date: Date) => `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//IIM Bangalore//Programmes//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:deadline-${reminder.id}@iimb.ac.in`,
    `DTSTAMP:${formatLocal(new Date())}`,
    `DTSTART;VALUE=DATE:${dateOnly(start)}`,
    `DTEND;VALUE=DATE:${dateOnly(end)}`,
    `SUMMARY:${escapeText(reminder.title)}`,
    `DESCRIPTION:${escapeText(reminder.description ?? reminder.title)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `iimb-${reminder.id}-deadline.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}