import { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { InvoiceContext } from "../../context/InvoiceContext";
import SummaryCard from "./SummaryCard";
import { getInvoiceStatus } from "../../utils/statusUtils";
import { daysBetween, isSameMonth } from "../../utils/dateUtils";
import {
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import SummarySkeleton from "./SummarySkeleton";

const SummaryContainer = () => {
  const { invoices } = useContext(InvoiceContext);

  if (!invoices || invoices.length === 0) {
    return <SummarySkeleton />;
  }

  const summaryData = useMemo(() => {
    let totalOutstanding = 0;
    let totalOverdue = 0;
    let paidThisMonth = 0;
    let totalDelayDays = 0;
    let paidCount = 0;

    const today = new Date();

    invoices.forEach((invoice) => {
      const status = getInvoiceStatus(invoice);

      if (status === "pending") totalOutstanding += invoice.amount;

      if (status === "overdue") {
        totalOutstanding += invoice.amount;
        totalOverdue += invoice.amount;
      }

      if (status === "paid") {
        const paymentDate = new Date(invoice.paymentDate);
        const dueDate = new Date(invoice.dueDate);

        if (isSameMonth(paymentDate, today)) {
          paidThisMonth += invoice.amount;
        }

        const delay = daysBetween(dueDate, paymentDate);
        totalDelayDays += delay;
        paidCount++;
      }
    });

    const avgDelay =
      paidCount === 0 ? 0 : Math.round(totalDelayDays / paidCount);

    return {
      totalOutstanding,
      totalOverdue,
      paidThisMonth,
      avgDelay,
    };
  }, [invoices]);

  const cards = [
    {
      title: "Total Outstanding",
      value: `₹${summaryData.totalOutstanding}`,
      color: "bg-yellow-500",
      icon: <FaMoneyBillWave />,
    },
    {
      title: "Total Overdue",
      value: `₹${summaryData.totalOverdue}`,
      color: "bg-red-500",
      icon: <FaExclamationTriangle />,
    },
    {
      title: "Paid This Month",
      value: `₹${summaryData.paidThisMonth}`,
      color: "bg-green-500",
      icon: <FaCheckCircle />,
    },
    {
      title: "Avg Payment Delay",
      value: `${summaryData.avgDelay} days`,
      color: "bg-blue-500",
      icon: <FaClock />,
    },
  ];

  return (
  <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
>
  {cards.map((card, index) => (
    <SummaryCard key={index} {...card} />
  ))}
</motion.div>


  );
};

export default SummaryContainer;
