import { useContext, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { InvoiceContext } from "../../context/InvoiceContext";

const RevenueLineChart = () => {
  const { invoices } = useContext(InvoiceContext);

  const data = useMemo(() => {
    if (!invoices || invoices.length === 0) return [];

    const monthlyMap = {};

    invoices.forEach((inv) => {
      if (!inv.invoiceDate || !inv.amount) return;

      const month = new Date(inv.invoiceDate).toLocaleString("default", {
        month: "short",
      });

      if (!monthlyMap[month]) monthlyMap[month] = 0;
      monthlyMap[month] += Number(inv.amount);
    });

    return Object.keys(monthlyMap).map((m) => ({
      month: m,
      revenue: monthlyMap[m],
    }));
  }, [invoices]);

  if (!data.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow flex items-center justify-center min-h-[300px]">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow min-h-[300px]"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Revenue Trend
      </h3>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RevenueLineChart;
