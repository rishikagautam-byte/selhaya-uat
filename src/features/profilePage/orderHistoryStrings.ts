// orderHistoryStrings.ts

export const ORDER_HISTORY_STRINGS = {
  // Header
  title: "Order History",
  noOrders: "No orders found.",

  // Order Row Labels
  orderStatusLabel: "Order Status",
  dateLabel: "Date",
  orderIdPrefix: "Order ID #",

  // Status Values
  statusProcessing: "Processing",
  statusShipped: "Shipped",
  statusDelivered: "Delivered",

  // Buttons
  detailsButton: "Details",
  closeButton: "Close",

  // Expanded Detail Labels
  deliveryFeeLabel: "Delivery Fee",
  taxLabel: "Tax",
  totalAmountLabel: "Total Amount",
  totalAmountPrefix: "Amount ",
  viewFullDetails: "View Full Details",
  paidByPrefix: "Paid by ",

  // Pagination
  previousButton: "← Previous",
  nextButton: "Next →",
} as const;