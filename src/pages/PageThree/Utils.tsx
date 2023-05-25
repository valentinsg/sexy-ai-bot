// Utils.ts
export const formatTime = (date: Date | string) => {
  const formattedDate = typeof date === 'string' ? new Date(date) : date;

  if (formattedDate instanceof Date && !isNaN(formattedDate.getTime())) {
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
    return formattedDate.toLocaleTimeString(undefined, options);
  } else {
    return '';
  }
};

export function formatDate(date: Date): string {
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
  return date.toLocaleDateString(undefined, options);
}
