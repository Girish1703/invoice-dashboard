import { motion } from "framer-motion";
import StatusPieChart from "./StatusPieChart";
import RevenueLineChart from "./RevenueLineChart";
import MonthlyBarChart from "./MonthlyBarChart";
import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";

const ChartsSection = () => {
  const { settings } = useContext(SettingsContext);

  if (!settings.showCharts) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: settings.animations ? 0.4 : 0 }}
      className="grid grid-cols-1 xl:grid-cols-3 gap-6"
    >
      <StatusPieChart />
      <RevenueLineChart />
      <MonthlyBarChart />
    </motion.div>
  );
};

export default ChartsSection;
