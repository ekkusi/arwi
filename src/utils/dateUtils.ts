import { format } from "date-fns";

export type DateFormat = "yyyy-MM-dd" | "dd.MM.yyyy";

export const formatDate = (
  _date: Date | string,
  dateFormat: DateFormat = "yyyy-MM-dd"
): string => {
  const date = typeof _date === "string" ? new Date(_date) : _date;
  return format(date, dateFormat);
};
