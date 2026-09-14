import { Link } from "react-router-dom"
import { staggerContainer, fadeUp } from "../../../src/animations/textAnimation.js"
import { motion } from "framer-motion"

function Bespoke() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 bg-choclate-brown text-primary-light">
            <div className="order-1 md:order-2 w-full h-125 md:h-auto">
                <img src="/images/home/bespoke.png"
                    alt="Garments of Presence"
                    className="w-full h-125 md:h-screen object-cover object-top" />
            </div>
            <div className="order-2 md:order-1 px-6 py-12 lg:p-20 flex flex-col justify-between">
                <motion.div
                    className="text"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-[24px] md:text-[32px] mb-6">The Pinnacle of Luxury: <br />
SELHAYA Garments</motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="text-[16px] md:text-[20px] ">
                        Selhaya abayas aren’t just worn they are chosen for moments of significance, celebration, and cultural honour. From distinguished gatherings to timeless personal expression, these pieces carry quiet grace and meaningful presence.
                    </motion.p>
                </motion.div>
                <div className="mt-10 space-y-2 md:space-y-4">

                    <Link to="/bespoke" className="group text-[16px] md:text-[20px] w-fit flex flex-col gap-2">
                        <p className="flex items-center gap-2">
                            <span className="underline uppercase">explore  bespoke</span>
                            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 2.78516H8M6.26087 5.28516L8 2.78516L6.26087 0.285156" stroke="white" />
                            </svg>
                        </p>
                        <img
                            src="/images/home/bespokeSmall.png"
                            alt="Sovereign Robe"
                            className="w-42 md:h-42 object-cover object-top"
                        />

                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Bespoke