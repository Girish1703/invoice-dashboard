import { useContext } from "react";
import { InvoiceContext } from "../../context/InvoiceContext";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import EmptyState from "./EmptyState";
import PaginationControls from "./PaginationControls";

const InvoiceTable = () => {
  const { invoices } = useContext(InvoiceContext);

  if (!invoices || invoices.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <TableHeader />
          <tbody>
            {invoices.map((invoice, index) => (
              <TableRow
                key={invoice.id}
                invoice={invoice}
                isStriped={index % 2 === 0}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700">
        <PaginationControls />
      </div>
    </div>
  );
};

export default InvoiceTable;
