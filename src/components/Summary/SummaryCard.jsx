import CountUp from "react-countup";
import { motion } from "framer-motion";

const SummaryCard = ({ title, value, color, icon }) => {
  const numericValue = parseInt(value.replace(/[₹, days]/g, "")) || 0;
  const isDays = value.includes("days");

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700"
    >
      {/* Soft glow */}
      <div
        className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-20 ${color}`}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>

          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {!isDays && value.includes("₹") && "₹"}
            <CountUp end={numericValue} duration={1.2} separator="," />
            {isDays && " days"}
          </p>
        </div>

        <div
          className={`h-11 w-11 rounded-xl flex items-center justify-center text-white shadow ${color}`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
