


export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const month = date.toLocaleString('en-US', { month: 'long' });
  return `${month} ${date.getDate()} ${date.getFullYear()}`;
}


export function getMonthKey(dateString) {
    const d = new Date(dateString);
    if (isNaN(d)) return { key: 'unknown', label: 'Unknown Date' };
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return { key, label };
};


export function getGroupHeading(key, label){
    const now = new Date();
    const [y, m] = key.split('-').map(Number);
    const thisKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastKey = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;

    if (key === thisKey) return 'Added This Month';
    if (key === lastKey) return 'Added Last Month';
    return `Added in ${label}`;
};