import { FiInbox } from "react-icons/fi";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500 dark:text-gray-400">
      <div className="text-4xl mb-4">📭</div>
      <h3 className="text-sm font-medium mb-1">No invoices found</h3>
      <p className="text-xs max-w-xs">
        Try adjusting your filters or search query to see results.
      </p>
    </div>
  );
};

export default EmptyState;
