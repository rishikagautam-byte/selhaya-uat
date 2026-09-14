/**
 * WordPress REST API service for fetching journal articles.
 * Base: https://wp.selhaya.com/wp-json/wp/v2/
 */

import type { JournalArticle, JournalSection } from "./journalData";

const WP_BASE =
    (import.meta.env.VITE_WORDPRESS_API_URL as string) ||
    "https://wp.selhaya.com/wp-json/wp/v2";

/**
 * Maps the React route‑slug for each category to its expected
 * WordPress category slug.  These must match the slugs created
 * in wp‑admin → Posts → Categories.
 */
export const CATEGORY_ROUTE_TO_WP_SLUG: Record<string, string> = {
    "maison-milestones": "philosophy-of-selhaya",
    "couture-and-craft": "couture-and-craft",
    "the-house-and-collections": "the-house-and-collections",
    "founder-notes": "founder-notes",
};

/** Reverse map: WP category slug → display name used in the UI */
export const WP_SLUG_TO_DISPLAY_NAME: Record<string, string> = {
    "philosophy-of-selhaya": "Maison milestones",
    "couture-and-craft": "Couture & Craft",
    "the-house-and-collections": "The House & Collections",
    "founder-notes": "Founder Notes",
};

/** Reverse map: WP category slug → React route slug */
export const WP_SLUG_TO_ROUTE: Record<string, string> = {
    "philosophy-of-selhaya": "maison-milestones",
    "couture-and-craft": "couture-and-craft",
    "the-house-and-collections": "the-house-and-collections",
    "founder-notes": "founder-notes",
};

// ── WP response types ──────────────────────────────────────────────────
export interface WPCategory {
    id: number;
    name: string;
    slug: string;
    count: number;
}
//prese & recog
export interface PressArticle {
    id: number;
    title: string;
    image: string;
    date: string;
    externalUrl: string;
}
//prese & recog
export interface PublicationItem {
    id: number;
    image: string;
    externalUrl: string;
    title: string;
}

export interface WPPost {
    id: number;
    date: string;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    featured_media: number;
    featured_media_src_url?: string; // plugin‑provided shortcut
    categories: number[];
    _embedded?: {
        "wp:featuredmedia"?: Array<{
            source_url: string;
            media_details?: {
                sizes?: {
                    medium_large?: { source_url: string };
                    large?: { source_url: string };
                    full?: { source_url: string };
                };
            };
        }>;
        "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
    };
    // for press and recog. external link 
    acf?: {
        external_url?: string;
        display_date?: string;
        hero_title?: string;
    };
}


// ── In‑memory cache ────────────────────────────────────────────────────
const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
    const entry = cache.get(key);
    if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data as T;
    return null;
}

function setCache(key: string, data: unknown) {
    cache.set(key, { data, ts: Date.now() });
}

// ── Fetcher ────────────────────────────────────────────────────────────
async function wpFetch<T>(path: string): Promise<T> {
    const res = await fetch(`${WP_BASE}${path}`);
    if (!res.ok) throw new Error(`WP API ${res.status}: ${res.statusText}`);
    return res.json() as Promise<T>;
}

// ── Category helpers ───────────────────────────────────────────────────
let categoryMap: Map<string, number> | null = null;

/** Fetches WP categories and builds a slug→id map (cached). */
export async function getCategoryMap(): Promise<Map<string, number>> {
    if (categoryMap) return categoryMap;

    const cached = getCached<Map<string, number>>("categories");
    if (cached) {
        categoryMap = cached;
        return cached;
    }

    const cats = await wpFetch<WPCategory[]>("/categories?per_page=100");
    const map = new Map<string, number>();
    cats.forEach((c) => map.set(c.slug, c.id));
    categoryMap = map;
    setCache("categories", map);
    return map;
}

// ── Featured‑image resolution ──────────────────────────────────────────
function extractFeaturedImage(post: WPPost): string {
    // 1) plugin shortcut
    if (post.featured_media_src_url) return post.featured_media_src_url;

    // 2) _embed data
    const media = post._embedded?.["wp:featuredmedia"]?.[0];
    if (media) {
        const sizes = media.media_details?.sizes;
        return (
            sizes?.large?.source_url ??
            sizes?.medium_large?.source_url ??
            sizes?.full?.source_url ??
            media.source_url
        );
    }

    // 3) fallback placeholder
    return "/images/journal/philosophy.png";
}

// ── HTML → section parser ──────────────────────────────────────────────
/**
 * Parses WP block‑editor HTML into the JournalSection[] shape
 * expected by ReadJournalPage.  This keeps backward compatibility
 * while also supporting the raw‑HTML rendering path.
 */
function parseContentToSections(html: string): JournalSection[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const nodes = Array.from(doc.body.childNodes);

    const sections: JournalSection[] = [];
    let currentHeading: string | undefined;
    let currentParagraphs: string[] = [];

    const flush = () => {
        if (currentParagraphs.length > 0) {
            sections.push({
                heading: currentHeading,
                paragraph: currentParagraphs.join("\n\n"),
            });
            currentHeading = undefined;
            currentParagraphs = [];
        }
    };

    for (const node of nodes) {
        if (!(node instanceof HTMLElement)) continue;
        const tag = node.tagName.toLowerCase();

        if (tag === "h2" || tag === "h3") {
            flush();
            currentHeading = node.textContent?.trim() || undefined;
        } else if (tag === "p") {
            const text = node.textContent?.trim();
            if (text) currentParagraphs.push(text);
        } else if (tag === "blockquote") {
            const text = node.textContent?.trim();
            if (text) currentParagraphs.push(`"${text}"`);
        }
    }
    flush();

    return sections;
}

// ── Decode HTML entities ───────────────────────────────────────────────
function decodeHtml(html: string): string {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// ── Strip HTML tags (for excerpt) ──────────────────────────────────────
function stripHtml(html: string): string {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

// ── Transform WPPost → JournalArticle ──────────────────────────────────
function toJournalArticle(post: WPPost): JournalArticle {
    // Resolve the category display‑name
    const catTerms = post._embedded?.["wp:term"]?.[0];
    const wpCatSlug = catTerms?.[0]?.slug;
    const categoryName =
        (wpCatSlug && WP_SLUG_TO_DISPLAY_NAME[wpCatSlug]) ??
        catTerms?.[0]?.name ??
        "Uncategorized";

    const featuredImage = extractFeaturedImage(post);
    const title = decodeHtml(post.title.rendered);
    const excerpt = stripHtml(post.excerpt.rendered).trim();
    const heroTitle = post.acf?.hero_title ? decodeHtml(post.acf.hero_title) : title;

    // Format date nicely
    const dateObj = new Date(post.date);
    const dateStr = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return {
        slug: post.slug,
        title,
        category: categoryName,
        date: dateStr,
        image: featuredImage,
        heroImage: featuredImage,
        heroTitle: heroTitle,
        description: excerpt || title,
        sections: parseContentToSections(post.content.rendered),
        // Keep the raw HTML so ReadJournalPage can render it directly
        contentHtml: post.content.rendered,
    };
}

// ── Public API ─────────────────────────────────────────────────────────

/** Fetch all journal posts (optionally limited). */
export async function fetchAllPosts(
    perPage = 100
): Promise<JournalArticle[]> {
    const cacheKey = `all-posts-${perPage}`;
    const cached = getCached<JournalArticle[]>(cacheKey);
    if (cached) return cached;

    const posts = await wpFetch<WPPost[]>(
        `/posts?per_page=${perPage}&_embed&orderby=date&order=desc`
    );
    const articles = posts.map(toJournalArticle);
    setCache(cacheKey, articles);
    return articles;
}

/** Fetch posts for a specific WP category slug. */
export async function fetchPostsByCategory(
    wpCategorySlug: string
): Promise<JournalArticle[]> {
    const cacheKey = `cat-${wpCategorySlug}`;
    const cached = getCached<JournalArticle[]>(cacheKey);
    if (cached) return cached;

    const catMap = await getCategoryMap();
    const catId = catMap.get(wpCategorySlug);

    if (!catId) {
        console.warn(`WP category "${wpCategorySlug}" not found. Returning [].`);
        return [];
    }

    const posts = await wpFetch<WPPost[]>(
        `/posts?categories=${catId}&per_page=100&_embed&orderby=date&order=desc`
    );
    const articles = posts.map(toJournalArticle);
    setCache(cacheKey, articles);
    return articles;
}

/** Fetch a single post by its slug. */
export async function fetchPostBySlug(
    slug: string
): Promise<JournalArticle | null> {
    const cacheKey = `post-${slug}`;
    const cached = getCached<JournalArticle | null>(cacheKey);
    if (cached !== null) return cached;

    const posts = await wpFetch<WPPost[]>(
        `/posts?slug=${encodeURIComponent(slug)}&_embed`
    );
    if (posts.length === 0) return null;

    const article = toJournalArticle(posts[0]);
    setCache(cacheKey, article);
    return article;
}

//prese & recog
export async function fetchPressPosts(): Promise<PressArticle[]> {
    const catMap = await getCategoryMap();

    const pressCategoryId = catMap.get("press-and-recognition");

    if (!pressCategoryId) {
        console.warn("Press category not found");
        return [];
    }

    const posts = await wpFetch<WPPost[]>(
        `/posts?categories=${pressCategoryId}&per_page=100&_embed&orderby=date&order=desc`
    );

    return posts.map((post) => ({
        id: post.id,
        title: decodeHtml(post.title.rendered),
        image: extractFeaturedImage(post),
        date:
            post.acf?.display_date ||
            new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            }),
        externalUrl: post.acf?.external_url || "#",
    }));
}

export async function fetchPublications(): Promise<PublicationItem[]> {
    const catMap = await getCategoryMap();

    const categoryId = catMap.get("published-reflections");

    if (!categoryId) return [];

    const posts = await wpFetch<WPPost[]>(
        `/posts?categories=${categoryId}&per_page=100&_embed&orderby=date&order=desc`
    );

    return posts.map((post) => ({
        id: post.id,
        title: decodeHtml(post.title.rendered),
        image: extractFeaturedImage(post),
        externalUrl: post.acf?.external_url || "#",
    }));
}

// ── Journal Order API ──────────────────────────────────────────────────

export interface JournalOrderData {
    key: string;
    order: number;
}

/** 
 * Fetches order configuration for Journal Cards from a custom post type.
 * Assuming the CPT slug is "journal-order".
 */
export async function fetchJournalOrder(): Promise<JournalOrderData[]> {
    const cacheKey = "journal-order";
    const cached = getCached<JournalOrderData[]>(cacheKey);
    if (cached) return cached;

    try {
        // Fetch from custom post type endpoint 'journal-order'
        // If the endpoint is different (e.g., 'journal_order'), it can be adjusted here.
        const posts = await wpFetch<WPPost[]>("/journal-order?per_page=100");
        
        const orderData = posts.map(post => {
            // Use title as the card key, fallback to slug
            const key = post.title?.rendered ? decodeHtml(post.title.rendered).trim() : post.slug;
            
            // Extract order from ACF, menu_order, or content
            let order = 999;
            if (post.acf && (post.acf as any).display_order !== undefined) {
                order = Number((post.acf as any).display_order);
            } else if ((post as any).menu_order !== undefined) {
                order = Number((post as any).menu_order);
            } else if (post.content?.rendered) {
                const parsed = parseInt(stripHtml(post.content.rendered).trim(), 10);
                if (!isNaN(parsed)) order = parsed;
            }
            
            return { key, order };
        }).filter(item => item.key);

        setCache(cacheKey, orderData);
        return orderData;
    } catch (error) {
        console.warn("WP API: Failed to fetch journal order, falling back to default.", error);
        return [];
    }
}