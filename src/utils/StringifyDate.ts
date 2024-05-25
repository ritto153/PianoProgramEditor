export const StringifyDate = (date: Date | null): string => {
  const timeFormatter = new Intl.DateTimeFormat("ja-jp", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (date) {
    return `${timeFormatter.format(date)}`;
  } else {
    return "";
  }
};
