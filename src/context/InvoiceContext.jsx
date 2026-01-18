import { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { dummyInvoices } from "../utils/dummyData";
import { getInvoiceStatus } from "../utils/statusUtils";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // 🔥 NEW: Drawer state
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const pageSize = 5;

  // Load invoices
  useEffect(() => {
    const storedInvoices = localStorage.getItem("invoices");

    try {
      const parsed = storedInvoices ? JSON.parse(storedInvoices) : null;
      if (Array.isArray(parsed) && parsed.length > 0) {
        setInvoices(parsed);
      } else {
        setInvoices(dummyInvoices);
        localStorage.setItem("invoices", JSON.stringify(dummyInvoices));
      }
    } catch {
      setInvoices(dummyInvoices);
      localStorage.setItem("invoices", JSON.stringify(dummyInvoices));
    }
  }, []);

  // Persist invoices
  useEffect(() => {
    if (invoices.length > 0) {
      localStorage.setItem("invoices", JSON.stringify(invoices));
    }
  }, [invoices]);

  // ---------- DERIVED DATA PIPELINE ----------

  const filteredInvoices = useMemo(() => {
    if (filterStatus === "all") return invoices;

    return invoices.filter((inv) => {
      const status = getInvoiceStatus(inv);
      return status === filterStatus;
    });
  }, [invoices, filterStatus]);

  const searchedInvoices = useMemo(() => {
    if (!searchQuery.trim()) return filteredInvoices;

    return filteredInvoices.filter((inv) =>
      `${inv.id} ${inv.customer}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [filteredInvoices, searchQuery]);

  const sortedInvoices = useMemo(() => {
    if (!sortOption) return searchedInvoices;

    const sorted = [...searchedInvoices];

    if (sortOption === "amount") {
      sorted.sort((a, b) => b.amount - a.amount);
    }

    if (sortOption === "dueDate") {
      sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    if (sortOption === "invoiceDate") {
      sorted.sort((a, b) => new Date(a.invoiceDate) - new Date(b.invoiceDate));
    }

    return sorted;
  }, [searchedInvoices, sortOption]);

  const totalPages = Math.ceil(sortedInvoices.length / pageSize);

  const paginatedInvoices = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedInvoices.slice(start, start + pageSize);
  }, [sortedInvoices, page]);

  // ---------- ACTIONS ----------

  const addInvoice = useCallback((invoiceData) => {
    setInvoices((prev) => [invoiceData, ...prev]);
  }, []);

  const togglePaidStatus = useCallback((id) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv;

        if (inv.paymentDate) {
          return { ...inv, paymentDate: null };
        } else {
          const today = new Date().toISOString().split("T")[0];
          return { ...inv, paymentDate: today };
        }
      })
    );
  }, []);

  return (
    <InvoiceContext.Provider
      value={{
        invoices: paginatedInvoices,
        totalItems: sortedInvoices.length,
        totalPages,
        page,
        setPage,
        filterStatus,
        setFilterStatus,
        sortOption,
        setSortOption,
        searchQuery,
        setSearchQuery,
        addInvoice,
        togglePaidStatus,

        // 🔥 Drawer controls
        selectedInvoice,
        setSelectedInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
