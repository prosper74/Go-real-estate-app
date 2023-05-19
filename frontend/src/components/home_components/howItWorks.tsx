import { motion } from "framer-motion";
import {
  textAnimate,
  imageAnimateTop,
  imageAnimateBottom,
  imageAnimateRight,
  imageAnimate,
} from "@src/components/common/variants";

export default function HowItWorks() {
  return (
    <section className="px-4 mx-auto my-32 sm:!px-10 lg:!px-32">
      <div>
        <motion.div
          className="mb-10 text-center"
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ staggerChildren: 0.5 }}
        >
          <motion.p
            className="block mb-2 text-xs leading-4 font-medium uppercase tracking-widest text-gray-500"
            variants={textAnimate}
          >
            How it works
          </motion.p>
          <motion.h2
            className="text-4xl md:text-4xl xl:text-11xl leading-none font-heading font-medium"
            variants={textAnimate}
          >
            Easy to use
          </motion.h2>
        </motion.div>

        <div className="flex flex-wrap md:flex-nowrap items-center justify-center">
          <div className="w-full mb-12 md:mb-0">
            <motion.div
              className="flex flex-wrap"
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ staggerChildren: 0.5 }}
            >
              <motion.div
                className="w-full md:w-1/2 xl:w-1/3 px-4"
                variants={imageAnimate}
              >
                <div className="relative max-w-sm mx-auto mb-8">
                  <motion.div
                    className="relative pt-16 pb-20 px-8 md:px-16 bg-white border border-black border-opacity-10 z-10 rounded-3xl"
                    initial={"offscreen"}
                    whileInView={"onscreen"}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ staggerChildren: 0.5 }}
                  >
                    <motion.div
                      className="relative inline-flex items-center justify-center mb-8 w-12 h-12 leading-6 text-white bg-purple-700 rounded-full"
                      variants={imageAnimate}
                    >
                      <span className="text-2xl font-bold">1</span>
                    </motion.div>
                    <motion.h2
                      className="mb-4 text-2xl lg:text-3xl leading-tight font-medium font-heading"
                      variants={textAnimate}
                    >
                      Filter and Search
                    </motion.h2>
                    <motion.p
                      className="text-lg text-darkBlueGray-400"
                      variants={textAnimate}
                    >
                      Browse our list of homes and properties, and find your
                      favourite space.
                    </motion.p>
                  </motion.div>
                  <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 w-11/12 h-24 border border-black border-opacity-10 rounded-3xl"></div>
                </div>
              </motion.div>

              <motion.div
                className="w-full md:w-1/2 xl:w-1/3 px-4"
                variants={imageAnimateTop}
              >
                <div className="relative max-w-sm mx-auto xl:mt-10 mb-8">
                  <div className="relative pt-16 pb-20 px-8 md:px-16 bg-white border border-black border-opacity-10 z-10 rounded-3xl">
                    <div className="relative inline-flex items-center justify-center mb-8 w-12 h-12 leading-6 text-white bg-purple-700 rounded-full">
                      <span className="text-2xl font-bold">2</span>
                    </div>
                    <h2 className="mb-4 text-2xl lg:text-3xl leading-tight font-medium font-heading">
                      Schedule Viewing
                    </h2>
                    <p className="text-lg text-darkBlueGray-400">
                      Look through our available properties and schedule a
                      viewing.
                    </p>
                  </div>
                  <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 w-11/12 h-24 border border-black border-opacity-10 rounded-3xl"></div>
                </div>
              </motion.div>

              <motion.div
                className="w-full md:w-1/2 xl:w-1/3 px-4"
                variants={imageAnimateRight}
              >
                <div className="relative max-w-sm mx-auto mb-8">
                  <div className="relative pt-16 pb-20 px-8 md:px-16 bg-white border border-black border-opacity-10 z-10 rounded-3xl">
                    <div className="relative inline-flex items-center justify-center mb-8 w-12 h-12 leading-6 text-white bg-purple-700 rounded-full">
                      <span className="text-2xl font-bold">3</span>
                    </div>
                    <h2 className="mb-4 text-2xl lg:text-3xl leading-tight font-medium font-heading">
                      Make an Offer
                    </h2>
                    <p className="text-lg text-darkBlueGray-400">
                      Make payment and prepare to move into your new space.
                    </p>
                  </div>
                  <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 w-11/12 h-24 border border-black border-opacity-10 rounded-3xl"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="flex w-44 h-1 mx-auto bg-purple-600"
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 0.7 }}
          variants={imageAnimateRight}
        />
      </div>
    </section>
  );
}
