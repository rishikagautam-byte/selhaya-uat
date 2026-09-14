import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
}

const SITE_URL = "https://selhaya.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/home/hero.png`;

function setMeta(
  attribute: "name" | "property",
  key: string,
  content: string
) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(url: string) {
  let element = document.head.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", url);
}

export default function SEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    setMeta("name", "description", description);

    setMeta(
      "name",
      "robots",
      noindex
        ? "noindex,nofollow"
        : "index,follow,max-image-preview:large"
    );

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", image);
    setMeta(
      "property",
      "og:url",
      canonical ? `${SITE_URL}${canonical}` : window.location.href
    );

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    // Canonical
    setCanonical(
      canonical
        ? `${SITE_URL}${canonical}`
        : window.location.href
    );
  }, [
    title,
    description,
    canonical,
    image,
    type,
    noindex,
  ]);

  return null;
}