import { useContext } from "react";
import { InvoiceContext } from "../../context/InvoiceContext";

const ExportCSVButton = () => {
  const { invoices } = useContext(InvoiceContext);

  const exportToCSV = () => {
    if (!invoices.length) return;

    const headers = [
      "Invoice ID",
      "Customer",
      "Amount",
      "Invoice Date",
      "Due Date",
      "Payment Date",
      "Status",
    ];

    const rows = invoices.map((inv) => [
      inv.id,
      inv.customer,
      inv.amount,
      inv.invoiceDate,
      inv.dueDate,
      inv.paymentDate || "",
      inv.paymentDate ? "Paid" : "Unpaid",
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "invoices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      Export CSV
    </button>
  );
};

export default ExportCSVButton;
