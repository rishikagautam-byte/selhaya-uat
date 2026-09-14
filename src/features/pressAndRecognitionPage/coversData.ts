import cover1 from "../../assets/press/cover1.png";
import cover2 from "../../assets/press/cover2.png";
import cover3 from "../../assets/press/cover3.png";
import cover4 from "../../assets/press/cover4.png";

export interface CoverItem {
  id: number;
  title: string;
  date: string;
  image: string;
  link: string;
}

export const coversData: CoverItem[] = [
  {
    id: 1,
    title: "VANITY FAIR",
    date: "Jun 26, 2026",
    image: cover1,
    link: "https://somewhere.com/"
  },
  {
    id: 2,
    title: "HARPER BAZAAR ARABIA",
    date: "Jun 26, 2026",
    image: cover2,
    link: "https://somewhere.com/"
  },
  {
    id: 3,
    title: "NY Weekly Magazine",
    date: "Jun 26, 2026",
    image: cover3,
    link: "https://somewhere.com/"
  },
  {
    id: 4,
    title: "Veiled in Light",
    date: "Jun 26, 2026",
    image: cover4,
    link: "https://somewhere.com/"
  },
  {
    id: 5,
    title: "The Architecture of Grace",
    date: "Jun 26, 2026",
    image: cover1,
    link: "https://somewhere.com/"
  },
  {
    id: 6,
    title: "Echoes of Tradition",
    date: "Jun 26, 2026",
    image: cover1,
    link: "https://somewhere.com/"
  },
  {
    id: 7,
    title: "Between Two Worlds",
    date: "Jun 26, 2026",
    image: cover1,
    link: "https://somewhere.com/"
  },
  {
    id: 8,
    title: "Sovereign Silence",
    date: "Jun 26, 2026",
    image: cover1,
    link: "https://somewhere.com/"
  },
  {
    id: 9,
    title: "Veiled in Light",
    date: "Jun 26, 2026",
    image: cover4,
    link: "https://somewhere.com/"
  }
];