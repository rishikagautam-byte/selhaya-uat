import type { ResilienceItem } from "../../types/resilienceTypes";

import first from "../../assets/haya-images/collections/first.webp";
import second from "../../assets/haya-images/collections/second.webp";
import third from "../../assets/haya-images/collections/third.webp";
import fourth from "../../assets/haya-images/collections/forth.webp";

import houseFirst from "../../assets/haya-images/houses/first.png";
import houseSecond from "../../assets/haya-images/houses/second.png";
import houseThird from "../../assets/haya-images/houses/third.png";
import houseFourth from "../../assets/haya-images/houses/forth.png";

export const hayaData: ResilienceItem[] = [
  {
    id: 1,
    title: "MALIKA DRAPE",
    content:
      "A deep burgundy robe for Knightsbridge lunches, evening invitations and the theatre of dressing. Malika Drape is made for the woman who enjoys silk with drama, glamour and sophistication.",
    enterLabel: "ENTER",
    enterHref: "/product/malika-drape",
    mainImageSrc: first,
    mainImageAlt: "Malika Drape – full look",
    thumbImageSrc: houseFirst,
    thumbImageAlt: "Malika Drape – detail",
  },
  {
    id: 2,
    title: "SHARIFA CUT",
    content:
      "A feminine answer to the formal blazer. Sharifa Cut brings black tailoring, silk lapels and fine handwork into a robe made for boardrooms, private offices and power dressed with grace.",
    enterLabel: "ENTER",
    enterHref: "/product/sharifa-cut",
    mainImageSrc: second,
    mainImageAlt: "Sharifa Cut – full look",
    thumbImageSrc: houseSecond,
    thumbImageAlt: "Sharifa Cut – detail",
  },
  {
    id: 3,
    title: "SAFA BLOOM",
    content:
      "A camel robe traced with botanical embroidery, inspired by Kew mornings, flowered lawns and the softer side of the London Season. Safa Bloom is made for garden invitations, summer teas and days that begin in sunlight.",
    enterLabel: "ENTER",
    enterHref: "/product/safa-bloom",
    mainImageSrc: third,
    mainImageAlt: "Safa Bloom – full look",
    thumbImageSrc: houseThird,
    thumbImageAlt: "Safa Bloom – detail",
  },
  {
    id: 4,
    title: "NOOR FLOW",
    content:
      "An ivory robe for afternoon tea, drawing-room conversations and softer social gatherings. Noor Flow carries tonal embroidery and a fluid line, made for the woman whose elegance lives in ease.",
    enterLabel: "ENTER",
    enterHref: "/product/noor-flow",
    mainImageSrc: fourth,
    mainImageAlt: "Noor Flow – full look",
    thumbImageSrc: houseFourth,
    thumbImageAlt: "Noor Flow – detail",
  },
];