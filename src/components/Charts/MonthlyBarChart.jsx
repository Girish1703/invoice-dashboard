import { useContext, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { InvoiceContext } from "../../context/InvoiceContext";

const MonthlyBarChart = () => {
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
      amount: monthlyMap[m],
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow min-h-[300px]"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Monthly Revenue
      </h3>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="amount"
              fill="#3B82F6"
              radius={[6, 6, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MonthlyBarChart;
