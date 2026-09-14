import type { ResilienceItem } from "../../types/resilienceTypes";

// MALIKA
import malika2 from "../../assets/main-product/products/malika/second.png";
import malika3 from "../../assets/main-product/products/malika/hii.png";
import malika4 from "../../assets/main-product/products/malika/forth.png";

// SHARIFA
import sharifa2 from "../../assets/main-product/products/sharifa/second.png";
import sharifa3 from "../../assets/main-product/products/sharifa/third.png";
import sharifa4 from "../../assets/main-product/products/sharifa/forth.png";

// SAFA
import safa2 from "../../assets/main-product/products/safa/second.png";
import safa3 from "../../assets/main-product/products/safa/hii.png";
import safa4 from "../../assets/main-product/products/safa/forth.png";

// NOOR
import noor2 from "../../assets/main-product/products/noor/second.png";
import noor3 from "../../assets/main-product/products/noor/third.png";
import noor4 from "../../assets/main-product/products/noor/forth.png";

// YAQEEN
import yaqeen1 from "../../assets/main-product/products/yaqeen/first.png";
import yaqeen2 from "../../assets/main-product/products/yaqeen/second.png";
import yaqeen3 from "../../assets/main-product/products/yaqeen/third.png";
import yaqeen4 from "../../assets/main-product/products/yaqeen/forth.png";

// AMARA
import amara1 from "../../assets/main-product/products/amara/first.png";
import amara2 from "../../assets/main-product/products/amara/second.png";
import amara3 from "../../assets/main-product/products/amara/third.png";
import amara4 from "../../assets/main-product/products/amara/forth.png";

// SABI
import sabi1 from "../../assets/main-product/products/sabi/first.png";
import sabi2 from "../../assets/main-product/products/sabi/second.png";
import sabi3 from "../../assets/main-product/products/sabi/third2.png";
import sabi4 from "../../assets/main-product/products/sabi/forth2.png";

// ZIYA
import ziya1 from "../../assets/main-product/products/ziya/first.png";
import ziya2 from "../../assets/main-product/products/ziya/second.png";
import ziya3 from "../../assets/main-product/products/ziya/third.png";
import ziya4 from "../../assets/main-product/products/ziya/forth.png";

// SAKURA
import sakura1 from "../../assets/main-product/products/sakura/first.png";
import sakura2 from "../../assets/main-product/products/sakura/second.png";
import sakura3 from "../../assets/main-product/products/sakura/third.png";
import sakura4 from "../../assets/main-product/products/sakura/forth.png";

// RINA
import rina1 from "../../assets/main-product/products/rina/first.png";
import rina2 from "../../assets/main-product/products/rina/second.png";
import rina3 from "../../assets/main-product/products/rina/third2.png";
import rina4 from "../../assets/main-product/products/rina/forth.png";

// ROSE OF RESILIENCE - CLARA
import clara1 from "../../assets/main-product/products/clara/first.png";
import clara2 from "../../assets/main-product/products/clara/second.png";
import clara3 from "../../assets/main-product/products/clara/third.png";
import clara4 from "../../assets/main-product/products/clara/forth.png";

// ROSE OF RESILIENCE - FARHANA
import farhana1 from "../../assets/main-product/products/farhana/first.png";
import farhana2 from "../../assets/main-product/products/farhana/second.png";
import farhana3 from "../../assets/main-product/products/farhana/third.png";
import farhana4 from "../../assets/main-product/products/farhana/forth.png";

// ROSE OF RESILIENCE - HALIMA
import halima1 from "../../assets/main-product/products/halima/first.png";
import halima2 from "../../assets/main-product/products/halima/second.png";
import halima3 from "../../assets/main-product/products/halima/third.png";
import halima4 from "../../assets/main-product/products/halima/forth.png";

// ROSE OF RESILIENCE - SHERAPHINA
import sheraphina1 from "../../assets/main-product/products/sheraphina/first.png";
import sheraphina2 from "../../assets/main-product/products/sheraphina/second.png";
import sheraphina3 from "../../assets/main-product/products/sheraphina/third.png";
import sheraphina4 from "../../assets/main-product/products/sheraphina/forth.png";

// ROSE OF RESILIENCE - TATIANA
import tatiana1 from "../../assets/main-product/products/tatiana/first.png";
import tatiana2 from "../../assets/main-product/products/tatiana/second.png";
import tatiana3 from "../../assets/main-product/products/tatiana/third.png";
import tatiana4 from "../../assets/main-product/products/tatiana/forth.png";

// Product data for individual product pages (each product has 2 items, 2 images per item = 4 images total)
export const productPagesData: { [key: string]: ResilienceItem[] } = {
  // HAYA PRODUCTS
  "malika-drape": [
    {
      id: 1,
      title: "MALIKA DRAPE",
      content: "Expression of feminine power.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: "/main-product/products/malika/story.mp4",
      mainImageAlt: "Malika Drape – full look",
      thumbImageSrc: malika2,
      thumbImageAlt: "Malika Drape – detail",
    },
    {
      id: 2,
      title: "",
      content: "Malika means queen, and the robe was conceived with that title in mind.<br/>Cut from red silk crepe and lined in silk, Malika Drape falls with a long, fluid sweep. Tonal floral embroidery, shadowed in black, travels along the front of the robe and gives the richness of the red a darker, more seductive edge.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: malika3,
      mainImageAlt: "Malika Elegance – full look",
      thumbImageSrc: malika4,
      thumbImageAlt: "Malika Elegance – detail",
    },
  ],
  "sharifa-cut": [
    {
      id: 1,
      title: "SHARIFA CUT",
      content: "Dressed in grace.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: "/main-product/products/sharifa/story.mp4",
      mainImageAlt: "Sharifa Cut – full look",
      thumbImageSrc: sharifa2,
      thumbImageAlt: "Sharifa Cut – detail",
    },
    {
      id: 2,
      title: "",
      content: "Sharifa Cut begins with the authority of the formal blazer, then refines it into a longer and distinctly feminine line. <br/> Cut in black silk crepe with black silk satin lapels, the robe brings the polish of traditional tailoring into the language of Selhaya. A hand-embroidered vine motif runs through the garment with a subtle sparkle, adding beauty without diminishing its strength.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: sharifa3,
      mainImageAlt: "Sharifa Silhouette – full look",
      thumbImageSrc: sharifa4,
      thumbImageAlt: "Sharifa Silhouette – detail",
    },
  ],
  "safa-bloom": [
    {
      id: 1,
      title: "SAFA BLOOM",
      content: "It’s romantic drape and finely considered artistry.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: "/main-product/products/safa/story.mp4",
      mainImageAlt: "Safa Bloom – full look",
      thumbImageSrc: safa2,
      thumbImageAlt: "Safa Bloom – detail",
    },
    {
      id: 2,
      title: "",
      content: "Safa Bloom brings together two enduring parts of the Founder’s London: the camel coat and the English garden. <br/>Cut from camel-coloured raw shantung silk, the robe reinterprets the polish of this British wardrobe classic through a longer, more feminine silhouette. Its story is rooted in the Founder’s lifelong love of flowers and London parks, particularly Kew Gardens, where she became engaged.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: safa3,
      mainImageAlt: "Safa Radiance – full look",
      thumbImageSrc: safa4,
      thumbImageAlt: "Safa Radiance – detail",
    },
  ],
  "noor-flow": [
    {
      id: 1,
      title: "NOOR FLOW",
      content: "Femininity in its most effortless form.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: "/main-product/products/noor/story.mp4",
      mainImageAlt: "Noor Flow – full look",
      thumbImageSrc: noor2,
      thumbImageAlt: "Noor Flow – detail",
    },
    {
      id: 2,
      title: "",
      content: "Noor Flow began with the Founder’s memories of afternoon tea in London, shared with close friends and family in rooms where conversation lingered beyond the last pour. <br/>Cut from ivory silk crepe and fully lined in silk, the robe is traced with tonal floral-bud embroidery. Its soft line and finely judged detail bring the polish of British social dressing without formality becoming severe.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: noor3,
      mainImageAlt: "Noor Luminescence – full look",
      thumbImageSrc: noor4,
      thumbImageAlt: "Noor Luminescence – detail",
    },
  ],

  // HERITAGE PRODUCTS
  "yaqeen": [
    {
      id: 1,
      title: " THE YAQEEN",
      content: "",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: yaqeen1,
      mainImageAlt: "Yaqeen – full look",
      thumbImageSrc: yaqeen2,
      thumbImageAlt: "Yaqeen – detail",
    },
    {
      id: 2,
      title: "",
      content: "Yaqeen means certainty. <br/>Created in honour of Dhul Hijjah and the Day of Arafah, it became the founding edition of Selhaya. The piece was shaped by a simple conviction: the most meaningful garments should be worthy of the days for which they are chosen.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: yaqeen3,
      mainImageAlt: "Yaqeen Essence – full look",
      thumbImageSrc: yaqeen4,
      thumbImageAlt: "Yaqeen Essence – detail",
    },
  ],

  // WAVE OF LIGHTS PRODUCTS
  "amara-flame": [
    {
      id: 1,
      title: "AMARA FLAME",
      content: "Santorini at gold hour, translated into champagne silk.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: amara1,
      mainImageAlt: "Amara Flame – full look",
      thumbImageSrc: amara2,
      thumbImageAlt: "Amara Flame – detail",
    },
    {
      id: 2,
      title: "",
      content: "Amara Flame is a two-piece edition from Waves of Light. A pure silk crepe robe, finished with gold zari handwork, is paired with a champagne silk dress.The contrast between softly textured crepe, luminous silk and hand-worked gold gives the set its distinctive warmth. Offered in limited release.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: amara3,
      mainImageAlt: "Amara Glow – full look",
      thumbImageSrc: amara4,
      thumbImageAlt: "Amara Glow – detail",
    },
  ],
  "sabi": [
    {
      id: 1,
      title: "SABI",
      content: "A Robe for Witness.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: sabi1,
      mainImageAlt: "Sabi – full look",
      thumbImageSrc: sabi2,
      thumbImageAlt: "Sabi – detail",
    },
    {
      id: 2,
      title: "",
      content: "Sabi began with the Founder’s anniversary journey to Sabi Sands, where days unfolded through game drives, encounters with the Big Five and evenings beneath vast African sunsets. The rugged reserve, its wildlife and the gracious hospitality of the people who care for it shaped an edition rooted in admiration for the natural world.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: sabi3,
      mainImageAlt: "Sabi Essence – full look",
      thumbImageSrc: sabi4,
      thumbImageAlt: "Sabi Essence – detail",
    },
  ],
  "ziya-blue": [
    {
      id: 1,
      title: "ZIYA BLUE",
      content: "A Robe for Arrival.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: ziya1,
      mainImageAlt: "Ziya Blue – full look",
      thumbImageSrc: ziya2,
      thumbImageAlt: "Ziya Blue – detail",
    },
    {
      id: 2,
      title: "",
      content: "Ziya Blue began with the Founder’s visit to Cape Town and the force of South Africa’s coastline. The meeting of the Atlantic and Indian Oceans became the central image behind the edition: deep colour, water in motion and sunlight breaking across the surface.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: ziya3,
      mainImageAlt: "Ziya Radiance – full look",
      thumbImageSrc: ziya4,
      thumbImageAlt: "Ziya Radiance – detail",
    },
  ],
  "sakura": [
    {
      id: 1,
      title: "SAKURA",
      content: "Sakura embodies renewal and grace in their purest forms.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: sakura1,
      mainImageAlt: "Sakura – full look",
      thumbImageSrc: sakura2,
      thumbImageAlt: "Sakura – detail",
    },
    {
      id: 2,
      title: "",
      content: "Sakura began during the Founder’s honeymoon in Japan, among Kyoto’s gardens, bamboo groves and landscapes softened by spring. The fleeting beauty of cherry blossom season became the heart of the edition.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: sakura3,
      mainImageAlt: "Sakura Bloom – full look",
      thumbImageSrc: sakura4,
      thumbImageAlt: "Sakura Bloom – detail",
    },
  ],
  "rina-lemon": [
    {
      id: 1,
      title: "RINA LEMON",
      content: "A Robe of Radiance.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: rina1,
      mainImageAlt: "Rina Lemon – full look",
      thumbImageSrc: rina2,
      thumbImageAlt: "Rina Lemon – detail",
    },
    {
      id: 2,
      title: "",
      content: " Rina Lemon is a two-piece edition from Waves of Light.<br/>The yellow silk crepe robe is finished with subtle vine embroidery across the front and back. It opens over a custom lemon-print silk satin dress, the focal point of the edition, created to recall Lake Garda’s lemon groves, bright water and celebratory spirit.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: rina3,
      mainImageAlt: "Rina Citrine – full look",
      thumbImageSrc: rina4,
      thumbImageAlt: "Rina Citrine – detail",
    },
  ],

  // ROSE OF RESILIENCE PRODUCTS
  "clara": [
    {
      id: 1,
      title: "CLARA",
      content: "A true lady with unspoken power.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: clara1,
      mainImageAlt: "Clara – full look",
      thumbImageSrc: clara2,
      thumbImageAlt: "Clara – detail",
    },
    {
      id: 2,
      title: "",
      content: "Clara gives form to sabr, the strength found in patience and composure.<br/>Inspired by British tailoring, the blush raw silk robe carries the polish of a formal coat into a longer, more graceful silhouette. Its beauty lies in balance: structured without severity, feminine without fragility.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: clara3,
      mainImageAlt: "Clara Essence – full look",
      thumbImageSrc: clara4,
      thumbImageAlt: "Clara Essence – detail",
    },
  ],
  "farhana": [
    {
      id: 1,
      title: "FARHANA",
      content: " Something entirely her own.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: farhana1,
      mainImageAlt: "Farhana – full look",
      thumbImageSrc: farhana2,
      thumbImageAlt: "Farhana – detail",
    },
    {
      id: 2,
      title: "",
      content: "Farhana is rooted in the promise that life can open again after difficulty.<br/>Its salmon raw silk body gives the robe form and depth, while silk organza sleeves bring lightness around the arms. Hand-sewn vine motifs climb asymmetrically along the front, echoing growth that follows its own path rather than a perfect design.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: farhana3,
      mainImageAlt: "Farhana Radiance – full look",
      thumbImageSrc: farhana4,
      thumbImageAlt: "Farhana Radiance – detail",
    },
  ],
  "halime": [
    {
      id: 1,
      title: "HALIME",
      content: "Her light was never meant to be reduced.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: halima1,
      mainImageAlt: "Halima – full look",
      thumbImageSrc: halima2,
      thumbImageAlt: "Halima – detail",
    },
    {
      id: 2,
      title: " ",
      content: "Halime explores resilience through colour at its most vivid. Inspired by the idea that light is not only found around us, but carried within, the edition pairs a weightless deep rose silk organza cape with a silk jacquard dress in the same saturated hue.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: halima3,
      mainImageAlt: "Halima Elegance – full look",
      thumbImageSrc: halima4,
      thumbImageAlt: "Halima Elegance – detail",
    },
  ],
  "seraphina": [
    {
      id: 1,
      title: "SERAPHINA",
      content: "An ethereal creation where lightness and luxury dance together in perfect harmony.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: sheraphina1,
      mainImageAlt: "Sheraphina – full look",
      thumbImageSrc: sheraphina2,
      thumbImageAlt: "Sheraphina – detail",
    },
    {
      id: 2,
      title: "",
      content: "Seraphina draws from the Qur’anic image of gardens beneath which rivers flow, a vision of beauty sustained through faith and patience.<br/>A blush silk organza robe falls over a silk jacquard dress, with three-dimensional petals applied by hand across the shoulders and upper body. The transparency of the organza allows the woven silk beneath to glimmer through, giving the piece the feeling of a garden coming into bloom.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: sheraphina3,
      mainImageAlt: "Sheraphina Bliss – full look",
      thumbImageSrc: sheraphina4,
      thumbImageAlt: "Sheraphina Bliss – detail",
    },
  ],
  "tatiana": [
    {
      id: 1,
      title: "TATIANA",
      content: "Modesty, here, is power and elevates her.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: tatiana1,
      mainImageAlt: "Tatiana – full look",
      thumbImageSrc: tatiana2,
      thumbImageAlt: "Tatiana – detail",
    },
    {
      id: 2,
      title: "",
      content: "Within Rose of Resilience, Tatiana embodies izzah, the dignity and honour that begin with self-respect.<br/>Cut entirely in dark ruby silk crepe, the edition pairs a sweeping cape with a coordinating full-length dress. Petals are individually applied by hand around the neckline, creating a sculptural frame in the colour of a rose at its deepest bloom.",
      enterLabel: "",
      enterHref: "",
      mainImageSrc: tatiana3,
      mainImageAlt: "Tatiana Confidence – full look",
      thumbImageSrc: tatiana4,
      thumbImageAlt: "Tatiana Confidence – detail",
    },
  ],
};

// Add simplified slugs as aliases so they work with both URLs (e.g. /product/amara-flame and /product/amara)
productPagesData["malika"] = productPagesData["malika-drape"];
productPagesData["sharifa"] = productPagesData["sharifa-cut"];
productPagesData["safa"] = productPagesData["safa-bloom"];
productPagesData["noor"] = productPagesData["noor-flow"];
productPagesData["amara"] = productPagesData["amara-flame"];
productPagesData["ziya"] = productPagesData["ziya-blue"];
productPagesData["rina"] = productPagesData["rina-lemon"];
productPagesData["halima"] = productPagesData["halime"];
productPagesData["sheraphina"] = productPagesData["seraphina"];

