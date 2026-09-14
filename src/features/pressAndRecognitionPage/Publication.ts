import pub1 from "../../assets/press/publicationLogo/pub1.png";
import pub2 from "../../assets/press/publicationLogo/pub2.png";
import pub3 from "../../assets/press/publicationLogo/pub3.png";
import pub4 from "../../assets/press/publicationLogo/pub4.png";
import philosophy1 from "../../assets/our-journey/philosophy/first.png";
import philosophy2 from "../../assets/our-journey/philosophy/second.png";
import philosophy3 from "../../assets/our-journey/philosophy/third.png";
import philosophy4 from "../../assets/our-journey/philosophy/forth.png";

export interface publicationItem {
  id: number;
  publicationImg: string;
  description: string;
  image: string;
  externalUrl:string
}

export const publications: publicationItem[] = [
  {
    id: 1,
    publicationImg: pub1,
    description:
      "The Story in Every Stitch: How Aisha Hossain Brings Selhaya Robes to Life",
    image: philosophy1,
    externalUrl:"#"
  },
  {
    id: 2,
    publicationImg: pub2,
    description: "Selhaya & the language of cultural luxury",
    image: philosophy2,
    externalUrl:"#"
  },
  {
    id: 3,
    publicationImg: pub3,
    description: "Aisha Hossain on building a Maison rooted in meaning",
    image: philosophy3,
    externalUrl:"#"
  },
  {
    id: 4,
    publicationImg: pub4,
    description:
      "Why Selhaya represents a new era of heritage-led fashion",
    image: philosophy4,
    externalUrl:"#"
  },
  {
    id: 5,
    publicationImg: pub1,
    description:
      "Inside the atelier where tradition meets contemporary design",
    image: philosophy1,
    externalUrl:"#"
  },
  {
    id: 6,
    publicationImg: pub1,
    description:
      "Inside the atelier where tradition meets contemporary design",
    image: philosophy1,
    externalUrl:"#"
  },
];