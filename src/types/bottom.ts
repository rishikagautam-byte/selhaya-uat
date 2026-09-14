import heritiageBird from "../assets/heritiage/bird.png";
import heritiageStore from "../assets/heritiage/store.png";

export interface BottomData {
  title: string;
  image1: string;
  descriptionLines: string[];
  buttonText: string;
  buttonHref: string;
  image2: string;
}

export const bottomData: Record<string, BottomData> = {
  haya: {
    title: "The House That Quietly Gives.",
    image1: "/images/home/houseFlower.png",
    descriptionLines: [
      "The Maison was born not only from elegance, but from intention.",
      "From the beginning, Selhaya was created with the belief that",
      "beauty should carry meaning and that every creation should",
      "leave something gentle behind."
    ],
    buttonText: "EXPLORE LEGACY →",
    buttonHref: "#",
    image2: "/images/home/house.png"
  },
  heritiage: {
    title: "Created once in time and\nnever repeated",
    image1: heritiageBird,
    descriptionLines: [
      "Each Maison Collector edition is produced in strictly limited quantity.",
      "When fully reserved, it is archived permanently.",
      "No reissues. No reproductions."
    ],
    buttonText: "EXPLORE SILK AUTHORITY →",
    buttonHref: "#",
    image2: heritiageStore
  }
};
