export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(value));
}
