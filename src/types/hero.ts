import hayaLimited from "../assets/haya-images/limited2.png";
import waveHero from "../assets/haya-images/wave-of-lights/hero.png";
import heritiageHero from "../assets/heritiage/hero.png";
import pressHero from "../assets/our-journey/press/hero.png";
import pinkHero from "../assets/pink/hero.png";

export interface HeroData {
  imageSrc: string;
  title: string;
  descriptionLines: string[];
}

export const heroData: Record<string, HeroData> = {
  haya: {
    imageSrc: hayaLimited,
    title: "Haya Robes",
    descriptionLines: [
      "Limited pure silk editions crafted",
      "once, never repeated."
    ],
  },
  wavesOfLight: {
    imageSrc: waveHero,
    title: "WAVES OF LIGHT",
    descriptionLines: [
      "A pure silk collection inspired by",
      "light in motion"
    ],
  },
  heritiage: {
    imageSrc: heritiageHero,
    title: "HERITIAGE EDITION",
    descriptionLines: [
      "Limited pure silk editions crafted ",
      "once never repeated."
    ],
  },
  pressAndRecognition: {
    imageSrc: pressHero,
    title: "PRESS AND RECOGNITION",
    descriptionLines: [
      "Recognised by leading international publications."
    ],
  },
  pinkCollection: {
    imageSrc: pinkHero,
    title: "ROSE OF RESILIENCE",
    descriptionLines: [
      "An expression of femininity shaped through  ",
      "depth, refinement, and enduring elegance."
    ],
  }
};
