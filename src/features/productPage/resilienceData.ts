import editionsImg1 from "../../assets/main-product/rose.png";
import editionsImg2 from "../../assets/main-product/haya1.png"
import editionsImg3 from "../../assets/main-product/wave1.png"
import editionsImg4 from "../../assets/heritiage/hero.png"
import editionsImg5 from "../../assets/main-product/houses/rose1.png";
import editionsImg6 from "../../assets/main-product/houses/haya.png"
import editionsImg7 from "../../assets/main-product/houses/wave.png"
import editionsImg8 from "../../assets/main-product/houses/heritiage.png"
import type { ResilienceItem } from "../../types/resilienceTypes";


export const resilienceData: ResilienceItem[] = [
  {
    id: 1,
    title: "ROSE OF RESILIENCE",
    content:
      "Capsule created to honour women their softness, their strength, and the quiet beauty they carry through every season of life",
    enterLabel: "ENTER",
    enterHref: "/product/rose-of-resilience",
    mainImageSrc: editionsImg1,
    mainImageAlt: "Rose of Resilience – full look",
    thumbImageSrc: editionsImg5,
    thumbImageAlt: "Rose of Resilience – detail",
  },
  {
    id: 2,
    title: "HAYA ROBES",
    content:
      "Fuses modest grace with structured British design thinking, worn over any style clothing perfect for the London Social Season",
    enterLabel: "ENTER",
    enterHref: "/product/haya-robes",
    mainImageSrc: editionsImg2,
    mainImageAlt: "Haya Robes – full look",
    thumbImageSrc: editionsImg6,
    thumbImageAlt: "Haya Robes – detail",
  },
  {
    id: 3,
    title: "WAVES OF LIGHT",
    content:
      "Five silk-lined abayas with silk dresses Landscapes, cultures, memories transformed into couture perfect luxury honeymoon and resortwear",
    enterLabel: "ENTER",
    enterHref: "/selhaya-collections/waves-of-light",
    mainImageSrc: editionsImg3,
    mainImageAlt: "Waves of Light – full look",
    thumbImageSrc: editionsImg7,
    thumbImageAlt: "Waves of Light – detail",
  },
  {
    id: 4,
    title: "HERITIAGE",
    content:
      "A silk abaya designed to represent the enduring connection between mother and child passing from one generation to the next ",
    enterLabel: "ENTER",
    enterHref: "/selhaya-collections/heritage",
    mainImageSrc: editionsImg4,
    mainImageAlt: "Heritage – full look",
    thumbImageSrc: editionsImg8,
    thumbImageAlt: "Heritage – detail",
  },
];