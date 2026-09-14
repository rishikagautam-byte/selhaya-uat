// ProfilePage.tsx

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { PROFILE_STRINGS } from "./profileData.tsx";
import type { SidebarTab } from "./profileData.tsx";
import PersonalInfo from "./PersonalInfo";
import OrderDetail from "./OrderDetail";
import OrderHistory from "./OrderHistory";
import { getOrderDetailData } from "./orderData";
import type { Order } from "./orderData";
import ViewHistory from "./ViewHistory";
import ViewFavorites from "./ViewFavorites";
import SEO from "../../components/SEO";
import { SEO_CONFIG } from "../../config/seo";

const NAV_ITEMS: { id: SidebarTab; label: string }[] = [
  { id: "personal", label: PROFILE_STRINGS.sidebarPersonal },
  { id: "orders", label: PROFILE_STRINGS.sidebarOrders },
  { id: "history", label: PROFILE_STRINGS.sidebarHistory },
  { id: "favorites", label: PROFILE_STRINGS.sidebarFavorites },
];

function renderPanel(
  tab: SidebarTab,
  selectedOrder: Order | null,
  onViewDetail: (order: Order) => void,
  onBack: () => void
) {
  switch (tab) {
    case "personal":
      return <PersonalInfo />;
    case "orders": {
      if (!selectedOrder) return <OrderHistory onViewDetail={onViewDetail} />;
      const orderDetail = getOrderDetailData(selectedOrder);
      return orderDetail ? (
        <OrderDetail onBack={onBack} data={orderDetail} />
      ) : (
        <OrderHistory onViewDetail={onViewDetail} />
      );
    }
    case "history":
      return <ViewHistory />;
    case "favorites":
      return <ViewFavorites />;
  }
}

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState<SidebarTab>(location.state?.tab || "personal");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!isLoading && !user?.isAuthenticated) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (activeTab !== "orders") setSelectedOrder(null);
  }, [activeTab]);

  const handlePageChange = (order: Order) => setSelectedOrder(order);
  const handleBack = () => setSelectedOrder(null);

  return (
    <>
      <SEO
        title={SEO_CONFIG.profile.title}
        description={SEO_CONFIG.profile.description}
        canonical={SEO_CONFIG.profile.canonical}
        noindex={SEO_CONFIG.profile.noindex}
      />
      <div className="min-h-screen bg-[#F9F4EE]">

      {/* ══════════════════════════════════════════
          MOBILE  (hidden on md+)
          px-8 matches navbar px-8
          pt-28 clears fixed navbar h-24
      ══════════════════════════════════════════ */}
      <div className="md:hidden px-8 pt-28 pb-16">

        {/* Breadcrumb */}
        <p className="text-[11px] tracking-widest text-[#C5B4A0] mb-3 font-['DM_Sans'] m-0">
          <span>{PROFILE_STRINGS.breadcrumbHome}</span>
          <span className="mx-1"> / </span>
          <span className="text-[#402C1F] font-semibold">
            {PROFILE_STRINGS.breadcrumbProfile}
          </span>
        </p>

        {/* Page title */}
        <h2 className="font-editorial font-normal leading-tight tracking-tight text-[#402C1F] mt-3 mb-5" style={{ fontSize: "clamp(28px, 8vw, 40px)" }}>
          {PROFILE_STRINGS.pageTitle}
        </h2>

        {/* Nav links */}
        <nav className="flex flex-col mb-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left bg-transparent border-none py-2 px-0 text-[13px] font-['DM_Sans'] tracking-tight cursor-pointer transition-colors ${activeTab === item.id
                  ? "text-[#402C1F] font-semibold"
                  : "text-[#C5B4A0]"
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Panel — full width */}
        <main className="w-full">
          {renderPanel(activeTab, selectedOrder, handlePageChange, handleBack)}
        </main>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP  (hidden below md)
          matches original desktop layout exactly
      ══════════════════════════════════════════ */}
      <div className="hidden md:block px-25 py-24">

        {/* Breadcrumb */}
        <p className="text-[12px] tracking-widest text-[#C5B4A0] mb-3">
          <span>{PROFILE_STRINGS.breadcrumbHome}</span>
          <span className="mx-1"> / </span>
          <span className="text-[#402C1F]">{PROFILE_STRINGS.breadcrumbProfile}</span>
        </p>

        {/* Sidebar + Panel */}
        <div className="flex gap-12 items-start mt-[20px]">

          {/* Left sidebar */}
          <aside className="w-[300px] flex-shrink-0 flex flex-col bg-[#F9F4EE]">
            <h1 className="font-editorial text-[36px] font-normal leading-tight tracking-tight text-[#402C1F] mb-8 mt-0 whitespace-nowrap">
              {PROFILE_STRINGS.pageTitle}
            </h1>

            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left bg-none border-none py-2.5 px-0 text-[13px] tracking-tight cursor-pointer transition-colors ${activeTab === item.id
                    ? "text-[#402C1F] font-semibold"
                    : "text-[#C5B4A0] hover:text-[#402C1F]"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </aside>

          {/* Right panel */}
          <main className="flex-1 min-w-0 pt-[88px]">
            {renderPanel(activeTab, selectedOrder, handlePageChange, handleBack)}
          </main>
        </div>
      </div>

    </div>
  </>
  );
}