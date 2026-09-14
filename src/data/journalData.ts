export interface JournalSection {
    heading?: string;
    paragraph: string;
}

export interface JournalArticle {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    excerpt?: any;
    slug: string;
    title: string;
    category: string;
    date: string;
    image: string;
    heroImage: string;
    heroTitle?: string;
    description: string;
    sections: JournalSection[];
    /** Raw WordPress HTML content — used by ReadJournalPage for rich rendering */
    contentHtml?: string;
}

export const journalArticles: JournalArticle[] = [
    // --- MAISON milestones ---
    {
        slug: "silk",
        title: "Silk",
        category: "Maison milestones",
        date: "June 24, 2024",
        image: "/images/journal/readJournal.png",
        heroImage: "/images/journal/readJournal.png",
        heroTitle: "WHERE THREADS CARRY MEMORY AND TIME ITSELF IS WOVEN INTO BEAUTY.",
        description: "It is a language of touch, a testament of patience, and a dialogue between the wearer and heritage.",
        sections: [
            {
                paragraph: "It is a language of touch, a testament of patience, and a dialogue between the wearer and the heritage that shapes it. When we touch silk, we touch history, craftsmanship, and a silent promise of beauty."
            },
            {
                heading: "Origins in Grace",
                paragraph: "Every thread of silk begins in stillness, spun from the very essence of nature. At Selhaya, we believe in honoring these origins. We source our silk from heritage farms where sericulture is practiced not as an industry, but as a discipline of care."
            },
            {
                heading: "Hands That Shape",
                paragraph: "In our atelier, artisans work with a delicacy that only decades of practice can bestow. They touch, measure, and cut without rushing, understanding that silk responds to the energy of its creator. It is not merely constructed; it is breathed into form."
            },
            {
                heading: "The Philosophy of Slowness",
                paragraph: "There is a rhythm to luxury that cannot be accelerated. The philosophy of slowness is at the heart of our craft. It demands that we wait, that we refine, and that we allow time to do its work. In this patience, we find a rare beauty that survives passing trends."
            },
            {
                heading: "A Modern Offering",
                paragraph: "While we honor the traditions of the past, we also look to the future. Our modern offerings bring these time-honored techniques into the present, creating pieces that are both relevant and timeless. They are designed for a life that is lived with intention."
            },
            {
                heading: "Closing Reflection",
                paragraph: "In the end, a Selhaya garment is more than the sum of its parts. It is a vessel of memories, a companion to your quietest moments. We hope that when you wear it, you feel the care, the patience, and the time that was woven into its threads."
            }
        ]
    },
    {
        slug: "why-modesty-is-the-highest-form-of-expression-in-luxury",
        title: "Why Modesty is the Highest Form of Expression in Luxury",
        category: "Maison milestones",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/philosophy.png",
        heroTitle: "ELEGANCE SPEAKS IN WHISPERS, NEVER IN SHOUTS.",
        description: "True modesty doesn't hide; it reveals the richness of form and intent through quiet grace.",
        sections: [
            {
                paragraph: "In a world of constant visual noise, modesty stands as a conscious decision to value depth over display. Luxury is not defined by excess, but by the quiet confidence of deliberate restraint."
            },
            {
                heading: "The Power of Restraint",
                paragraph: "Restraint is not the absence of design; it is the refinement of it. By focusing on clean lines, high-quality fabrics, and exquisite tailoring, modesty allows the quality of the materials and the character of the wearer to take center stage."
            },
            {
                heading: "The Silent Dialogue",
                paragraph: "A modest garment does not demand attention, yet it commands respect. It establishes an intimate dialogue between the garment and the skin, offering comfort and poise without relying on ornamentation."
            }
        ]
    },
    {
        slug: "how-selhaya-defines-elegance-without-ornamentation",
        title: "How Selhaya Defines Elegance Without Ornamentation",
        category: "Maison milestones",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/philosophy.png",
        heroTitle: "THE PURITY OF FORM IN ITS MOST TRUE EXPRESSION.",
        description: "Exploring the aesthetic philosophy of pure silhouette and unadorned materials.",
        sections: [
            {
                paragraph: "At Selhaya, elegance is found not in what we add, but in what we choose to leave. Our silhouettes rely on structure, movement, and the natural fall of silk to create impact."
            },
            {
                heading: "Focus on Materials",
                paragraph: "When a design is simple, the fabric must be flawless. We spend months sourcing silks and textiles that possess their own inherent weight, sheen, and texture. These natural characteristics serve as the only decoration our garments need."
            }
        ]
    },
    {
        slug: "beginning-a-new-journey-through-the-philosophy-of-expression-in-balance",
        title: "Beginning a new journey through the Philosophy of Expression in Balance",
        category: "Maison milestones",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/philosophy.png",
        heroTitle: "FINDING HARMONY BETWEEN TRADITION AND INNOVATION.",
        description: "Charting a path that respects heritage while expressing contemporary style.",
        sections: [
            {
                paragraph: "Balance is the core of our creative process. We look to historical garments not to copy them, but to understand their rhythm, translating their spirit for a modern lifestyle."
            }
        ]
    },

    // --- COUTURE & CRAFT ---
    {
        slug: "my-silk-finds-its-way-the-cuts-and-textures-of-a-season",
        title: "My Silk Finds Its Way. The Cuts and Textures of a Season",
        category: "Couture & Craft",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/open.png",
        heroTitle: "EVERY PATTERN TELLS A STORY OF EXPERIMENTATION AND DISCOVERY.",
        description: "How seasonal designs emerge from draping and interacting directly with pure silk.",
        sections: [
            {
                paragraph: "Every season, our studio undergoes a quiet ritual. We drape meters of raw silk over dress forms, allowing the weight of the fabric to dictate the lines of the collection."
            }
        ]
    },
    {
        slug: "how-hand-embroidery-in-the-maison-preserves-hayas-vision",
        title: "How Hand Embroidery in the Maison PRESERVES Haya's Vision",
        category: "Couture & Craft",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/open.png",
        heroTitle: "A LEGACY PRESERVED ONE STITCH AT A TIME.",
        description: "Examining the traditional hand-stitching techniques kept alive in our atelier.",
        sections: [
            {
                paragraph: "Embroidery at Selhaya is a preservation of culture. Each motif is carefully hand-stitched by artisans who carry generations of regional embroidery techniques in their hands."
            }
        ]
    },
    {
        slug: "the-role-of-slow-construction-in-creating-timeless-luxury",
        title: "The Role of Slow Construction in Creating Timeless Luxury",
        category: "Couture & Craft",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/open.png",
        heroTitle: "CRAFTED TO ENDURE GENERATIONS, NOT SEASONS.",
        description: "Why we choose internal seams and hand finishes over industrial speeds.",
        sections: [
            {
                paragraph: "A garment that is made quickly is forgotten quickly. We practice slow construction because it is the only way to ensure a garment remains beautiful inside and out for decades."
            }
        ]
    },
    {
        slug: "the-house-order-defines-our-legacy",
        title: "The House Order Defines our Legacy",
        category: "Couture & Craft",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/open.png",
        heroTitle: "THE DISCIPLINE OF COUTURE IN SERVICE OF ART.",
        description: "Understanding the atelier workflow and the standards of Selhaya's house order.",
        sections: [
            {
                paragraph: "The house order is our system of quality control. From the initial sketch to the final steam, each phase of production follows a rigorous protocol of evaluation."
            }
        ]
    },

    // --- THE HOUSE & COLLECTIONS ---
    {
        slug: "when-silence-becomes-structure-the-architecture-of-a-selhaya-piece",
        title: "When Silence Becomes Structure: The Architecture of a Selhaya Piece",
        category: "The House & Collections",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/journalHome.png",
        heroTitle: "THE GEOMETRY OF QUIET LUXURY.",
        description: "An inquiry into the patterns, linings, and internal logic of our tailored items.",
        sections: [
            {
                paragraph: "Behind the fluid exterior of a Selhaya coat lies a carefully engineered internal framework. We design our pieces like architecture, balancing soft curves with strict lines."
            }
        ]
    },
    {
        slug: "haya-the-collection-that-began-with-a-single-thread",
        title: "Haya: The Collection That Began with a Single Thread",
        category: "The House & Collections",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/journalHome.png",
        heroTitle: "THE GENESIS OF OUR MODEST DESIGN SIGNATURE.",
        description: "The origin story of the Haya collection, reflecting the start of our brand journey.",
        sections: [
            {
                paragraph: "The Haya collection started with a search for the perfect weight of crepe. It was a project that redefined how we view drape and movement in modesty clothing."
            }
        ]
    },
    {
        slug: "how-the-maison-curated-its-seasonal-intentions",
        title: "How the Maison Curates its Seasonal Intentions",
        category: "The House & Collections",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/journalHome.png",
        heroTitle: "CRAFTING ESSAYS AND MOODBOARDS AROUND MEMORY.",
        description: "A look inside the creative sessions where our thematic colors and structures are chosen.",
        sections: [
            {
                paragraph: "Our design process starts with mood boards, poems, and color swatches derived from natural minerals, stones, and organic sands."
            }
        ]
    },
    {
        slug: "waves-of-light-inside-the-making-of-a-signature-collection",
        title: "Waves of Light: Inside the Making of a Signature Collection",
        category: "The House & Collections",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/journalHome.png",
        heroTitle: "CAPTURING THE TRANSITION OF SUNLIGHT ON SILK.",
        description: "Exploring the gradients and light interactions of the Waves of Light series.",
        sections: [
            {
                paragraph: "The Waves of Light collection was designed to reflect light. By combining satin and matte textures, our garments shimmer dynamically as the wearer moves."
            }
        ]
    },

    // --- FOUNDER NOTES ---
    {
        slug: "know-yourself-your-values-the-things-you-hold-in-balance",
        title: "Know Yourself: Your Values, The Things You Hold in Balance",
        category: "Founder Notes",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/journalHome.png",
        heroTitle: "REFLECTIONS ON STRENGTH AND STABILITY FROM THE FOUNDER'S DESK.",
        description: "A personal letter on creating a label that aligns with internal beliefs.",
        sections: [
            {
                paragraph: "Creating Selhaya was not just a commercial endeavor. It was a path to align outward expression with inward convictions. To build something meaningful, you must first know what you protect."
            }
        ]
    },
    {
        slug: "il-salone-del-mobile-the-spaces-that-inspired-the-selhaya-atelier",
        title: "Il Salone del Mobile: The Spaces that Inspired the Selhaya Atelier",
        category: "Founder Notes",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/journalHome.png",
        heroTitle: "SPATIAL SILENCE AND ITS IMPACT ON INTUITIVE DESIGN.",
        description: "Reflections on Milanese architecture and spatial elegance.",
        sections: [
            {
                paragraph: "During my visit to Milan, I realized that rooms design our emotions. The quiet courtyards and marble arches inspired the minimalist layout of our physical atelier."
            }
        ]
    },
    {
        slug: "explore-your-mind-the-road-to-beauty-begins-within",
        title: "Explore Your Mind, The Road to Beauty Begins Within",
        category: "Founder Notes",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/journalHome.png",
        heroTitle: "THE INTERNAL ATELIER WHERE DESIGN TRULY STARTS.",
        description: "On mindfulness, mental clarity, and the incubation of creative work.",
        sections: [
            {
                paragraph: "The busiest mind cannot hear creative intuition. I write these notes to encourage you to discover spaces of silence in your day, for it is in calm that our finest ideas take shape."
            }
        ]
    },
    {
        slug: "explore-your-chair-on-how-stillness-shapes-creativity",
        title: "Explore Your Chair: On How Stillness Shapes Creativity",
        category: "Founder Notes",
        date: "June 24, 2024",
        image: "/images/journal/philosophy.png",
        heroImage: "/images/journal/journalHome.png",
        heroTitle: "THE ART OF SITTING AND DRAFTING DESIGNS IN SILENCE.",
        description: "How static physical stillness allows mental movement and drafting.",
        sections: [
            {
                paragraph: "Sometimes the most active thing you can do is sit still. By anchoring yourself to the desk, you allow your creative thoughts to travel across eras and boundaries."
            }
        ]
    }
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
    return journalArticles.find(article => article.slug === slug);
}
