import { useState } from "react";
import SummaryContainer from "../components/Summary/SummaryContainer";
import InvoiceTable from "../components/InvoiceTable/InvoiceTable";
import FilterBar from "../components/Filters/FilterBar";
import ChartsSection from "../components/Charts/ChartsSection";
import ThemeToggle from "../components/ThemeToggle";
import { FiSettings } from "react-icons/fi";


const Dashboard = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-10 transition-colors relative">
      
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Invoice Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track, analyze and manage your invoices
          </p>
        </div>
        


        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Settings Button */}
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700 hover:shadow-md transition"
            title="Open Settings"
          >
            <FiSettings className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-12">
        <SummaryContainer />
      </div>

      {/* Charts */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Analytics Overview
        </h2>
        <ChartsSection />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FilterBar />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transition-colors">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Invoices
        </h2>
        <InvoiceTable />
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
