

export function groupByMonth(transactions) {
  const result = {};

  transactions.forEach(item => {
    const date = new Date(item.date);
    const key = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    if (!result[key]) {
      result[key] = { month: key, debt: 0, payment: 0 };
    }

    result[key][item.type] += item.amount;
  });

  return Object.values(result).sort((a, b) => {
    return new Date(a.month) - new Date(b.month);
  });
}