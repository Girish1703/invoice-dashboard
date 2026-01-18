import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";

const TableHeader = () => {
  const { settings } = useContext(SettingsContext);

  const densityPadding =
    settings.density === "compact" ? "py-2" : "py-3";

  return (
    <thead className="bg-gray-100 dark:bg-gray-700">
      <tr>
        {[
          "Invoice ID",
          "Customer",
          "Amount",
          "Invoice Date",
          "Due Date",
          "Status",
          "Action",
        ].map((h) => (
          <th
            key={h}
            className={`px-3 ${densityPadding} text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300`}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
