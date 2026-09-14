import type { ResilienceItem } from "./resilienceTypes";

import first from "../assets/haya-images/wave-of-lights/collections/sixth.webp";
import second from "../assets/haya-images/wave-of-lights/collections/second.webp";
import third from "../assets/haya-images/wave-of-lights/collections/third.webp";
import fourth from "../assets/haya-images/wave-of-lights/collections/forth.webp";
import fifth from "../assets/haya-images/wave-of-lights/collections/fifth.webp"; // Placeholder since fifth doesn't exist

import houseFirst from "../assets/haya-images/wave-of-lights/houses/first.png";
import houseSecond from "../assets/haya-images/wave-of-lights/houses/second.png";
import houseThird from "../assets/haya-images/wave-of-lights/houses/third.png";
import houseFourth from "../assets/haya-images/wave-of-lights/houses/forth.png";
import houseFifth from "../assets/haya-images/wave-of-lights/houses/fifth.png"; // Placeholder since fifth doesn't exist


export const waveData: ResilienceItem[] = [
  {
    id: 1,
    sectionId: "amara-flame",
    title: "AMARA FLAME",
    content:
      "Amara Flame is Santorini at the hour the island turns gold. A sheer silk robe touched with gold handwork falls over champagne silk, carrying the heat of sunset into a piece made for summer evenings.",
    enterLabel: "ENTER",
    enterHref: "/product/amara-flame",
    mainImageSrc: first,
    mainImageAlt: "Amara Flame – full look",
    thumbImageSrc: houseFirst,
    thumbImageAlt: "Amara Flame – detail",
  },
  {
    id: 2,
    sectionId: "sabi",
    title: "SABI",
    content:
      "Sabi draws from the gold-brown earth of South Africa. A natural-fibre robe meets a giraffe-print silk dress, giving the edition its warmth, pattern and untamed glamour.",
    enterLabel: "ENTER",
    enterHref: "/product/sabi",
    mainImageSrc: second,
    mainImageAlt: "Sabi – full look",
    thumbImageSrc: houseSecond,
    thumbImageAlt: "Sabi – detail",
  },
  {
    id: 3,
    sectionId: "ziya-blue",
    title: "ZIYA BLUE",
    content:
      "Ziya Blue is cut from the drama of deep water. Cobalt silk meets champagne silk in an edition of cool colour, clean lines and luminous polish.",
    enterLabel: "ENTER",
    enterHref: "/product/ziya-blue",
    mainImageSrc: third,
    mainImageAlt: "Ziya Blue – full look",
    thumbImageSrc: houseThird,
    thumbImageAlt: "Ziya Blue – detail",
  },
  {
    id: 4,
    sectionId: "sakura",
    title: "SAKURA",
    content:
      "An ivory silk dress and blossom-traced robe inspired by Kyoto’s softest hours. Sakura holds the feeling of petals, pale architecture and spring light, made into a garment of rare delicacy.",
    enterLabel: "ENTER",
    enterHref: "/product/sakura",
    mainImageSrc: fourth,
    mainImageAlt: "Sakura – full look",
    thumbImageSrc: houseFourth,
    thumbImageAlt: "Sakura – detail",
  },
  {
    id: 5,
    sectionId: "rina-lemon",
    title: "RINA LEMON",
    content:
      "Rina Lemon gathers the joy of Lake Garda: citrus trees, warm terraces and light on the water. A lemon-print silk dress is paired with a soft robe, creating a piece that feels playful, polished and unmistakably summer.",
    enterLabel: "ENTER",
    enterHref: "/product/rina-lemon",
    mainImageSrc: fifth,
    mainImageAlt: "Rina Lemon – full look",
    thumbImageSrc: houseFifth,
    thumbImageAlt: "Rina Lemon – detail",
  },
];