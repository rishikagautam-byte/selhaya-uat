import { motion } from "framer-motion";

/**
 * Skeleton loader for journal article cards.
 * Matches the aspect‑ratio and layout of the real article grid items.
 */
export default function JournalSkeleton({ count = 4 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex flex-col gap-4"
                >
                    {/* Image placeholder */}
                    <div className="aspect-[4/3] w-full bg-primary-dark/[0.07] animate-pulse" />

                    {/* Date placeholder */}
                    <div className="h-3 w-24 bg-primary-dark/[0.07] animate-pulse rounded-sm" />

                    {/* Title placeholder */}
                    <div className="flex flex-col gap-2">
                        <div className="h-5 w-full bg-primary-dark/[0.07] animate-pulse rounded-sm" />
                        <div className="h-5 w-3/4 bg-primary-dark/[0.07] animate-pulse rounded-sm" />
                    </div>

                    {/* Link placeholder */}
                    <div className="h-5 w-12 bg-primary-dark/[0.07] animate-pulse rounded-sm mt-2" />
                </motion.div>
            ))}
        </>
    );
}
