export const getInvoiceStatus = (invoice) => {
  const today = new Date();
  const dueDate = new Date(invoice.dueDate);

  if (invoice.paymentDate) {
    return "paid";
  }

  if (dueDate < today) {
    return "overdue";
  }

  return "pending";
};
