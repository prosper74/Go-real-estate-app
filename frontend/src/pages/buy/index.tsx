import Head from "next/head";
import { motion } from "framer-motion";
import { textAnimate } from "@src/components/common/variants";

export default function BuyProperties() {
  return (
    <>
      <Head>
        <title>Safe Haven | Buy Properties</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="px-4 mx-auto my-24 sm:!px-10 lg:!px-32">
        <div className="max-w-screen-xl">
          <motion.div
            className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400"
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ staggerChildren: 0.5 }}
          >
            <motion.h2
              className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white"
              variants={textAnimate}
            >
              Buy Today <span className="font-extrabold">With Best Offers</span>
            </motion.h2>
            <div>
              
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
