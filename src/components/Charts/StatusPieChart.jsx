import { useContext, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { InvoiceContext } from "../../context/InvoiceContext";
import { getInvoiceStatus } from "../../utils/statusUtils";

const COLORS = ["#3B82F6", "#F59E0B", "#EF4444"];

const StatusPieChart = () => {
  const { invoices } = useContext(InvoiceContext);

  const data = useMemo(() => {
    const counts = { paid: 0, pending: 0, overdue: 0 };

    invoices.forEach((inv) => {
      const status = getInvoiceStatus(inv);
      if (counts[status] !== undefined) counts[status]++;
    });

    return [
      { name: "Paid", value: counts.paid },
      { name: "Pending", value: counts.pending },
      { name: "Overdue", value: counts.overdue },
    ];
  }, [invoices]);

  const hasData = data.some((d) => d.value > 0);

  if (!hasData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow flex items-center justify-center min-h-[300px]">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow min-h-[300px]"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Invoice Status
      </h3>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              animationDuration={1000}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default StatusPieChart;
