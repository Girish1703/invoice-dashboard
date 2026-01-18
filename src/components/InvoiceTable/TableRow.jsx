import { useContext } from "react";
import { InvoiceContext } from "../../context/InvoiceContext";
import { SettingsContext } from "../../context/SettingsContext";
import { getInvoiceStatus } from "../../utils/statusUtils";
import { formatCurrency } from "../../utils/formatCurrency";

const TableRow = ({ invoice, isStriped }) => {
  const { togglePaidStatus } = useContext(InvoiceContext);
  const { settings } = useContext(SettingsContext);

  const status = getInvoiceStatus(invoice);

  const statusStyles = {
    paid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    overdue: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  const rowBg = isStriped
    ? "bg-gray-50 dark:bg-gray-900/30"
    : "bg-white dark:bg-gray-800";

  // 🔥 Density logic
  const densityPadding =
    settings.density === "compact" ? "py-2" : "py-3";

  return (
    <tr
      className={`${rowBg} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
    >
      <td className={`px-3 ${densityPadding} text-sm text-gray-700 dark:text-gray-200`}>
        {invoice.id}
      </td>

      <td className={`px-3 ${densityPadding} text-sm text-gray-700 dark:text-gray-200`}>
        {invoice.customer}
      </td>

      <td className={`px-3 ${densityPadding} text-sm font-medium text-gray-900 dark:text-gray-100`}>
        {formatCurrency(invoice.amount, settings.currency)}
      </td>

      <td className={`px-3 ${densityPadding} text-sm text-gray-700 dark:text-gray-200`}>
        {invoice.invoiceDate}
      </td>

      <td className={`px-3 ${densityPadding} text-sm text-gray-700 dark:text-gray-200`}>
        {invoice.dueDate}
      </td>

      <td className={`px-3 ${densityPadding}`}>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[status]}`}
        >
          {status}
        </span>
      </td>

      <td className={`px-3 ${densityPadding}`}>
        <button
          onClick={() => togglePaidStatus(invoice.id)}
          className={`px-3 py-1 rounded-md text-xs font-medium transition ${
            status === "paid"
              ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {status === "paid" ? "Mark Unpaid" : "Mark Paid"}
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
