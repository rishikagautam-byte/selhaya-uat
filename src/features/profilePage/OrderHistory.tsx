// OrderHistory.tsx

import { useState } from "react";
import { ORDER_HISTORY_STRINGS } from "./orderHistoryStrings";

import type { Order } from "./orderData";
import { useUser } from "../../context/UserContext";

function OrderRow({
  order,
  onViewDetail,
}: {
  order: Order;
  onViewDetail: (order: Order) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="md:border md:border-[#E4DDCB] md:rounded-sm md:mb-3 border-t border-b border-[#E4DDCB] mb-3 bg-[#F9F4EE] overflow-hidden">

      {/* ── Collapsed Row ─────────────────────────────────────────────────── */}

      {/* MOBILE collapsed */}
      <div className="md:hidden px-4 py-4">
        {/* Row 1: Status | Date | Order ID */}
        <div className="flex items-start gap-4 mb-3">
          {/* Order Status */}
          <div className="flex-1 min-w-0">
            <p className="font-['DM_Sans'] text-[11px] text-[#C5B4A0] mb-0.5 m-0">
              {ORDER_HISTORY_STRINGS.orderStatusLabel}
            </p>
            <p className="font-editorial text-[14px] text-[#281B13] font-normal leading-none m-0">
              {order.status}
            </p>
          </div>

          {/* Date */}
          <div className="flex-1 min-w-0">
            <p className="font-['DM_Sans'] text-[11px] text-[#C5B4A0] mb-0.5 m-0">
              {ORDER_HISTORY_STRINGS.dateLabel}
            </p>
            <p className="font-['DM_Sans'] text-[13px] text-[#281B13] font-medium m-0">
              {order.date}
            </p>
          </div>

          {/* Order ID */}
          <div className="flex-1 min-w-0">
            <p className="font-['DM_Sans'] text-[11px] text-[#C5B4A0] mb-0.5 m-0">
              Order ID
            </p>
            <p className="font-['DM_Sans'] text-[13px] text-[#281B13] font-medium m-0 truncate">
              #{order.id}
            </p>
          </div>
        </div>

        {/* Row 2: Thumbnails + Details button */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            {order.images.map((img, i) => (
              <div
                key={i}
                className="w-9 h-11 bg-[#E4DDCB] rounded-sm overflow-hidden flex-shrink-0"
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="font-['DM_Sans'] text-[13px] text-[#281B13] font-medium bg-transparent border-none cursor-pointer p-0"
          >
            {expanded
              ? ORDER_HISTORY_STRINGS.closeButton
              : ORDER_HISTORY_STRINGS.detailsButton}
          </button>
        </div>
      </div>

      {/* DESKTOP collapsed */}
      <div className="hidden md:flex items-center px-6 py-[18px] gap-8">
        {/* Order Status */}
        <div className="min-w-[110px]">
          <p className="font-['DM_Sans'] text-[12px] text-[#C5B4A0] mb-1 font-normal m-0">
            {ORDER_HISTORY_STRINGS.orderStatusLabel}
          </p>
          <p className="font-editorial text-[16px] text-[#281B13] font-normal leading-none m-0">
            {order.status}
          </p>
        </div>

        {/* Date */}
        <div className="min-w-[110px]">
          <p className="font-['DM_Sans'] text-[12px] text-[#C5B4A0] mb-1 font-normal m-0">
            {ORDER_HISTORY_STRINGS.dateLabel}
          </p>
          <p className="font-['DM_Sans'] text-[14px] text-[#281B13] font-medium m-0">
            {order.date}
          </p>
        </div>

        {/* Order ID */}
        <div className="flex-1">
          <p className="font-['DM_Sans'] text-[14px] text-[#281B13] font-medium m-0">
            {ORDER_HISTORY_STRINGS.orderIdPrefix}{order.id}
          </p>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-1 items-center">
          {order.images.map((img, i) => (
            <div
              key={i}
              className="w-10 h-[50px] bg-[#E4DDCB] rounded-sm overflow-hidden flex-shrink-0"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          ))}
        </div>

        {/* Details / Close */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="font-['DM_Sans'] text-[14px] text-[#281B13] font-medium ml-4 whitespace-nowrap bg-transparent border-none cursor-pointer p-0"
        >
          {expanded
            ? ORDER_HISTORY_STRINGS.closeButton
            : ORDER_HISTORY_STRINGS.detailsButton}
        </button>
      </div>

      {/* ── Expanded Panel (shared mobile + desktop) ───────────────────────── */}
      {expanded && (
        <div className="border-t border-[#E4DDCB] px-4 md:px-6">

          {/* Items */}
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-[14px] border-b border-[#F0EBE3]"
            >
              <span className="font-['DM_Sans'] text-[13px] md:text-[14px] text-[#281B13] font-medium">
                {item.name}
              </span>
              <span className="font-['DM_Sans'] text-[13px] md:text-[14px] text-[#281B13] font-medium">
                {item.price}
              </span>
            </div>
          ))}

          {/* Delivery Fee */}
          <div className="flex justify-between items-center py-[14px] border-b border-[#F0EBE3]">
            <span className="font-['DM_Sans'] text-[13px] md:text-[14px] text-[#281B13] font-medium">
              {ORDER_HISTORY_STRINGS.deliveryFeeLabel}
            </span>
            <span className="font-['DM_Sans'] text-[13px] md:text-[14px] text-[#281B13] font-medium">
              {order.deliveryFee}
            </span>
          </div>

          {/* Tax */}
          <div className="flex justify-between items-center py-[14px] border-b border-[#F0EBE3]">
            <span className="font-['DM_Sans'] text-[12px] text-[#402C1F] font-medium">
              {ORDER_HISTORY_STRINGS.taxLabel}
            </span>
            <span className="font-['DM_Sans'] text-[12px] text-[#402C1F]">
              {order.tax}
            </span>
          </div>

          {/* Total Amount */}
          <div className="flex justify-between items-center py-[18px]">
            <span className="font-['DM_Sans'] text-[12px] text-[#281B13] font-normal">
              {ORDER_HISTORY_STRINGS.totalAmountLabel}
            </span>
            <span className="font-['DM_Sans'] text-[13px] md:text-[14px] text-[#281B13] font-normal">
              {ORDER_HISTORY_STRINGS.totalAmountPrefix}{order.total}
            </span>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center py-4 border-t border-[#E4DDCB] mb-1">
            <button
              onClick={() => onViewDetail(order)}
              className="font-['DM_Sans'] text-[13px] md:text-[14px] text-[#281B13] font-medium flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
            >
              {ORDER_HISTORY_STRINGS.viewFullDetails}
              <span className="tracking-[-1px] text-[16px]">——→</span>
            </button>
            <span className="font-['DM_Sans'] text-[12px] md:text-[14px] text-[#281B13] font-medium">
              {ORDER_HISTORY_STRINGS.paidByPrefix}{order.paymentMethod}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  const getPages = (): (number | "...")[] => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  return (
    <div className="flex items-center justify-center gap-4 mt-6 pb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={prevDisabled}
        className={`font-editorial text-[16px] font-normal bg-transparent border-none p-0 ${prevDisabled
            ? "text-[#C5B4A0] cursor-default"
            : "text-[#281B13] cursor-pointer hover:opacity-70"
          }`}
      >
        {ORDER_HISTORY_STRINGS.previousButton}
      </button>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span
            key={`dot-${i}`}
            className="font-['DM_Sans'] text-[14px] text-[#C5B4A0]"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={`font-['DM_Sans'] text-[14px] bg-transparent border-none cursor-pointer px-0.5 min-w-[20px] text-center transition-colors ${currentPage === p
                ? "font-semibold text-[#281B13]"
                : "font-normal text-[#C5B4A0] hover:text-[#281B13]"
              }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={nextDisabled}
        className={`font-editorial text-[16px] font-normal bg-transparent border-none p-0 ${nextDisabled
            ? "text-[#C5B4A0] cursor-default"
            : "text-[#281B13] cursor-pointer hover:opacity-70"
          }`}
      >
        {ORDER_HISTORY_STRINGS.nextButton}
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

type OrderHistoryProps = {
  onViewDetail: (order: Order) => void;
};

export default function OrderHistory({ onViewDetail }: OrderHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUser();
  
  const rawOrders = user?.orders || [];
  
  // Format any old orders that might have $ to £
  const ordersToDisplay = rawOrders.map(order => ({
    ...order,
    total: order.total?.replace("$", "£") || "",
    tax: order.tax?.replace("$", "£") || "",
    deliveryFee: order.deliveryFee?.replace("$", "£") || "",
    items: order.items.map(item => ({
      ...item,
      price: item.price?.replace("$", "£") || ""
    }))
  }));
  
  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(ordersToDisplay.length / itemsPerPage));
  
  const paginatedOrders = ordersToDisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full md:max-w-[700px] pt-4 md:pt-0">

      {/* Header row: title left | Search by right */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-['DM_Sans'] text-[24px] font-normal text-[#281B13] m-0 leading-tight">
          {ORDER_HISTORY_STRINGS.title}
        </h4>
        <button className="font-editorial text-[13px] text-[#402C1F] border-none bg-transparent cursor-pointer p-0 underline underline-offset-2 hover:opacity-70 transition-opacity">
          Search by
        </button>
      </div>

      {/* Orders */}
      {paginatedOrders.length === 0 ? (
        <p className="font-['DM_Sans'] text-[13px] text-[#281B13] mt-4">
          {ORDER_HISTORY_STRINGS.noOrders}
        </p>
      ) : (
        <div className="flex flex-col">
          {paginatedOrders.map((order, i) => (
            <OrderRow key={order.id || i} order={order} onViewDetail={onViewDetail} />
          ))}
        </div>
      )}

      {/* Pagination — centred on all devices */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
}