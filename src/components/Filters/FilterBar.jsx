import { useContext } from "react";
import { InvoiceContext } from "../../context/InvoiceContext";

const FilterBar = () => {
  const {
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    setPage,
  } = useContext(InvoiceContext);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
      
      {/* Search */}
      <div className="relative w-full lg:w-1/3">
        <input
          type="text"
          placeholder="Search invoice ID or customer..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
          className="w-full pl-4 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Status Pills */}
      <div className="flex flex-wrap gap-2">
        {["all", "paid", "pending", "overdue"].map((status) => {
          const isActive = filterStatus === status;

          return (
            <button
              key={status}
              onClick={() => {
                setFilterStatus(status);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>

      {/* Sort */}
      <select
        value={sortOption || ""}
        onChange={(e) => {
          setSortOption(e.target.value);
          setPage(1);
        }}
        className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="">Sort by</option>
        <option value="amount">Amount</option>
        <option value="dueDate">Due Date</option>
        <option value="invoiceDate">Invoice Date</option>
      </select>
    </div>
  );
};

export default FilterBar;
