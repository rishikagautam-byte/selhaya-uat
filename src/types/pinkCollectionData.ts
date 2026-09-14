import first from "../assets/pink/first.webp";
import second from "../assets/pink/third.webp";
import third from "../assets/pink/fifth.webp";
import fourth from "../assets/pink/seventh.webp";
import fifth from "../assets/pink/ninth.webp";

import houseFirst from "../assets/pink/second.png";
import houseSecond from "../assets/pink/forth.png";
import houseThird from "../assets/pink/sixth.png";
import houseFourth from "../assets/pink/eight.png";
import houseFifth from "../assets/pink/tenth.png";


import type { ResilienceItem } from "./resilienceTypes";

export const pinkCollectionData: ResilienceItem[] = [
  {
    id: 1,
    sectionId: "tatiana",
    title: "TATIANA",
    content: "Tatiana is the deepest note of the collection. A burgundy cape with a dramatic fall, made for evening rooms, formal occasions and the woman who understands the power of one unforgettable colour.",
    enterLabel: "ENTER",
    enterHref: "/product/tatiana",
    mainImageSrc: first,
    mainImageAlt: "Rose Flame – full look",
    thumbImageSrc: houseFirst,
    thumbImageAlt: "Rose Flame – detail",
  },
  {
    id: 2,
    sectionId: "seraphina",
    title: "SERAPHINA",
    content: "Seraphina is the lightest breath of the collection. Pink silk organza moves like a petal in light, delicate in form yet full of feeling.",
    enterLabel: "ENTER",
    enterHref: "/product/seraphina",
    mainImageSrc: second,
    mainImageAlt: "Sabi Pink – full look",
    thumbImageSrc: houseSecond,
    thumbImageAlt: "Sabi Pink – detail",
  },
  {
    id: 3,
    sectionId: "clara",
    title: "CLARA",
    content: "Clara brings the language of tailoring into soft pink silk. Structured, feminine and polished, it is made for the woman who carries authority without surrendering beauty.",
    enterLabel: "ENTER",
    enterHref: "/product/clara",
    mainImageSrc: third,
    mainImageAlt: "Ziya Pink – full look",
    thumbImageSrc: houseThird,
    thumbImageAlt: "Ziya Pink – detail",
  },
  {
    id: 4,
    sectionId: "halime",
    title: "HALIME",
    content: "Halime holds the richer side of the rose. Dark pink organza gives the robe depth, air and shadow, creating a piece that feels graceful, protective and assured.",
    enterLabel: "ENTER",
    enterHref: "/product/halime",
    mainImageSrc: fourth,
    mainImageAlt: "Sakura Rose – full look",
    thumbImageSrc: houseFourth,
    thumbImageAlt: "Sakura Rose – detail",
  },
  {
    id: 5,
    sectionId: "farhana",
    title: "FARHANA",
    content: "Fuses modest grace with structured British design thinking worn over any style clothing perfect for the London Social Season.",
    enterLabel: "ENTER",
    enterHref: "/product/farhana",
    mainImageSrc: fifth,
    mainImageAlt: "Sakura Rose – full look",
    thumbImageSrc: houseFifth,
    thumbImageAlt: "Sakura Rose – detail",
  },
];
