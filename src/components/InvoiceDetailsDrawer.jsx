import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import { getInvoiceStatus } from "../utils/statusUtils";

const InvoiceDetailsDrawer = () => {
  const { selectedInvoice, setSelectedInvoice, togglePaidStatus } =
    useContext(InvoiceContext);

  if (!selectedInvoice) return null;

  const status = getInvoiceStatus(selectedInvoice);

  const statusStyles = {
    paid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    overdue: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedInvoice(null)}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full sm:w-[420px] h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Invoice Details
            </h2>
            <button
              onClick={() => setSelectedInvoice(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            <Detail label="Invoice ID" value={selectedInvoice.id} />
            <Detail label="Customer" value={selectedInvoice.customer} />
            <Detail label="Amount" value={`₹${selectedInvoice.amount}`} />
            <Detail label="Invoice Date" value={selectedInvoice.invoiceDate} />
            <Detail label="Due Date" value={selectedInvoice.dueDate} />

            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Status</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[status]}`}
              >
                {status}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => togglePaidStatus(selectedInvoice.id)}
              className={`w-full py-3 rounded-xl font-medium transition ${
                status === "paid"
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {status === "paid" ? "Mark as Unpaid" : "Mark as Paid"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
    <span className="text-gray-500 dark:text-gray-400">{label}</span>
    <span className="font-medium text-gray-800 dark:text-gray-100">
      {value}
    </span>
  </div>
);

export default InvoiceDetailsDrawer;
