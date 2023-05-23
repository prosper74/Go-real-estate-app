import Head from "next/head";
import { motion } from "framer-motion";
import { textAnimate } from "@src/components/common/variants";
import PropertyCard from "@src/components/common/properties/propertyCard";

export default function ShortletProperties() {
  return (
    <>
      <Head>
        <title>Safe Haven | Shortlet Properties</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="px-4 mx-auto my-24 sm:!px-10 lg:!px-32">
        {/* <div className="max-w-screen-xl"> */}
        <motion.div
          className="mb-16 text-gray-500 sm:text-lg dark:text-gray-400"
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ staggerChildren: 0.5 }}
        >
          <motion.h2
            className="text-4xl tracking-tight font-bold text-gray-900 dark:text-white"
            variants={textAnimate}
          >
            Stay for a <span className="font-extrabold">Short While</span>
          </motion.h2>
        </motion.div>
        {/* </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <PropertyCard key={i} />
          ))}
        </div>
      </section>
    </>
  );
}
