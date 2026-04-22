

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import { groupByMonth } from "@/app/utils/calcTransactionsChart";

export default function TransactionsChart({ transactions }) {
  const data = groupByMonth(transactions);

  console.log(data)

  return (
    <div className="flex flex-col items-center pb-4 pt-6 md:py-6 pl-0 pr-6 gap-4 w-full h-64 justify-center rounded-lg shadow-[inset_4px_4px_2px_rgba(0,0,0,0.4),inset_-4px_-4px_2px_rgba(255,255,255)]">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" interval="preserveStartEnd" tick={{ angle: -30, textAnchor: "end", fontSize: 10, fill: "#6b7280" }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#6b7280" }} />

          <Tooltip />

          <Line type="monotone" dataKey="debt" strokeWidth={3} stroke="var(--secondaryColor)" dot={{ fill: "var(--secondaryColor)", r: 3 }} />
          <Line type="monotone" dataKey="payment" strokeWidth={3} stroke="var(--tertiaryColor)" dot={{ fill: "var(--tertiaryColor)", r: 3 }} />
        </LineChart>

      </ResponsiveContainer>

      <div className="flex flex-row w-full justify-center gap-5 text-xs font-semibold">
        <span className="text-(--secondaryColor)"> ● Debt</span>
        <span className="text-(--tertiaryColor)"> ● Payment</span>
      </div>

    </div>

  );
}

