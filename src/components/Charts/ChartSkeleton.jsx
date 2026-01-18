const ChartSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow animate-pulse min-h-[300px]">
      <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <div className="h-[220px] bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  );
};

export default ChartSkeleton;
