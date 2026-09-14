// OrderDetail.tsx

import { ORDER_DETAIL_STRINGS } from "./orderDetailStrings";

type TrackingStep = {
  date: string;
  time: string;
  status: string;
  location: string;
  active?: boolean;
};

type OrderProduct = {
  image: string;
  name: string;
  ref: string;
  qty: number;
  size: string;
  price: string;
};

type OrderDetailData = {
  trackingId: string;
  status: string;
  lastUpdated: string;
  trackingHistory: TrackingStep[];
  customerName: string;
  contactInfo: string;
  deliveryAddress: string;
  seller: string;
  sellerEmail: string;
  billingAddress: string;
  paymentStatus: string;
  products: OrderProduct[];
  total: string;
  tax: string;
  deliveryFee: string;
  totalAmount: string;
  paidBy: string;
  shopifyId?: string | number | null;
};

// Sample data — replace with real props/API data
const sampleDetail: OrderDetailData = {
  trackingId: "SLY8263636363",
  status: "Shipped",
  lastUpdated: "12 Nov 2025",
  trackingHistory: [
    {
      date: "12 Nov 2025",
      time: "At 2:30 PM",
      status: "Shipped",
      location: "At UK",
      active: true,
    },
    {
      date: "10 Nov 2025",
      time: "At 5:30 PM",
      status: "Order Picked up",
      location: "from UK",
      active: false,
    },
    {
      date: "9 Nov 2025",
      time: "At 1:00 PM",
      status: "Order Received",
      location: "All India",
      active: false,
    },
  ],
  customerName: "Miss. Anisha Younis",
  contactInfo: "+000000000",
  deliveryAddress:
    "Miss. Anisha Younis 5 Bond St PE38et Boston United Kingdom Tel: +448972363636636",
  seller: "Selhaya",
  sellerEmail: "Support@selhaya",
  billingAddress:
    "Miss. Anisha Younis 5 Bond St PE38et Boston United Kingdom Tel: +448972363636636",
  paymentStatus: "Paid by paypal",
  products: [
    {
      image: "/images/yaqeen.png",
      name: "The Yaqeen Abaya",
      ref: "SLY8263636363138",
      qty: 1,
      size: "S",
      price: "+ $14,000.00",
    },
    {
      image: "/images/sharifa.png",
      name: "Sharifa cut",
      ref: "SLY8263636363138",
      qty: 1,
      size: "S",
      price: "+ $5,000.00",
    },
    {
      image: "/images/safa.png",
      name: "Safa Bloom",
      ref: "SLY8263636363138",
      qty: 1,
      size: "S",
      price: "+ $6,000.00",
    },
  ],
  total: "$21,000.00",
  tax: "$100.00",
  deliveryFee: "Free",
  totalAmount: "$21,000.00",
  paidBy: "Paid by paypal",
};

type Props = {
  onBack?: () => void;
  data?: OrderDetailData;
};

import { useEffect, useState } from "react";
import { fetchShopifyOrder } from "../../data/shopifyAdmin";

export default function OrderDetail({ onBack, data = sampleDetail }: Props) {
  const [liveData, setLiveData] = useState<OrderDetailData>(data);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadLiveOrder() {
      if (!liveData.shopifyId) return;
      setIsLoading(true);
      try {
        const shopifyOrder = await fetchShopifyOrder(liveData.shopifyId);
        if (shopifyOrder) {
          let newStatus = shopifyOrder.fulfillment_status === 'fulfilled' ? 'Shipped' : 'Processing';
          let trackingId = liveData.trackingId;
          
          const fulfillment = shopifyOrder.fulfillments?.[0];
          if (fulfillment?.tracking_number) {
            trackingId = fulfillment.tracking_number;
          }

          const orderDate = new Date(shopifyOrder.created_at).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' });
          
          let history: TrackingStep[] = [
            { date: orderDate, time: "Earlier", status: "Order Received", location: "Confirmed", active: newStatus === "Processing" }
          ];

          if (newStatus === "Processing") {
            history.push({ date: "Pending", time: "-", status: "Order Picked up", location: "Pending", active: false });
            history.push({ date: "Pending", time: "-", status: "Shipped", location: "Pending", active: false });
          } else if (newStatus === "Shipped") {
            history.push({ date: orderDate, time: "Earlier", status: "Order Picked up", location: "Warehouse", active: false });
            const shipDate = fulfillment?.created_at 
              ? new Date(fulfillment.created_at).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })
              : orderDate;
            history.push({ 
              date: shipDate, 
              time: "Just now", 
              status: "Shipped", 
              location: fulfillment?.tracking_company || "In Transit", 
              active: true 
            });
          }
          
          setLiveData(prev => ({
            ...prev,
            status: newStatus,
            trackingId: trackingId,
            trackingHistory: history,
          }));
        }
      } catch (e) {
        console.error("Failed to load live shopify order", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadLiveOrder();
  }, [liveData]);

  return (
    <div className="w-full max-w-[700px] relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-[#281B13] border-t-transparent rounded-full animate-spin" />
        </div>
      )}


      {/* Page Title */}
      <h2 className="font-editorial text-[16px] text-[#281B13] font-normal mb-6 leading-none">
        {ORDER_DETAIL_STRINGS.pageTitle}
      </h2>

      {/* ── Card 1: Status + Tracking History ── */}
      <div className="border border-[#E4DDCB] rounded-sm bg-[#F9F4EE] mb-3 overflow-hidden">

        {/* Status Header */}
        <div className="flex justify-between items-start px-5 py-4 border-b border-[#E4DDCB]">
          <div>
            <p className="font-dm-sans text-[12px] text-[#C5B4A0] mb-1 font-normal">
              {ORDER_DETAIL_STRINGS.orderStatusLabel}
            </p>
            <p className="font-editorial text-[16px] text-[#281B13] font-normal leading-none">
              {liveData.status}
            </p>
          </div>
          <div className="text-right">
            <p className="font-dm-sans text-[12px] text-[#C5B4A0] mb-1 font-normal">
              {ORDER_DETAIL_STRINGS.trackingIdLabel} #{liveData.trackingId}
            </p>
            <p className="font-dm-sans text-[12px] text-[#C5B4A0] font-normal">
              {ORDER_DETAIL_STRINGS.lastUpdatedLabel} {liveData.lastUpdated}
            </p>
          </div>
        </div>

        {/* Tracking History */}
        <div className="px-5 py-4">
          <p className="font-dm-sans text-[13px] text-[#281B13] font-semibold mb-4">
            {ORDER_DETAIL_STRINGS.trackingHistoryLabel}
          </p>

          <div className="flex flex-col gap-0 relative">
            {liveData.trackingHistory.map((step, i) => (
              <div key={i} className="flex items-start gap-4 relative">

                {/* Date + Time */}
                <div className="min-w-[100px] pt-0.5">
                  <p className="font-dm-sans text-[12px] text-[#281B13] font-medium leading-tight">
                    {step.date}
                  </p>
                  <p className="font-dm-sans text-[11px] text-[#C5B4A0] font-normal">
                    {step.time}
                  </p>
                </div>

                {/* Timeline dot + line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-1 z-10 ${step.active
                      ? "bg-[#281B13] border-[#281B13]"
                      : "bg-[#F9F4EE] border-[#C5B4A0]"
                      }`}
                  />
                  {i < liveData.trackingHistory.length - 1 && (
                    <div className="w-px flex-1 bg-[#E4DDCB] min-h-[32px]" />
                  )}
                </div>

                {/* Status + Location */}
                <div className="pb-6">
                  <p className="font-dm-sans text-[13px] text-[#281B13] font-medium leading-tight">
                    {step.status}
                  </p>
                  <p className="font-dm-sans text-[12px] text-[#C5B4A0] font-normal">
                    {step.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Card 2: Customer + Seller Info ── */}
      <div className="border border-[#E4DDCB] rounded-sm bg-[#F9F4EE] mb-3 px-5 py-4">
        <div className="flex gap-8">

          {/* Left: Customer */}
          <div className="flex-1">
            <p className="font-dm-sans text-[12px] text-[#C5B4A0] font-normal mb-1">
              {ORDER_DETAIL_STRINGS.customerNameLabel}
            </p>
            <p className="font-dm-sans text-[13px] text-[#281B13] font-semibold mb-3">
              {liveData.customerName}
            </p>

            <p className="font-dm-sans text-[12px] text-[#C5B4A0] font-normal mb-1">
              {ORDER_DETAIL_STRINGS.contactInfoLabel}
            </p>
            <p className="font-dm-sans text-[13px] text-[#281B13] font-medium mb-3">
              {liveData.contactInfo}
            </p>

            <p className="font-dm-sans text-[12px] text-[#C5B4A0] font-normal mb-1">
              {ORDER_DETAIL_STRINGS.deliveryAddressLabel}
            </p>
            <p className="font-dm-sans text-[13px] text-[#281B13] font-medium leading-snug">
              {liveData.deliveryAddress}
            </p>
          </div>

          {/* Right: Seller */}
          <div className="min-w-[140px]">
            <p className="font-dm-sans text-[12px] text-[#C5B4A0] font-normal mb-1">
              {ORDER_DETAIL_STRINGS.sellerLabel}
            </p>
            <p className="font-dm-sans text-[13px] text-[#281B13] font-semibold mb-2">
              {liveData.seller}
            </p>
            <p className="font-dm-sans text-[13px] text-[#281B13] font-medium">
              {liveData.sellerEmail}
            </p>
          </div>
        </div>
      </div>

      {/* ── Card 3: Payment History ── */}
      <div className="border border-[#E4DDCB] rounded-sm bg-[#F9F4EE] mb-3 px-5 py-4">
        <p className="font-dm-sans text-[13px] text-[#281B13] font-semibold mb-3">
          {ORDER_DETAIL_STRINGS.paymentHistoryLabel}
        </p>
        <div className="flex gap-8">
          <div className="flex-1">
            <p className="font-dm-sans text-[12px] text-[#C5B4A0] font-normal mb-1">
              {ORDER_DETAIL_STRINGS.billingAddressLabel}
            </p>
            <p className="font-dm-sans text-[13px] text-[#281B13] font-medium leading-snug">
              {liveData.billingAddress}
            </p>
          </div>
          <div className="min-w-[140px]">
            <p className="font-dm-sans text-[12px] text-[#C5B4A0] font-normal mb-1">
              {ORDER_DETAIL_STRINGS.paymentStatusLabel}
            </p>
            <p className="font-dm-sans text-[13px] text-[#281B13] font-medium">
              {liveData.paymentStatus}
            </p>
          </div>
        </div>
      </div>

      {/* ── Product List ── */}
      <div className="flex flex-col gap-0 mb-1">
        {liveData.products.map((product, i) => (
          <div
            key={i}
            className="flex items-center gap-4 py-4 border-b border-[#E4DDCB]"
          >
            {/* Product Image */}
            <div className="w-[52px] h-[64px] bg-[#E4DDCB] rounded-sm overflow-hidden flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <p className="font-dm-sans text-[13px] text-[#281B13] font-semibold leading-tight mb-0.5">
                {product.name}
              </p>
              <p className="font-dm-sans text-[11px] text-[#C5B4A0] font-normal">
                {ORDER_DETAIL_STRINGS.refLabel} {product.ref}
              </p>
              <p className="font-dm-sans text-[11px] text-[#C5B4A0] font-normal">
                {ORDER_DETAIL_STRINGS.qtyLabel} {product.qty} &nbsp;
                {ORDER_DETAIL_STRINGS.sizeLabel} {product.size}
              </p>
            </div>

            {/* Price */}
            <p className="font-dm-sans text-[14px] text-[#281B13] font-medium whitespace-nowrap">
              {product.price}
            </p>
          </div>
        ))}
      </div>

      {/* ── Order Summary ── */}
      <div className="flex flex-col pt-2 pb-4 border-b border-[#E4DDCB]">
        <div className="flex justify-between items-center py-2">
          <span className="font-dm-sans text-[13px] text-[#281B13] font-medium">
            {ORDER_DETAIL_STRINGS.totalLabel}
          </span>
          <span className="font-dm-sans text-[13px] text-[#281B13] font-medium">
            {liveData.total}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="font-dm-sans text-[13px] text-[#281B13] font-medium">
            {ORDER_DETAIL_STRINGS.taxLabel}
          </span>
          <span className="font-dm-sans text-[13px] text-[#281B13] font-medium">
            {liveData.tax}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="font-dm-sans text-[13px] text-[#281B13] font-medium">
            {ORDER_DETAIL_STRINGS.deliveryFeeLabel}
          </span>
          <span className="font-dm-sans text-[13px] text-[#281B13] font-medium">
            {liveData.deliveryFee}
          </span>
        </div>
      </div>

      {/* Total Amount */}
      <div className="flex justify-between items-start pt-4 pb-2">
        <span className="font-editorial text-[16px] text-[#281B13] font-normal">
          {ORDER_DETAIL_STRINGS.totalAmountLabel}
        </span>
        <div className="text-right">
          <p className="font-editorial text-[16px] text-[#281B13] font-normal leading-tight">
            {liveData.totalAmount}
          </p>
          <p className="font-dm-sans text-[12px] text-[#C5B4A0] font-normal mt-0.5">
            {liveData.paidBy}
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center items-center py-6 border-t border-[#E4DDCB] mt-4">
        <button
          onClick={onBack}
          className="font-dm-sans text-[13px] text-[#281B13] font-medium flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
        >
          <span className="tracking-[-1px]">←——</span>
          {ORDER_DETAIL_STRINGS.backButton}
        </button>
      </div>

    </div>
  );
}