import { motion } from "framer-motion";
import {
  textAnimate,
  imageAnimateTop,
  imageAnimateBottom,
  imageAnimateRight,
} from "@src/components/common/helpers/variants";
import { AppleIcon, GooglePlayIcon } from "../common/helpers/svgIcons";

export default function CTASection() {
  return (
    <section className="items-center overflow-hidden px-4 mx-auto my-32 sm:!px-10 lg:!px-32">
      <div className="flex flex-col gap-6 md:flex-row relative">
        <motion.div
          className="flex flex-col relative mb-6"
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ staggerChildren: 0.5 }}
        >
          <motion.span
            className="w-20 h-2 bg-gray-800 dark:bg-white mb-12"
            variants={imageAnimateTop}
          />
          <motion.h1
            className="font-bebas-neue uppercase text-2xl md:text-3xl xl:text-4xl font-black flex flex-col leading-none dark:text-white text-gray-800"
            variants={textAnimate}
          >
            Our mobile app is coming soon.
          </motion.h1>

          <motion.p
            className="mt-3 text-sm sm:text-base text-gray-700 dark:text-white"
            variants={textAnimate}
          >
            Dimension of reality that makes change possible and understandable.
            An indefinite and homogeneous environment in which natural events
            and human existence take place.
          </motion.p>

          <motion.div
            className="flex flex-row mt-8"
            variants={imageAnimateBottom}
          >
            <div className="flex mt-3 mr-2 w-48 h-14 bg-black text-white rounded-lg items-center justify-center cursor-pointer">
              <div className="mr-3">
                <GooglePlayIcon />
              </div>
              <div>
                <div className="text-xs">Get it on</div>
                <div className="text-xs xs:text-lg font-semibold font-sans mt-1">
                  Google Play
                </div>
              </div>
            </div>
            <div className="flex mt-3 w-48 h-14 bg-transparent text-black border border-black rounded-xl items-center justify-center cursor-pointer">
              <div className="mr-3">
                <AppleIcon />
              </div>
              <div>
                <div className="text-xs">Download on the</div>
                <div className="text-xs xs:text-lg font-semibold font-sans -mt-1">
                  App Store
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <div>
          <motion.img
            src="/assets/images/mobile-app.png"
            className="max-w-[300px] sm:max-w-lg"
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: false, amount: 0.3 }}
            variants={imageAnimateRight}
          />
        </div>
      </div>
    </section>
  );
}
