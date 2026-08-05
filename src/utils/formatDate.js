


export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const month = date.toLocaleString('en-US', { month: 'long' });
  return `${month} ${date.getDate()} ${date.getFullYear()}`;
}