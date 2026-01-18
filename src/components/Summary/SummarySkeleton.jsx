import Skeleton from "../ui/Skeleton";

const SummarySkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-2xl p-5 bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700"
        >
          <Skeleton className="h-4 w-1/2 mb-3" />
          <Skeleton className="h-8 w-3/4" />
        </div>
      ))}
    </div>
  );
};

export default SummarySkeleton;
