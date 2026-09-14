import { useRef } from "react";
import ContactPage from "../../features/contactPage/Advisory.js";
import FloatingLogo from "../global/FloatingLogo.js";
import HeroSection from "../HeroSection.js";
import SEO from "../SEO.js";
import { SEO_CONFIG } from "../../config/seo.js";
import SelectedEngagements from "./SelectedEngagements.js";





export default function CulturalAdvisoryPage() {

  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SEO
        title={SEO_CONFIG.advisory.title}
        description={SEO_CONFIG.advisory.description}
        canonical={SEO_CONFIG.advisory.canonical}
      />
      <div className="w-full">
        {/* hero section */}
        <HeroSection
          title="SELHAYA ADVISORY"
          image="/images/advisory/advisoryHero.png"
          imageAlt=""
          desktopText=<>SELHAYA provides founder-led strategic advisory for consequential decisions, the positioning <br /> required to support them, and the programmes that bring them to life.</>
          mobileText="SELHAYA provides founder-led strategic advisory for consequential decisions, the positioning required to support them, and the programmes that bring them to life."
          buttonText="Begin a Private Conversation"
          onButtonClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
        />
        {/* logo */}
        <FloatingLogo />

        {/* old 2nd section */}
        {/* <section className="relative py-10 md:py-20 px-6 md:px-12 bg-section-bg z-1 text-text">
          <motion.div
            className="md:text-center flex flex-col gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h1
              variants={fadeUp}
              className="text-[24px] md:text-[28px]"
            >
              Why Selhaya
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="space-y-6 max-w-7xl mx-auto"
            >
              <p className="text-[16px] md:text-[20px] text-left md:text-center ">
                Founded on lived fluency across Western and Middle Eastern power structures.
              </p>

              <p className="w-full lg:w-3/4 mx-auto text-[16px] md:text-[20px] text-left md:text-center ">
                Founded by entrepreneurs with backgrounds across luxury fashion,
                public policy and technology, Selhaya brings rare fluency across
                Western and Middle Eastern contexts.
              </p>
              <p className="w-full lg:w-3/4 mx-auto text-[16px] md:text-[20px] text-left md:text-center ">
                As Muslim founders with lived experience operating within royal,
                ministerial and high-net-worth environments, we understand both
                the visible and invisible dynamics that shape trust, access and
                legitimacy.
              </p>

            </motion.div>
          </motion.div>
        </section> */}
        {/* 2nd section — The Advisory Mandate */}
        <section className="bg-section-bg text-text grid grid-cols-1 md:grid-cols-2 min-h-screen">

          <div className="relative overflow-hidden order-2 md:order-1 h-100 md:h-auto">
            <img
              src="/images/advisory/mandate.png"
              alt="The Advisory Mandate"
              className="md:h-full object-cover absolute inset-0 md:p-10 lg:p-20"
            />
          </div>

          {/* Text — top on mobile, right on desktop */}
          <div className="order-1 md:order-2 px-6 md:px-0 pr-6 lg:pr-12 xl:pr-24 py-12 md:py-16 flex flex-col justify-center gap-8 md:gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-[24px] md:text-[32px] leading-tight font-editorial">
                The Advisory Mandate
              </h2>
              <p className="text-[16px] md:text-[20px] dm-sans ">
                SELHAYA advises founders, institutions and private offices at pivotal moments of decision, repositioning and programme development.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[14px] font-bold uppercase dm-sans tracking-wider">
                OUR ADVISORY WORK IS TYPICALLY ENGAGED WHEN:
              </p>

              <div className="flex flex-col">
                {[
                  "A new direction needs to be defined.",
                  "A proposition needs greater authority.",
                  "A founder or organisation is ready to reposition.",
                  "Senior stakeholders need alignment.",
                  "A programme or experience needs purpose.",
                  "A sensitive matter requires independent counsel.",
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between border-t border-text/20 py-4 gap-4 md:gap-8`}
                  >
                    <p className="text-[16px] dm-sans leading-snug">{item}</p>
                    <span className="text-[16px] dm-sans opacity-60 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* 3rd section — Founder-Led by Design */}
        <section className="bg-primary-light text-text flex flex-col border-t border-text/20">

          {/* Row 1: Title + Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:border-b border-text/20 py-10">
            <div className="px-6 md:px-12 xl:px-20">
              <h2 className="text-[32px] leading-tight font-editorial mb-4">
                Founder-Led by Design
              </h2>
            </div>
            <div className="px-6 md:px-12 xl:px-20 flex items-center">
              <p className="text-[16px] md:text-[20px] dm-sans">
                SELHAYA is intentionally founder-led. The people involved in the first conversation remain close to the thinking, decisions, and delivery throughout the engagement.
              </p>
            </div>
          </div>

          {/* Row 2: Two Founders */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-text/20">
            {/* Aisha */}
            <div className="px-6 md:px-12 xl:px-14 py-10 md:py-14 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-text/20">
              <div className="overflow-hidden">
                <img
                  src="/images/advisory/aisha.png"
                  alt="Aisha Hossain"
                  className="aspect-3/4 object-cover object-top"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-[24px] font-editorial">Aisha Hossain</h3>
                <p className="text-[16px] dm-sans leading-relaxed">
                  An Economist and former UK government commercial-policy leader, Aisha spent nearly a decade working across nationally significant infrastructure, commercial policy, public investment and ministerial decision-making.
                  <br />
                  Her experience spans aviation and airports, rail reform, road freight, procurement, legislation and complex stakeholder environments, including work prepared for Ministers, HM Treasury and the Prime Minister's Office.
                </p>
              </div>
            </div>

            {/* Sajjad */}
            <div className="px-6 md:px-12 xl:px-14 py-10 md:py-14 flex flex-col gap-6">
              <div className="overflow-hidden">
                <img
                  src="/images/advisory/sajjad.png"
                  alt="Sajjad Choudhury"
                  className="aspect-3/4 object-cover object-top"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-[24px] font-editorial">Sajjad Choudhury</h3>
                <p className="text-[16px] dm-sans leading-relaxed">
                  Sajjad is a product, technology and operating leader with a decade of experience across B2B and SaaS technology, including Remote, Deel and Onfido.
                  <br />
                  His work spans product strategy, AI and automation, operating models, commercial systems and distributed teams — bringing the execution discipline required to turn strategic thinking into propositions, systems and programmes.
                </p>
              </div>
            </div>
          </div>

          {/* Row 3: Selected Credential */}
          <div className="py-10 px-6 flex flex-col items-center gap-3 text-center">
            <p className="text-[20px] uppercase dm-sans tracking-wider">
              SELECTED CREDENTIAL
            </p>
            <p className="text-[16px] dm-sans">
              Aisha and Sajjad also serve as Honorary Royal Advisors to Her Regal Majesty Queen Temitope{" "}
              <br className="hidden md:block" />
              Enitan-Ogunwusi for the SELHAYA Royal Patron Programme.
            </p>
          </div>

        </section>

        {/* 4th section - Three Ways We Advise */}
        <section className="bg-choclate-brown text-primary-light py-10 md:py-16 px-6 md:px-12 xl:px-20 flex flex-col gap-10 md:gap-14">

          {/* Header: heading left, description right */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1.4fr] gap-6 md:gap-20">
            <h2 className="text-[24px] md:text-[32px] leading-tight font-editorial">
              Three Ways We Advise: Where strategy, <br /> communication and experience meet.
            </h2>
            <div className="flex items-end justify-end">
              <p className="text-[16px] md:text-[20px] dm-sans">
                Every engagement is shaped around the client's{" "}
                <br className="hidden lg:block" />
                mandate, context and required outcome.
              </p>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

            {/* 01 */}
            <div className="flex flex-col gap-6">
              <div className="overflow-hidden">
                <img
                  src="/images/advisory/advise1.png"
                  alt="Strategy & Direction"
                  className="w-full aspect-4/3 object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[20px] font-medium uppercase dm-sans h-12">
                  01 — STRATEGY & DIRECTION
                </p>
                <p className="text-[16px] h-12">
                  For important decisions, propositions and programmes that need a clearer route forward.
                </p>
                <div className="flex flex-col gap-1 pt-2">
                  <p className="text-[20px] font-medium uppercase dm-sans tracking-wide">RESULT</p>
                  <p className="text-[16px]">
                    A clear decision, an agreed direction and a plan people can act on.
                  </p>
                </div>
              </div>
            </div>

            {/* 02 */}
            <div className="flex flex-col gap-6">
              <div className="overflow-hidden">
                <img
                  src="/images/advisory/advise2.png"
                  alt="Positioning & Communication"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[20px] font-medium uppercase dm-sans h-12">
                  02 — POSITIONING & COMMUNICATION
                </p>
                <p className="text-[16px] h-12">
                  For organisations and individuals whose real value is not yet being communicated clearly or consistently.
                </p>
                <div className="flex flex-col gap-1 pt-2">
                  <p className="text-[20px] font-medium uppercase dm-sans tracking-wide">RESULT</p>
                  <p className="text-[16px]">
                    A stronger position, a clearer message and communication that reflects the client's real value.
                  </p>
                </div>
              </div>
            </div>

            {/* 03 */}
            <div className="flex flex-col gap-6">
              <div className="overflow-hidden">
                <img
                  src="/images/advisory/advise3.png"
                  alt="Programmes & Experiences"
                  className="w-full aspect-4/3 object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[20px] font-medium uppercase dm-sans h-12">
                  03 — PROGRAMMES & EXPERIENCES
                </p>
                <p className="text-[16px] h-12">
                  For initiatives, launches and events that must be credible, coherent and remembered.
                </p>
                <div className="flex flex-col gap-1 pt-2">
                  <p className="text-[20px] font-medium uppercase dm-sans tracking-wide">RESULT</p>
                  <p className="text-[16px]">
                    A coherent programme or experience that people understand, value and remember.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5th section — Tailored in Application */}
        <section className="bg-white   text-text py-16 md:py-24 px-6 md:px-8 xl:px-20 flex flex-col gap-12 md:gap-16">

          {/* Header — centered */}
          <div className="flex flex-col items-start lg:items-center text-left lg:text-center gap-4">
            <h2 className="text-[24px] md:text-[36px] leading-tight font-editorial">
              Tailored in Application. Disciplined in Delivery.
            </h2>
            <p className="text-[16px] dm-sans max-w-lg">
              Every engagement is structured around the client's mandate and delivered through a disciplined four-stage process.
            </p>
          </div>

          {/* Desktop stages */}
          <div className="hidden md:flex flex-col gap-8 ">

            {/* Labels row — label, then line+arrowhead flush together */}
            <div className="flex items-center px-16 xl:px-22">
              {["DIAGNOSE", "DISTIL", "DESIGN", "DELIVER"].map((label, i, arr) => (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <span className="shrink-0 text-[24px] font-editorial tracking-widest w-24">{label}</span>
                  {i < arr.length - 1 && (
                    <div className="flex-1 flex items-center mx-4 relative">
                      <div className="flex-1 h-px bg-text/30" />
                      <span className="shrink-0 text-[16px] leading-none text-text/40">{">"}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Descriptions — 4 equal columns */}
            <div className="grid grid-cols-4 gap-8 text-center wrap-break-word">
              <p>We understand the{" "}<br className="hidden lg:block" />{" "}decision, context, people,{" "}<br className="hidden lg:block" />{" "}and constraints.</p>
              <p>We reduce complexity to{" "}<br className="hidden lg:block" />{" "}the central question,{" "}<br className="hidden lg:block" />{" "}position and priorities.</p>
              <p>We build the strategy,{" "}<br className="hidden lg:block" />{" "}narrative, programme or{" "}<br className="hidden lg:block" />{" "}experience required.</p>
              <p>We provide the recommendations,{" "}<br className="hidden lg:block" />{" "}materials, roadmap & counsel{" "}<br className="hidden lg:block" />{" "}needed to move it forward.</p>
            </div>
          </div>

          {/* Mobile — vertical stages with down arrows */}
          <div className="flex md:hidden flex-col">
            {[
              { label: "Diagnose", desc: "We understand the decision, context, people & constraints." },
              { label: "Distil", desc: "We reduce the complexity to the central question, position & priorities." },
              { label: "Design", desc: "We build the strategy, narrative, programme or experience required." },
              { label: "Deliver", desc: "We provide the recommendations, materials, roadmap & counsel needed to move it forward." },
            ].map((stage, i, arr) => (
              <div key={stage.label} className="flex flex-col">
                <div className="flex flex-col gap-2 py-5 lg:border-t border-text/20">
                  <p className="text-[20px] font-editorial">{stage.label}</p>
                  <p className="text-[16px] dm-sans leading-relaxed">{stage.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <span className="text-[18px] text-text/30 py-2"><svg width="8" height="61" viewBox="0 0 8 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.23431 0.491668C3.2297 0.215564 3.00215 -0.00453229 2.72604 6.94394e-05C2.44994 0.00467117 2.22984 0.232228 2.23444 0.508332L2.73438 0.5L3.23431 0.491668ZM3.38676 60.8594C3.58525 61.0514 3.90179 61.0461 4.09377 60.8476L7.22228 57.613C7.41427 57.4146 7.40899 57.098 7.2105 56.906C7.01201 56.7141 6.69547 56.7193 6.50349 56.9178L3.72259 59.793L0.847423 57.0121C0.648934 56.8201 0.332396 56.8254 0.140415 57.0239C-0.0515665 57.2224 -0.0462908 57.5389 0.152198 57.7309L3.38676 60.8594ZM2.73438 0.5L2.23444 0.508332L3.23444 60.5083L3.73437 60.5L4.23431 60.4917L3.23431 0.491668L2.73438 0.5Z" fill="#281B13" />
                  </svg>
                  </span>
                )}
              </div>
            ))}
            <div className="lg:border-t border-text/20" />
          </div>

        </section>

        <section className="bg-primary-light text-center py-10 ">
          <h4 className="text-[28px] md:text-[32px] font-editorial">Selected case studies <br />
            executed within high-sensitivity environments</h4>
        </section>

        <SelectedEngagements />

        <div ref={contactRef}>
          <ContactPage />
        </div>
      </div>
    </>
  );
}