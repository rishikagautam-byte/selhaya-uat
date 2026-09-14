import { motion } from "framer-motion"
import { fadeUp, staggerContainer } from "../../animations/textAnimation.js"
import HeroSection from "../HeroSection"
import CheckerboardGrid from "../global/CheckerboardGrid"
import JournalSection from "../home/JournalSection.js"
import ExploreLink from "../global/ExploreLink.js"
import HouseQuietlyGives from "../global/HouseQuitelyGives.js"
import SEO from "../SEO"
import { SEO_CONFIG } from "../../config/seo"

const section2 = [
  {
    name: "The Luxury Silk Couture Maison",
    description: "Every creation begins with a sketch—lines drawn not in haste but in contemplation. Each silhouette is imagined as a balance of presence and modesty, designed to move gracefully between tradition and modern life. In this quiet act of drawing, intention takes form.",
    image: "/images/craft/sec2-1.webp"
  },
  {
    name: "The Language of Fabrics",
    description: "From silk crepe’s quiet weight to habotai’s delicate sheen, from organza’s luminous transparency to the depth of silk satin, each fabric is chosen not for excess but for its voice. Together they form a symphony of textures—layered, refined, and timeless—crafted to flow like light across the body.",
    image: "/images/craft/sec2-2.webp"
  }
]
const arts = [
  {
    name: "Zari Handwork",
    description: "IIntricate metallic thread embroidery using gold or silver yarn to create rich, ornamental patterns on fabric. Traditionally used in luxury textiles for its reflective, opulent finish.",
    image: "/images/craft/art1.svg"
  },
  {
    name: "Threading Patterns",
    description: "Structured arrangements of stitches or threads forming geometric or floral designs. Defines the visual rhythm and complexity of embroidered surfaces.",
    image: "/images/craft/art2.svg"
  },
  {
    name: "Silk Embroidery",
    description: "Fine needlework done with silk threads, producing smooth texture and subtle sheen. Known for detailed motifs and durability in decorative fabrics.",
    image: "/images/craft/art3.svg"
  },
  {
    name: "Stonework Handsewn",
    description: "Decorative technique where beads, crystals, or stones are stitched onto fabric by hand. Adds dimension, weight, and a jeweled effect to garments or textiles.",
    image: "/images/craft/art4.svg"
  },
]

// const pieces = [
//   {
//     title: "Sacred Technique",
//     desc: "Every stitch holds an ode to artisanal mastery",
//     image: "/images/craft/piece1.svg",
//   },
//   {
//     title: "Timeless Craft",
//     desc: "Centuries preserved through living artistry.",
//     image: "/images/craft/piece2.svg",
//   },
//   {
//     title: "Golden Memory",
//     desc: "Threads of history woven in silk.",
//     image: "/images/craft/piece3.svg",
//   },
// ]

export default function Crafts() {
  return (
    <>
      <SEO
        title={SEO_CONFIG.craft.title}
        description={SEO_CONFIG.craft.description}
        canonical={SEO_CONFIG.craft.canonical}
      />
      {/* Hero */}
      <HeroSection
        image="/images/craft/craft-hero.png"
        title="THE SELHAYA CRAFT"
        desktopText={
          <>
            A journey of hands, heritage, and mindful artistry where each thread <br /> carries purpose and every detail breathes timeless beauty.
          </>
        }
        mobileText="A journey of hands, heritage, and mindful artistry where each thread carries purpose and every detail breathes timeless beauty."
        textColor="text-white"
      />

      {/* section 2 */}
      <CheckerboardGrid items={section2} />

      {/* section 3 */}
      <section className="bg-[url('/images/craft/sec3bg.svg')] bg-cover bg-center h-[70vh] flex items-center justify-center flex-col text-[#F5F1EB] gap-10">
        <p className="max-w-3xl text-[16px] md:text-[20px]  text-center">We believe true luxury begins with respect for the materials we choose, the  techniques we preserve, and the environment we honor. Every thread is selected with intention, every stitch an ode to heritage, and every creation shaped by sustainable practices that stand the test of time.</p>
        <ExploreLink to="/selhaya-silks" text="explore the Art of Pure Silk" />
      </section>

      {/* secton 4 */}
      <section className="bg-primary-light px-6 md:px-14 py-16 md:py-20">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeUp} className="text-[24px] md:text-[32px] md:w-1/2">Selhaya Art</motion.h2>
          <motion.p variants={fadeUp} className="md:w-xl text-[16px] md:text-[20px]">Selhaya selects silks for their natural qualities rather than visual effect. Each material contributes deliberately to the garment's form, movement, and ease of wear.</motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {arts.map((art, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="aspect-[5/3] w-full overflow-hidden">
                <img src={art.image} alt={art.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
              <h3 className="text-[24px] md:text-[28px] mt-2">{art.name}</h3>
              <p className="text-[14px] md:text-[15px] opacity-full">{art.description}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* section 5 */}
      <HouseQuietlyGives
        image="/images/craft/flower.png"
        title="Threads of history woven in silk."
        description="To remember the stillness, the quiet strength, and the power of being fully seen. It is an offering to women who seek elegance without compromise, and a space where presence, intention, and beauty are woven together in  harmony."
      />
      {/* last section */}
      <JournalSection
        title="Selhaya's pieces carry within them the memory of ancient hands."
        rigthDescWidth="2/3"
        description={
          <div className="flex flex-col gap-5">
            <p className="text-left">
              Zari embroidery, once reserved for royal courts; sadu weaving, the language of nomadic tribes; and fine hand-pleating, perfected over centuries—each technique is revived, re-contextualized, and offered new life in the Maison's atelier.
            </p>
            <ExploreLink to="/selhaya-collections" text="Explore Our Collections" textsize="18px" className="font-light" />
          </div>
        }
      // items={pieces.map(piece => ({
      //   title: piece.title,
      //   desc: piece.desc,
      //   img: piece.image,
      //   alt: piece.title,
      //   link: "/selhaya-silks"
      // }))}
      />
    </>
  )
}