import Head from "next/head";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTemplateData } from "@src/store/reducers/templateDataReducer";
import { PageSearchWidget } from "@src/components/common/helpers/searchWidget";
import {
  imageAnimateBottom,
  textAnimate,
} from "@src/components/common/helpers/variants";

export default function BuyProperties({ data }: any) {
  const dispatch = useDispatch();
  const properties = data.properties;
  const templateData = data.templateData;
  dispatch(setTemplateData({ templateData }));

  return (
    <>
      <Head>
        <title>Safe Haven | Buy Properties</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="px-4 mx-auto mt-20 mb-32 sm:!px-10 lg:!px-32">
        <motion.div
          className="mb-16 text-gray-500 sm:text-lg dark:text-gray-400"
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ staggerChildren: 0.5 }}
        >
          <motion.h2
            className="text-4xl tracking-tight font-bold text-gray-900 dark:text-white mb-4"
            variants={textAnimate}
          >
            Buy Today <span className="font-extrabold">With Best Offers</span>
          </motion.h2>

          <motion.span variants={imageAnimateBottom}>
            <PageSearchWidget
              // @ts-ignore
              properties={properties}
              placeholder="Search here..."
              width={""}
              height={""}
              fill={""}
            />
          </motion.span>
        </motion.div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API}/buy`);
  return {
    props: {
      data: res.data,
    },
  };
}
