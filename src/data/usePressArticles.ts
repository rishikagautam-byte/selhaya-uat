import { useEffect, useState } from "react";
import { fetchPressPosts, type PressArticle } from "./wordpressApi";

export function usePressArticles() {
    const [articles, setArticles] = useState<PressArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPressPosts()
            .then(setArticles)
            .finally(() => setLoading(false));
    }, []);

    return { articles, loading };
}