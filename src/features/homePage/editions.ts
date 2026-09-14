export interface Edition {
  id: string;
  name: string;
  image: string;
  href: string;
}

export const editions: Edition[] = [
  {
    id: "rose-of-resilience",
    name: "Rose of Resilience",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop",
    href: "/editions/rose-of-resilience",
  },
  {
    id: "haya-collection",
    name: "Haya Collection",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
    href: "/editions/haya-collection",
  },
  {
    id: "waves-of-light",
    name: "Waves of Light",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    href: "/editions/waves-of-light",
  },
  {
    id: "heritage",
    name: "Heritage",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    href: "/editions/heritage",
  },
];