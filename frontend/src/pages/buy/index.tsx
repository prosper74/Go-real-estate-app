import Head from "next/head";
import { motion } from "framer-motion";
import axios from "axios";
import { textAnimate } from "@src/components/common/variants";
import PropertyCard from "@src/components/common/properties/propertyCard";
import { useDispatch } from "react-redux";
import { setTemplateData } from "@src/store/reducers/templateDataReducer";
import { SingleProperty } from "@src/components/common/interfaces";

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
            className="text-4xl tracking-tight font-bold text-gray-900 dark:text-white"
            variants={textAnimate}
          >
            Buy Today <span className="font-extrabold">With Best Offers</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.length! >= 1 ? (
            properties.map((property: SingleProperty) => (
              <PropertyCard key={property.ID} property={property} />
            ))
          ) : (
            <h4 className="h-52 flex items-center justify-center text-2xl">
              No Item found
            </h4>
          )}
        </div>
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
