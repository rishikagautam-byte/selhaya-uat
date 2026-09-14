import first  from "../../assets/press/first.webp";
import second from "../../assets/press/second.webp";
import third  from "../../assets/press/third.webp";
import fourth from "../../assets/press/forth.webp";

export interface FormalItem {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
}

// Row layout alternates automatically:
// odd  (1,3) → image LEFT,   content RIGHT
// even (2,4) → content LEFT, image RIGHT

export const formalData: FormalItem[] = [
  {
    id : 1,
    name: "Royal Recognition - Abu Dhabi",
    title : "Royal Recognition - Abu Dhabi",
    description:
      "Certificate of appreciation awarded under royal patronage.",
    image: first,
  },
  {
    id: 2,
    name: "Global Recognition Awards",
    title: "Global Recognition Awards",
    description:
      "International recognition for contribution to luxury modest fashion.",
    image: second,
  },
  {
    id: 3,
    name: "Best Emerging Luxury Modest Fashion Brand",
    title: "Best Emerging Luxury Modest Fashion Brand",
    description:
      "Chosen by an independent panel recognising new leaders in luxury modestwear.",
    image: third,
  },
  {
    id: 4,
    name: "Ministerial Honour — Jakarta",
    title: "Ministerial Honour — Jakarta",
    description:
      "Official recognition for Selhaya’s role in shaping cultural dialogue and modest fashion.",
    image: fourth,
  },
];