import { useEffect } from 'react';
import { allProducts } from '../../lib/productImages';

const CRITICAL_ASSETS = [
  "/images/home/hero.png",
  "/images/home/resilence.jpg",
  "/images/home/haya.png",
  "/images/home/waves.jpg",
  "/images/home/heritage.png",
  "/images/home/garment.png",
  "/images/home/presence.png",
];

export default function AssetPreloader() {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const startPreloading = () => {
      // 1. Preload critical background/hero images
      CRITICAL_ASSETS.forEach(url => {
        const img = new Image();
        img.src = url;
      });

      // 2. Preload all primary product images used across the site
      allProducts.forEach(product => {
        if (product.image) {
          const img = new Image();
          img.src = product.image;
        }
      });

      // 3. Silently prefetch JS chunks for major routes so they open instantly
      // We wrap in try-catch to silently ignore any chunk load errors
      try {
        import('../home/Hero.tsx');
        import('../product/MainProductPage');
        import('../product/Products');
        import('../../features/cartPage/CartPage');
        import('../../features/cartPage/CheckoutPage');
        import('../Authentication/Login');
        import('../Authentication/Register');
      } catch (e) {
        // ignore dynamic import errors during prefetch
      }
    };

    // Delay preloading until the main page is fully loaded and idle
    // This ensures we don't steal bandwidth from the initial render
    if (document.readyState === 'complete') {
      if ('requestIdleCallback' in window) {
        // @ts-ignore
        requestIdleCallback(() => {
          timeoutId = setTimeout(startPreloading, 1000);
        });
      } else {
        timeoutId = setTimeout(startPreloading, 2000);
      }
    } else {
      const handleLoad = () => {
        timeoutId = setTimeout(startPreloading, 2000);
      };
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timeoutId);
      };
    }

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
