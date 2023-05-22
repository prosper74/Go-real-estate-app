import { Tabs } from "flowbite-react";
import { motion } from "framer-motion";
import {
  textAnimate,
  imageAnimate,
} from "@src/components/common/variants";
import {
  HomeIconFixed,
  RentIconFixed,
  ShortletIconFixed,
} from "@src/components/common/svgIcons";
import PropertySlider from "@src/components/common/properties/propertiesSlider";

export default function FeaturedProperties() {
  return (
    <section className="px-4 mx-auto mt-16 mb-32 sm:!px-10 lg:!px-32">
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
            Best Selling
          </motion.p>
          <motion.h2
            className="text-4xl md:text-4xl xl:text-11xl leading-none font-heading font-medium"
            variants={textAnimate}
          >
            Featured Properties
          </motion.h2>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 0.5 }}
          variants={imageAnimate}
        >
          <Tabs.Group aria-label="Tabs with icons" style="underline" className="flex justify-center w-full">
            <Tabs.Item className="text-4xl" title="Buy" icon={HomeIconFixed}>
              <PropertySlider />
            </Tabs.Item>
            <Tabs.Item active={true} title="Rent" icon={RentIconFixed}>
              <PropertySlider />
            </Tabs.Item>
            <Tabs.Item title="Shortlet" icon={ShortletIconFixed}>
              <PropertySlider />
            </Tabs.Item>
          </Tabs.Group>
        </motion.div>        
      </div>
    </section>
  );
}
