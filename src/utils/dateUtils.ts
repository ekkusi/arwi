import { format } from "date-fns";

export type DateFormat = "yyyy-MM-dd" | "dd.MM.yyyy";

export const formatDate = (
  date: Date,
  dateFormat: DateFormat = "yyyy-MM-dd"
): string => {
  return format(date, dateFormat);
};
