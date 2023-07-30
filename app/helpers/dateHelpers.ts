import { format } from "date-fns";

export function timeSince(date: string) {
  const dateNumber = Date.parse(date);
  const now = Date.now();
  const seconds = Math.floor((now - dateNumber) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return { count: Math.floor(interval), key: "years-ago" };
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return { count: Math.floor(interval), key: "months-ago" };
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return { count: Math.floor(interval), key: "days-ago" };
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return { count: Math.floor(interval), key: "hours-ago" };
  }
  interval = seconds / 60;
  if (interval > 1) {
    return { count: Math.floor(interval), key: "minutes-ago" };
  }
  return { count: undefined, key: "just-now" };
}

export type DateFormat = "yyyy-MM-dd" | "dd.MM.yyyy";

export const formatDate = (_date: Date | string, dateFormat: DateFormat = "dd.MM.yyyy"): string => {
  const date = typeof _date === "string" ? new Date(_date) : _date;
  return format(date, dateFormat);
};
