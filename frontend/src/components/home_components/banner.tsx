import { motion } from "framer-motion";
import {
  textAnimate,
  imageAnimateTop,
  imageAnimateBottom,
} from "@src/components/common/variants";
import { SingleProperty } from "../common/interfaces";
import SearchWidget from "../common/searchWidget";

export default function HomeBanner() {

  return (
    <section className="bg-purple-100 pb-8 2xl:pb-12 px-4 mx-auto sm:!px-10 lg:!px-32 overflow-hidden">
      <div className="relative rounded-b-10xl">
        <div className="">
          <div className="flex flex-wrap items-center pt-8 pb-16">
            <motion.div
              className="w-full md:w-1/2 mb-24 lg:mb-0"
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ staggerChildren: 0.5 }}
            >
              <motion.p
                className="block mb-4 font-medium tracking-widest uppercase text-sm text-purple-600"
                variants={textAnimate}
              >
                A Better Way to Live
              </motion.p>
              <motion.h1
                className="max-w-xl mb-4 font-heading font-medium text-3xl md:text-5xl xl:text-8xl leading-none"
                variants={textAnimate}
              >
                <span>Find Your Way </span>
                <span className="relative inline-block">
                  <span className="relative"> Home</span>
                </span>
              </motion.h1>
              <motion.p
                className="mb-10 lg:mb-12 text-xl text-darkBlueGray-400 leading-snug"
                variants={textAnimate}
              >
                Get the best deals for your new home...
              </motion.p>
              {/* Search widget  */}
              <motion.span variants={imageAnimateBottom}>
                <SearchWidget
                  placeholder="Start here..."
                  width={""}
                  height={""}
                  fill={""}
                />
              </motion.span>
            </motion.div>
            <div className="w-full md:w-1/2">
              <motion.div
                className="relative max-w-sm xl:max-w-none mx-auto"
                initial={"offscreen"}
                whileInView={"onscreen"}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ staggerChildren: 0.5 }}
              >
                <motion.img
                  className="relative xl:max-w-max"
                  src="assets/images/widget.png"
                  alt=""
                  variants={imageAnimateTop}
                />
                <motion.img
                  className="absolute -top-3 -left-24 xl:max-w-max"
                  src="assets/images/elipse.png"
                  alt=""
                  variants={imageAnimateBottom}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
