import React from "react";
import { InvoiceProvider } from "./context/InvoiceContext";
import { SettingsProvider } from "./context/SettingsContext";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <SettingsProvider>
      <InvoiceProvider>
        <Dashboard />
      </InvoiceProvider>
    </SettingsProvider>
  );
}

export default App;
