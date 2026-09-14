import { allProducts } from "../lib/productImages";
import type { SearchProduct } from "../components/Search";

export const allSearchProducts: SearchProduct[] = allProducts.map((p) => ({
  id: `product-${p.slug}`,
  name: p.name,
  image: p.image,
  href: `/product/${p.slug}`,
}));

