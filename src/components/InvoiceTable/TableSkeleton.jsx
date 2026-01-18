const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-7 gap-4 px-4 py-3 border-b border-gray-200 dark:border-gray-700"
        >
          {Array.from({ length: 7 }).map((__, j) => (
            <div
              key={j}
              className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
