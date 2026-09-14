import { useEffect, useState } from "react";
import type { JournalArticle } from "./journalData";
import {
    fetchAllPosts,
    fetchPostsByCategory,
    fetchPostBySlug,
    CATEGORY_ROUTE_TO_WP_SLUG,
} from "./wordpressApi";

interface UseArticlesResult {
    articles: JournalArticle[];
    loading: boolean;
    error: string | null;
}

interface UseArticleResult {
    article: JournalArticle | null;
    loading: boolean;
    error: string | null;
}

// useJournalArticles─
/**
 * Fetch journal articles, optionally filtered by the React route‑slug
 * (e.g. "maison-milestones", "couture-and-craft").
 *
 * Returns an empty array if no data found — no static fallback.
 */
export function useJournalArticles(routeSlug?: string): UseArticlesResult {
    const [articles, setArticles] = useState<JournalArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);

            try {
                let data: JournalArticle[];

                if (routeSlug) {
                    const wpSlug = CATEGORY_ROUTE_TO_WP_SLUG[routeSlug];
                    if (!wpSlug) {
                        throw new Error(`Unknown category route: ${routeSlug}`);
                    }
                    data = await fetchPostsByCategory(wpSlug);
                } else {
                    data = await fetchAllPosts();
                }

                if (!cancelled) {
                    setArticles(data);
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    console.warn("WP fetch failed:", err);
                    setError((err as Error).message);
                    setArticles([]);
                    setLoading(false);
                }
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [routeSlug]);

    return { articles, loading, error };
}

// useJournalArticle (single)─
/**
 * Fetch a single journal article by its slug.
 * Also returns `allArticles` so components can build
 * "related" / "next" navigation.
 */
export function useJournalArticle(slug: string | undefined): UseArticleResult & { allArticles: JournalArticle[] } {
    const [article, setArticle] = useState<JournalArticle | null>(null);
    const [allArticles, setAllArticles] = useState<JournalArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) {
            setArticle(null);
            setLoading(false);
            return;
        }

        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);

            try {
                // Fetch the single post and all posts in parallel
                const [single, all] = await Promise.all([
                    fetchPostBySlug(slug!),
                    fetchAllPosts(),
                ]);

                if (!cancelled) {
                    setArticle(single ?? null);
                    setAllArticles(all);
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    console.warn("WP fetch failed for slug:", err);
                    setError((err as Error).message);
                    setArticle(null);
                    setAllArticles([]);
                    setLoading(false);
                }
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [slug]);

    return { article, allArticles, loading, error };
}
