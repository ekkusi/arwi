import { format } from "date-fns";

export function timeSince(date: string) {
  const dateNumber = Date.parse(date);
  const now = Date.now();
  const seconds = Math.floor((now - dateNumber) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} years`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
}

export type DateFormat = "yyyy-MM-dd" | "dd.MM.yyyy";

export const formatDate = (_date: Date | string, dateFormat: DateFormat = "dd.MM.yyyy"): string => {
  const date = typeof _date === "string" ? new Date(_date) : _date;
  return format(date, dateFormat);
};
