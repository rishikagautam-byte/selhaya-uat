export interface NestedMenuItem {
  title: string;
  description?: string;
  image?: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  nestedMenu?: NestedMenuItem[];
}

export const navItems = [
  // home
  {
    label: "Home",
    href: "/",
  },
  //about
  {
    label: "About",
    nestedMenu: [
      {
        title: "HOUSE OF SELHAYA",
        description:
          "A sanctuary of timeless grace, where every thread, every fold, and every whispered story is woven with reverence.",
        image: "/images/navbar/maison/house.png",
        href: "/the-house-of-selhaya",
      },
      {
        title: "SELHAYA SILKS",
        description:
          "Fuses modest grace with structured British design thinking worn over any style clothing a dialogue between heritage and modernity",
        image:
          "/images/navbar/maison/silks.png",
        href: "/selhaya-silks",
      },
      {
        title: "SELHAYA CRAFT",
        description:
          "DIn the House of Selhaya, every thread is an act of reverence.",
        image:
          "/images/navbar/maison/craft.png",
        href: "/selhaya-craft",
      },
    ]
  },
 

  // The Royal Legacy
  {
    label: "Royal Legacy",
    nestedMenu: [
      {
        title: "Royal Patronage",
        image: "/images/navbar/royal/patron.png",
        href: "/royal-patronage",
      },
      {
        title: "Royal Cultural Salon",
        image: "/images/navbar/royal/salon.png",
        href: "/cultural-salon",
      }

    ],
  },
  
  // selhaya collections
  {
    label: " selhaya collections",
    nestedMenu: [
      {
        title: "ROSE OF RESILIENCE",
        description:
          "A rare masterpiece from the Heritage Edition crafted in pure silk, a creation where heritage and grace converge.",
        image:
          "/images/navbar/selhayaCollections/rose-of-resilience.png",
        href: "/selhaya-collections/rose-of-resilience",
      },
      {
        title: "HAYA ",
        description:
          "Fuses modest grace with structured British design thinking worn over any style clothing a dialogue between heritage and modernity",
        image:
          "/images/navbar/selhayaCollections/haya.png",
        href: "/selhaya-collections/haya",
      },
      {
        title: "WAVES of LIGHT",
        description:
          "A seasonal collection inspired by the quiet brilliance of dawn and dusk. Each piece captures the gentle radiance of light, flowing with elegance and serenity.",
        image:
          "/images/navbar/selhayaCollections/waves.png",
        href: "/selhaya-collections/waves-of-light",
      },
      {
        title: "HERITAGE",
        description:
          "A rare masterpiece from the Heritage Edition crafted in pure silk, a creation where heritage and grace converge.",
        image:
          "/images/navbar/selhayaCollections/heritage.png",
        href: "/selhaya-collections/heritage",
      },
      {
        title: "ALL Collections",
        href: "/selhaya-collections",
      }
    ],
  },
  // bespoke
  // {
  //   label: "Bespoke",
  //   nestedMenu: [
  //     {
  //       title: "Bespoke",
  //       href: "/bespoke",
  //       image: "/images/navbar/bespoke.png"
  //     }
  //   ],
  // },
  {
    label: "Selhaya Bespoke",
    nestedMenu: [
      {
        title: "Bespoke Silk Art",
        image: "/images/navbar/bespoke/art.png",
        href: "/bespoke/silk-art",
      },
      {
        title: "Bespoke Silk Garments",
        image: "/images/navbar/bespoke/garment.png",
        href: "/bespoke/silk-garment",
      }
    ],
  },
  
  // our journey 
  {
    label: "Our Journey",
    href: "/heritage",
    nestedMenu: [
      {
        title: "PRESS & RECOGNITION",
        description:
          "A rare masterpiece from the  Heritage Editions crafted in pure silk, a creation where heritage and grace converge.",
        image:
          "/images/navbar/journey/press.png",
        href: "/press-and-recognition",
      },
      {
        title: "CULTURAL ALLIANCES",
        description:
          "A seasonal collection inspired by the quiet brilliance of dawn and dusk. Each piece captures the gentle radiance of light, flowing with elegance and serenity.",
        image:
          "/images/navbar/journey/alliance.png",
        href: "/cultural-alliance",
      },
      {
        title: "SELHAYA LEGACY ",
        description:
          "Fuses modest grace with structured British design thinking worn over any style clothing a dialogue between heritage and modernity",
        image:
          "/images/navbar/journey/legacy.png",
        href: "/selhaya-legacy",
      }
    ],
  },
  // advisory
  {
    label: "Advisory",
    nestedMenu: [
      {
        title: "Selhaya Advisory",
        image: "/images/navbar/advisory.png",
        href: "/advisory",
      }
    ],
  },
  // journal
  {
    label: "Journal",
    href: "/journal",
    nestedMenu: [
      {
        title: "Maison milestones",
        description:
          "A rare masterpiece from the  Heritage Editions crafted in pure silk, a creation where heritage and grace converge.",
        image:
          "/images/journal/philosophy.png",
        href: "/journal/maison-milestones",
      },
      {
        title: "Couture & Craft",
        description:
          "A seasonal collection inspired by the quiet brilliance of dawn and dusk. Each piece captures the gentle radiance of light, flowing with elegance and serenity.",
        image:
          "/images/journal/craft.png",
        href: "/journal/couture-and-craft",
      },
      {
        title: "The House & Collections",
        description:
          "Fuses modest grace with structured British design thinking worn over any style clothing a dialogue between heritage and modernity",
        image:
          "/images/journal/house.png",
        href: "/journal/the-house-and-collections",
      },
      {
        title: "Founder Notes",
        description:
          "Fuses modest grace with structured British design thinking worn over any style clothing a dialogue between heritage and modernity",
        image:
          "/images/journal/founder.png",
        href: "/journal/founder-notes",
      },
      {
        title: "Journal",
        href: "/journal"
      }
    ],
  },
  // contact
  {
    label: "CONTACT",
    nestedMenu: [
      {
        title: "contact",
        image: "/images/navbar/contact.png",
        href: "/contact",
      }
    ],
  },
];