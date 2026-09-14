import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { Toaster } from "react-hot-toast";

// Core Layout & Contexts (Static Imports)
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import GlobalPageLoader from './components/global/GlobalPageLoader';
import AssetPreloader from './components/global/AssetPreloader';
import ScrollToTop from './components/global/ScrollToTop';
import CookieConsent from './components/global/CookieConsent';
import Breadcrumbs from './components/global/Breadcrumbs';
import DynamicTitle from './components/global/DynamicTitle';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { allSearchProducts } from './data/searchData';
import Search from './components/Search';
import Cart from './features/cartPage/Cart.tsx';
import { preloadProductURLs } from './lib/productURLHelper';
import CulturalAdvisoryPage from './components/CulturalAdvisory/Advisory.tsx';
import Patronage from './components/patronage/Patronage.tsx';
import Salon from './components/salon/Salon.tsx';
import SilkGarment from './components/bespoke/SilkGarment.tsx';
import SilkArt from './components/bespoke/SilkArt.tsx';
// import Bespokes from './components/bespoke/Bespokes.tsx';

// Route Components (Lazy Imports)
const LoginPage = lazy(() => import('./components/Authentication/Login'));
const RegisterPage = lazy(() => import('./components/Authentication/Register'));
const ForgotPage = lazy(() => import('./components/Authentication/Forgot'));
const ResetPage = lazy(() => import('./components/Authentication/Reset'));
const ProfilePage = lazy(() => import("./features/profilePage/ProfilePage"));
const Speak = lazy(() => import('./features/contactPage/Speak.tsx'));
const Partnership = lazy(() => import('./features/contactPage/newForms/Partnership.tsx'));
const Commission = lazy(() => import('./features/contactPage/newForms/Commission.tsx'));
const PressEnquiry = lazy(() => import('./features/contactPage/newForms/PressEnquiry.tsx'));
const SovereignCircle = lazy(() => import('./features/contactPage/newForms/SovereignCircle.tsx'));
const CartPage = lazy(() => import('./features/cartPage/CartPage.tsx'));
const CheckoutPage = lazy(() => import('./features/cartPage/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('./features/cartPage/OrderConfirmationPage'));
const MainProductPage = lazy(() => import('./components/product/MainProductPage'));
const Products = lazy(() => import('./components/product/Products'));
const Alliance = lazy(() => import('./components/culturalAlliance/Alliance'));
const Haya = lazy(() => import('./components/selhaya-edition-haya/Haya').then(m => ({ default: m.Haya })));
const WaveOfLight = lazy(() => import('./components/selhaya-edition-haya/WaveOfLight'));
const Heritiage = lazy(() => import('./components/selhaya-edition-haya/Heritiage'));
const Press = lazy(() => import('./components/Our-journey/Press'));
const SelhyaSilks = lazy(() => import('./components/selhyaSilks/SelhyaSilks'));
const Crafts = lazy(() => import('./components/selhayaCraft/Crafts'));
const PoliciesPage = lazy(() => import('./components/policies/Policies'));
const Hero = lazy(() => import('./components/home/Hero'));
const Legacy = lazy(() => import('./components/legacyTimeline/Legacy.tsx'));
const NotFound = lazy(() => import('./components/NotFound.tsx'));
const Journal = lazy(() => import('./components/journal/Journal.tsx'));
const PhilosophyPage = lazy(() => import('./components/journal/Journal/PhilosophyPage.tsx'));
const CoutureAndCraftPage = lazy(() => import('./components/journal/Journal/CoutureAndCraftPage.tsx'));
const TheHouseAndCollectionsPage = lazy(() => import('./components/journal/Journal/TheHouseAndCollectionsPage.tsx'));
const FounderNotesPage = lazy(() => import('./components/journal/Journal/FounderNotesPage.tsx'));
const ReadJournalPage = lazy(() => import('./components/journal/Journal/ReadJournalPage.tsx'));
const TempProductPage = lazy(() => import('./components/products/TempProductPage.tsx'));
const PinkCollection = lazy(() => import('./components/pinkCollection/PinkCollection.tsx'));
const Maison = lazy(() => import('./components/maison/Maison.tsx'));

function AppRoutes() {
  const location = useLocation();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);

  const hideFooter = ['/partnership', '/commission', '/press-enquiry', '/sovereign-circle', '/join-sovereign-circle'].includes(location.pathname);

  // Preload product URLs on app startup
  useEffect(() => {
    preloadProductURLs().catch(error => {
      console.error('Failed to preload product URLs:', error);
    });
  }, []);

  // Listen for 'openCart' event dispatched by ProductDetails > handleAddToCart
  useEffect(() => {
    const handler = () => setCartDrawerOpen(true);
    window.addEventListener('openCart', handler);
    return () => window.removeEventListener('openCart', handler);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <DynamicTitle />
      <GlobalPageLoader />
      <AssetPreloader />
      <Navbar
        onCartClick={() => setCartDrawerOpen(true)}
        onSearchClick={() => setSearchDrawerOpen(true)}
        isCartOpen={cartDrawerOpen}
      />
      <Breadcrumbs />
      <Cart isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      <Search isOpen={searchDrawerOpen} onClose={() => setSearchDrawerOpen(false)} products={allSearchProducts} />

      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen bg-[#F9F4EE]"></div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot" element={<ForgotPage />} />
            <Route path="/account/reset/:id/:token" element={<ResetPage />} />
            <Route path="/account/reset" element={<ResetPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<Speak />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/commission" element={<Commission />} />
            <Route path="/press-enquiry" element={<PressEnquiry />} />
            <Route path="/sovereign-circle" element={<SovereignCircle />} />

            <Route path="/" element={<Hero />} />
            <Route path="/the-house-of-selhaya" element={<Maison />} />
            <Route path="/selhaya-silks" element={<SelhyaSilks />} />
            <Route path="/selhaya-craft" element={<Crafts />} />
            <Route path="/royal-patronage" element={<Patronage />} />
            <Route path="/cultural-salon" element={<Salon />} />

            <Route path="/selhaya-collections" element={<MainProductPage />} />
            <Route path="/selhaya-collections/haya" element={<Haya />} />
            <Route path="/selhaya-collections/waves-of-light" element={<WaveOfLight />} />
            <Route path="/selhaya-collections/heritage" element={<Heritiage />} />
            <Route path="/selhaya-collections/rose-of-resilience" element={<PinkCollection />} />

            <Route path="/product/:productName" element={<Products />} />
            <Route path="/products/:handle/:encodedGid" element={<Products />} />

            {/* <Route path="/bespoke" element={<Bespokes />} /> */}
            <Route path="/bespoke/silk-art" element={<SilkArt />} />
            <Route path="/bespoke/silk-garment" element={<SilkGarment />} />
            <Route path="/press-and-recognition" element={<Press />} />
            <Route path="/cultural-alliance" element={<Alliance />} />
            <Route path="/selhaya-legacy" element={<Legacy />} />
            <Route path="/advisory" element={<CulturalAdvisoryPage />} />

            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/maison-milestones" element={<PhilosophyPage />} />
            <Route path="/journal/couture-and-craft" element={<CoutureAndCraftPage />} />
            <Route path="/journal/the-house-and-collections" element={<TheHouseAndCollectionsPage />} />
            <Route path="/journal/founder-notes" element={<FounderNotesPage />} />
            <Route path="/journal/read/:slug" element={<ReadJournalPage />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkouts/cn/:token/:locale" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/policies/:tabId" element={<PoliciesPage />} />
            <Route path="*" element={<NotFound />} />

            {/* temp Routes */}
            <Route path="/test-product" element={<TempProductPage />} />
          </Routes>
        </Suspense>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ReactLenis root options={{ autoRaf: true }}>
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          duration: 7000,
          style: {
            background: "#F7F2EA",
            color: "#281B13",
            border: "1px solid rgba(0,0,0,0.08)",
            padding: "14px 18px",
            fontSize: "16px",
            borderRadius: "0px",
            boxShadow: "0 4px 30px rgba(0,0,0,0.04)",
            letterSpacing: "0.02em",
          },

          success: {
            iconTheme: {
              primary: "#281B13",
              secondary: "#F7F2EA",
            },
          },

          error: {
            iconTheme: {
              primary: "#281B13",
              secondary: "#F7F2EA",
            },
          },
        }}
      />
      <UserProvider>
        <FavoritesProvider>
          <CartProvider>
            <ScrollToTop />
            <CookieConsent />
            <AppRoutes />
          </CartProvider>
        </FavoritesProvider>
      </UserProvider>
    </ReactLenis>
  );
}