import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

const cases = [
  {
    id: "01",
    title: "Luxury Private Member's Club",
    type: "INTERNATIONAL EVENT CONCEPT",
    engagement: "Clarity & Positioning Sprint | 2 Weeks",
    situation: "An international women's luxury private members' club sought to introduce a London event while preserving the cultural identity valued by its membership.",
    role: "Defined the strategic theme and event concept, identified and secured suitable London venues, shaped the guest journey and visual direction, and prepared the concept for senior review.",
    outcome: "Leadership approval, launch communications, and subsequent membership interest.",
    bigImage: "/images/advisory/engagement/big1.png",
    smallImage: "/images/advisory/engagement/small1.png",
    sidebarNote: "Much of Selhaya's advisory work remains private by nature",
  },
  {
    id: "02",
    title: "Women-Led Mobility Platform",
    type: "MINISTRY-FACING PROPOSITION",
    engagement: "Tailored Advisory Project | 6 Weeks",
    situation: "A women-led mobility and sustainability initiative under Royal Highness patronage required a credible commercial model and proposition suitable for discussion with government ministries.",
    role: "Developed the concept to address model, brand identity, visual direction and ministry-facing proposition.",
    outcome: "A coherent proposition connecting user need, commercial viability, social impact and public-policy relevance, generating positive early interest from government stakeholders.",
    bigImage: "/images/advisory/engagement/big2.png",
    smallImage: "/images/advisory/engagement/small2.png",
    sidebarNote: "Much of Selhaya's advisory work remains private by nature",
  },
  {
    id: "03",
    title: "Royal Cultural Programme",
    type: "FOUNDER & EXECUTIVE COUNSEL | MONTHLY",
    engagement: "Tailored Advisory Project | 6 Weeks",
    situation: "A royal principal and private office required continuing strategic counsel to develop a cultural and philanthropic programme with credible structure, partners and public expression.",
    role: "Advised on programme architecture, partnerships, event curation, communications, publications and delivery.",
    outcome: "An evolving cultural platform translated into defined initiatives, consolidated communications and high-profile audience experiences aligned with the principal's aims.",
    bigImage: "/images/advisory/engagement/big3.png",
    smallImage: "/images/advisory/engagement/small3.png",
    sidebarNote: "Client identities withheld by agreement.",
  },
];

export default function SelectedEngagements() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = cases[activeIndex];

  return (
    <section>
      {/* Desktop: 3-col layout — no top heading, starts directly */}
      <div className="relative hidden md:grid grid-cols-[1.9fr_2fr_0.85fr] lg:h-screen">

        {/* Col 1 — large image + prev nav at bottom left */}
        <div className="relative overflow-hidden bg-text">
          <AnimatePresence mode="wait">
            <motion.img
              key={active.id + "-big"}
              src={active.bigImage}
              alt={active.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

        </div>

        {/* Col 2 — dark bg, small thumbnail top-right, then case content */}
        <div className="bg-text text-primary-light px-8 xl:px-12 py-8 flex flex-col items-end gap-6 border-l justify-between border-white/10">
          {/* Thumbnail — top right corner */}
          <div className="flex justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-thumb"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-32 h-42 overflow-hidden shrink-0"
              >
                <img src={active.smallImage} alt="" className="w-full h-full object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Case content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + "-content"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-5 mb-4"
            >
              {/* ID + Title + Type */}
              <div className="flex flex-col gap-1 mb-4">
                <p className="text-[24px] mb-2">{active.id}</p>
                <h3 className="text-[24px] font-editorial leading-tight">{active.title}</h3>
                <p className="text-[16px] uppercase dm-sans">{active.type}</p>
              </div>

              {/* Sections */}
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-[16px] font-medium uppercase mb-2">ENGAGEMENT:</p>
                  <p className="text-[14px]">{active.engagement}</p>
                </div>
                <div>
                  <p className="text-[16px] font-medium uppercase mb-2">THE SITUATION</p>
                  <p className="text-[14px]">{active.situation}</p>
                </div>
                <div>
                  <p className="text-[16px] font-medium uppercase mb-2">SELHAYA'S ROLE</p>
                  <p className="text-[14px]">{active.role}</p>
                </div>
                <div>
                  <p className="text-[16px] font-medium uppercase mb-2">OUTCOME</p>
                  <p className="text-[14px]">{active.outcome}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Col 3 — light/cream sidebar, dark text, next nav at bottom */}
        <div className="bg-section-bg text-text py-8 flex flex-col justify-between border-l border-text/10">
          <div className="flex flex-col my-20 justify-between h-full gap-6">
            {/* Heading + note */}
            <div className="flex flex-col gap-3 px-3 ">
              <p className="text-[24px] font-semibold uppercase">
                SELECTED<br />ENGAGEMENTS
              </p>
              <p className="text-[16px]">{active.sidebarNote}</p>
            </div>

            {/* Case nav list — lower down */}
            <div className="flex flex-col divide-y divide-text/40  border-y  border-text/40 ">
              {cases.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActiveIndex(i)}
                  className={"text-left px-3 py-8 text-[16px] leading-snug transition-opacity"}
                >
                  <span className={`${i === activeIndex ? "opacity-100 font-medium" : "opacity-50 hover:opacity-80"}`}>{c.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-[1.5%] left-6 z-10">
          {activeIndex > 0 && (
            <button
              onClick={() => setActiveIndex((i) => i - 1)}
              className="text-[16px] uppercase text-white"
            >
              ← PREVIOUS CASE STUDY
            </button>
          )}
        </div>

        {/* Next case study — bottom of sidebar */}
        <div className="absolute bottom-0.5 right-6 z-10">
          {activeIndex < cases.length - 1 && (
            <button
              onClick={() => setActiveIndex((i) => i + 1)}
              className="text-[16px] uppercase px-3"
            >
              NEXT CASE STUDY →
            </button>
          )}
        </div>
      </div>

      {/* Mobile: Swiper */}
      <div className="md:hidden bg-text text-white">
        <Swiper slidesPerView={1} spaceBetween={0}>
          {cases.map((c) => (
            <SwiperSlide key={c.id}>
              <div className="flex flex-col">
                {/* Big image */}
                <div className="h-[300px] overflow-hidden">
                  <img src={c.bigImage} alt={c.title} className="w-full h-full object-cover" />
                </div>
                {/* Content */}
                <div className="px-6 py-8 flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <p className="text-[24px] mb-2">{c.id}</p>
                    <h3 className="text-[24px] font-editorial">{c.title}</h3>
                    <p className="text-[16px] uppercase dm-sans mt-2">{c.type}</p>
                  </div>
                  <div className="flex flex-col gap-8">
                    <div><p className="text-[16px] mb-3 font-medium uppercase">ENGAGEMENT:</p><p className="text-[14px] font-light">{c.engagement}</p></div>
                    <div><p className="text-[16px] mb-3 font-medium uppercase">THE SITUATION</p><p className="text-[14px] font-light ">{c.situation}</p></div>
                    <div><p className="text-[16px] mb-3 font-medium uppercase">SELHAYA'S ROLE</p><p className="text-[14px] font-light ">{c.role}</p></div>
                    <div><p className="text-[16px] mb-3 font-medium uppercase">OUTCOME</p><p className="text-[14px] font-light ">{c.outcome}</p></div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
