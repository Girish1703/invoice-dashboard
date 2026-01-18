import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { motion } from "framer-motion";

const SettingsPanel = () => {
  const { settings, updateSetting } = useContext(SettingsContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 w-full max-w-sm border dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Settings
      </h3>

      {/* Currency */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Currency
        </label>
        <select
          value={settings.currency}
          onChange={(e) => updateSetting("currency", e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 border dark:border-gray-700 text-gray-800 dark:text-gray-100"
        >
          <option value="₹">₹ Rupee</option>
          <option value="$">$ Dollar</option>
          <option value="€">€ Euro</option>
        </select>
      </div>

      {/* Density */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Table Density
        </label>
        <div className="flex gap-2">
          {["comfortable", "compact"].map((d) => (
            <button
              key={d}
              onClick={() => updateSetting("density", d)}
              className={`flex-1 py-2 rounded-lg text-sm transition ${
                settings.density === d
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <ToggleRow
          label="Show Charts"
          value={settings.showCharts}
          onChange={() =>
            updateSetting("showCharts", !settings.showCharts)
          }
        />

        <ToggleRow
          label="Animations"
          value={settings.animations}
          onChange={() =>
            updateSetting("animations", !settings.animations)
          }
        />
      </div>
    </motion.div>
  );
};

const ToggleRow = ({ label, value, onChange }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <button
        onClick={onChange}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
          value ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default SettingsPanel;
