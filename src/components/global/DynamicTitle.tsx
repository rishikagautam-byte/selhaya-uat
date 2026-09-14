import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG, PRODUCT_SEO_CONFIG, DEFAULT_PRODUCT_SEO } from '../../config/seo';

const routeTitles: Record<string, string> = {
  '/': SEO_CONFIG.home.title,
  '/login': SEO_CONFIG.login.title,
  '/register': SEO_CONFIG.register.title,
  '/forgot': SEO_CONFIG.forgot.title,
  '/profile': SEO_CONFIG.profile.title,
  '/contact': SEO_CONFIG.contact.title,
  '/the-house-of-selhaya': SEO_CONFIG.house.title,
  '/selhaya-silks': SEO_CONFIG.silks.title,
  '/selhaya-craft': SEO_CONFIG.craft.title,
  '/selhaya-collections': SEO_CONFIG.collections.title,
  '/selhaya-collections/haya': SEO_CONFIG.haya.title,
  '/selhaya-collections/waves-of-light': SEO_CONFIG.wavesOfLight.title,
  '/selhaya-collections/heritage': SEO_CONFIG.heritage.title,
  '/selhaya-collections/rose-of-resilience': SEO_CONFIG.roseOfResilience.title,
  '/bespoke': SEO_CONFIG.bespoke.title,
  '/bespoke/silk-art': SEO_CONFIG.bespoke.title,
  '/bespoke/silk-garment': SEO_CONFIG.bespoke.title,
  '/royal-patronage': SEO_CONFIG.patronage.title,
  '/cultural-salon': SEO_CONFIG.salon.title,
  '/press-and-recognition': SEO_CONFIG.press.title,
  '/cultural-alliance': SEO_CONFIG.alliance.title,
  '/selhaya-legacy': SEO_CONFIG.legacy.title,
  '/advisory': SEO_CONFIG.advisory.title,
  '/journal': SEO_CONFIG.journal.title,
  '/journal/philosophy': SEO_CONFIG.journalPhilosophy.title,
  '/journal/maison-milestones': SEO_CONFIG.journalPhilosophy.title,
  '/journal/couture-and-craft': SEO_CONFIG.coutureAndCraft.title,
  '/journal/the-house-and-collections': SEO_CONFIG.theHouseAndCollections.title,
  '/journal/founder-notes': SEO_CONFIG.founderNotes.title,
  '/cart': SEO_CONFIG.cart.title,
  '/checkout': SEO_CONFIG.checkout.title,
  '/order-confirmation': SEO_CONFIG.orderConfirmation.title,
  '/policies': SEO_CONFIG.policies.title,
};

const routeDescriptions: Record<string, string> = {
  '/': SEO_CONFIG.home.description,
  '/the-house-of-selhaya': SEO_CONFIG.house.description,
  '/selhaya-silks': SEO_CONFIG.silks.description,
  '/selhaya-craft': SEO_CONFIG.craft.description,
  '/selhaya-collections': SEO_CONFIG.collections.description,
  '/selhaya-collections/haya': SEO_CONFIG.haya.description,
  '/selhaya-collections/waves-of-light': SEO_CONFIG.wavesOfLight.description,
  '/selhaya-collections/heritage': SEO_CONFIG.heritage.description,
  '/selhaya-collections/rose-of-resilience': SEO_CONFIG.roseOfResilience.description,
  '/bespoke': SEO_CONFIG.bespoke.description,
  '/bespoke/silk-art': SEO_CONFIG.bespoke.description,
  '/bespoke/silk-garment': SEO_CONFIG.bespoke.description,
  '/royal-patronage': SEO_CONFIG.patronage.description,
  '/cultural-salon': SEO_CONFIG.salon.description,
  '/press-and-recognition': SEO_CONFIG.press.description,
  '/cultural-alliance': SEO_CONFIG.alliance.description,
  '/selhaya-legacy': SEO_CONFIG.legacy.description,
  '/advisory': SEO_CONFIG.advisory.description,
  '/journal': SEO_CONFIG.journal.description,
  '/journal/philosophy': SEO_CONFIG.journalPhilosophy.description,
  '/journal/maison-milestones': SEO_CONFIG.journalPhilosophy.description,
  '/journal/couture-and-craft': SEO_CONFIG.coutureAndCraft.description,
  '/journal/the-house-and-collections': SEO_CONFIG.theHouseAndCollections.description,
  '/journal/founder-notes': SEO_CONFIG.founderNotes.description,
  '/login': SEO_CONFIG.login.description,
  '/register': SEO_CONFIG.register.description,
  '/forgot': SEO_CONFIG.forgot.description,
  '/profile': SEO_CONFIG.profile.description,
  '/contact': SEO_CONFIG.contact.description,
  '/policies': SEO_CONFIG.policies.description,
  '/cart': SEO_CONFIG.cart.description,
  '/checkout': SEO_CONFIG.checkout.description,
  '/order-confirmation': SEO_CONFIG.orderConfirmation.description,
};

const defaultTitle = SEO_CONFIG.home.title;
const defaultDescription = SEO_CONFIG.home.description;

export default function DynamicTitle() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    
    // Check for an exact match first
    let title = routeTitles[pathname];
    let description = routeDescriptions[pathname];
    
    // If no exact match, handle dynamic routes
    if (!title || !description) {
      if (pathname.startsWith('/product/') || pathname.startsWith('/products/')) {
        const parts = pathname.split('/');
        const slug = parts.length > 2 ? parts[2]?.toLowerCase() : '';
        const productSeo = slug ? PRODUCT_SEO_CONFIG[slug] : undefined;

        if (productSeo) {
          if (!title) title = productSeo.title;
          if (!description) description = productSeo.description;
        } else {
          const formattedName = slug
            ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            : 'Product';
          
          if (!title) title = `${formattedName} | SELHAYA®️`;
          if (!description) description = DEFAULT_PRODUCT_SEO.description;
        }
      } else if (pathname.startsWith('/journal/read/')) {
        const parts = pathname.split('/');
        const slug = parts.length > 3 ? parts[3] : '';
        const formattedSlug = slug
          ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          : 'Journal Article';
        
        if (!title) title = `${formattedSlug} | Selhaya Journal`;
        if (!description) description = `Read ${formattedSlug} in the Selhaya Journal. Stories of craft, culture, and creation.`;
      } else if (pathname.startsWith('/journal')) {
        if (!title) title = SEO_CONFIG.journal.title;
        if (!description) description = SEO_CONFIG.journal.description;
      } else if (pathname.startsWith('/policies/')) {
        if (!title) title = SEO_CONFIG.policies.title;
        if (!description) description = SEO_CONFIG.policies.description;
      } else if (pathname.startsWith('/account/reset')) {
        if (!title) title = 'Reset Password | SELHAYA®️';
      } else if (pathname.startsWith('/checkouts/')) {
        if (!title) title = 'Checkout | SELHAYA®️';
      } else {
        if (!title) title = defaultTitle;
        if (!description) description = defaultDescription;
      }
    }

    // Fallback if still missing
    title = title || defaultTitle;
    description = description || defaultDescription;

    // Update Title
    document.title = title;
    
    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

  }, [location]);

  return null;
}
