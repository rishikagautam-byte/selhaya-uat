import { useState, useEffect } from "react";
import { fetchPublications, type PublicationItem } from "./wordpressApi";

export function usePublications() {
    const [publications, setPublications] = useState<PublicationItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPublications()
            .then(setPublications)
            .finally(() => setLoading(false));
    }, []);

    return { publications, loading };
}