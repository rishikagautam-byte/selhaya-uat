import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Resilience from "../../features/productPage/Resilience";
import { productPagesData } from "../../features/productPage/productPagesData";
import ProductDetails from "../../features/product/ProductDetails";

import Discover, { type CollectionName } from "../../features/hayaPage/Discover";
import { getProductURLFromCache, generateProductLinkURL } from "../../lib/productURLHelper";
import { ALL_PRODUCT_HANDLES } from "../../lib/productConfig";
import SEO from "../SEO";
import { PRODUCT_SEO_CONFIG, DEFAULT_PRODUCT_SEO } from "../../config/seo";

// Wave of Light and Yaqeen product slugs — these get a landscape hero first row
const LANDSCAPE_HERO_SLUGS = new Set([
  "amara-flame", "amara",
  "sabi",
  "ziya-blue", "ziya",
  "sakura",
  "rina-lemon", "rina",
  "yaqeen",
]);

// Map product slugs to their parent collection — used to exclude that collection from Discover
const SLUG_TO_COLLECTION: Record<string, CollectionName> = {
  // Haya products
  "malika-drape": "Haya", "malika": "Haya",
  "sharifa-cut": "Haya", "sharifa": "Haya",
  "safa-bloom": "Haya", "safa": "Haya",
  "noor-flow": "Haya", "noor": "Haya",
  // Heritage products
  "yaqeen": "Heritage",
  // Waves of Light products
  "amara-flame": "Waves of Light", "amara": "Waves of Light",
  "sabi": "Waves of Light",
  "ziya-blue": "Waves of Light", "ziya": "Waves of Light",
  "sakura": "Waves of Light",
  "rina-lemon": "Waves of Light", "rina": "Waves of Light",
  // Rose of Resilience products
  "clara": "Rose of Resilience",
  "farhana": "Rose of Resilience",
  "halime": "Rose of Resilience",
  "seraphina": "Rose of Resilience",
  "tatiana": "Rose of Resilience",
};

const Products: React.FC = () => {
  const params = useParams<{ productName?: string; handle?: string; encodedGid?: string }>();
  const navigate = useNavigate();

  // Support both old and new URL formats
  const slug = (params.handle || params.productName)?.toLowerCase().replace(/\s+/g, '-');
  const items = slug ? productPagesData[slug] : undefined;
  const useLandscape = slug ? LANDSCAPE_HERO_SLUGS.has(slug) : false;

  // Which collection to hide from Discover (current product's collection)
  const excludeCollection: CollectionName | undefined = slug ? SLUG_TO_COLLECTION[slug] : undefined;

  // Auto-redirect old URLs to new Shopify format
  useEffect(() => {
    let isMounted = true;
    // Check if using old format (has productName but no encodedGid)
    if (params.productName && !params.encodedGid && slug) {
      // Check if this is one of our products
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (ALL_PRODUCT_HANDLES.includes(slug as any)) {
        // First try cache
        const cachedUrl = getProductURLFromCache(slug);
        if (cachedUrl) {
          // URL cached, redirect to new format
          if (isMounted) navigate(cachedUrl, { replace: true });
        } else {
          // Not in cache, try to fetch async
          generateProductLinkURL(slug).then((url) => {
            if (url && isMounted) {
              navigate(url, { replace: true });
            }
          }).catch((err) => {
            console.error('Failed to redirect to Shopify URL:', err);
            // Keep current page if redirect fails
          });
        }
      }
    }
    return () => { isMounted = false; };
  }, [params.productName, params.encodedGid, slug, navigate]);

  const productSeo = slug ? PRODUCT_SEO_CONFIG[slug] : undefined;
  const seoTitle = productSeo?.title || (items?.[0]?.title ? `${items[0].title} | SELHAYA®️` : "Pure Silk Couture | SELHAYA®️");
  const seoDescription = productSeo?.description || DEFAULT_PRODUCT_SEO.description;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={slug ? `/product/${slug}` : undefined}
        type="product"
        image={items?.[0]?.mainImageSrc}
      />
      <main className="w-full">
      {items ? (
        <>
          <Resilience
            data={items}
            isClickable={false}
            specialSecondRowRightBg="#B9A789"
            isProductPage={true}
            landscapeFirstRow={useLandscape}
            productSlug={slug}
          />
        </>
      ) : null}
      
      <ProductDetails productName={slug} productItem={items?.[0]} encodedGid={params.encodedGid} />

      <Discover exclude={excludeCollection} />
    </main>
  </>
  );
};

export default Products;
