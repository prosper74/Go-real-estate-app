import Head from "next/head";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setTemplateData } from "@src/store/reducers/templateDataReducer";
import Breadcrumb from "@src/components/common/layouts/breadcrumb";
import { formData } from "@src/components/common/properties/sidebarData";
import SidebarCard from "@src/components/common/properties/sidebarCard";
import {
  SingleProperty,
  TemplateData,
} from "@src/components/common/helpers/interfaces";
import {
  imageAnimate,
  imageAnimateRight,
} from "@src/components/common/helpers/variants";
import SinglePropertyBody from "@src/components/common/properties/singleProperty";
import { RelatedPropertiesSlide } from "@src/components/common/properties/relatedProperties";

interface IProps {
  data: {
    property: SingleProperty;
    templateData: TemplateData;
  };
}

export default function BuySingle({ data }: IProps) {
  const dispatch = useDispatch();
  const property = data.property;
  const templateData = data.templateData;
  dispatch(setTemplateData({ templateData }));

  const pageTitle = `${property.Category.Title} | ${property.Title}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.png" />
        <meta content="View all ads of properties that are to be sold" />
      </Head>

      <motion.main className="px-4 mx-auto my-24 sm:!px-10 lg:!px-32">
        <Breadcrumb
          category={property.Category.Title}
          property={property.Title}
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-0 sm:gap-6 mt-6"
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.5 }}
        >
          {/* main properties  */}
          <motion.div className="col-span-2" variants={imageAnimate}>
            <SinglePropertyBody property={property} />
          </motion.div>

          {/* SideBar  */}
          <motion.div variants={imageAnimateRight}>
            {formData.map((d) => (
              <SidebarCard key={d.id} data={d} property={property} />
            ))}
          </motion.div>
        </motion.div>

        {/* Related properties  */}
        <h3 className="text-3xl font-medium mt-16 mb-3">Related Properties</h3>
        <RelatedPropertiesSlide
          propertyType={property.Type}
          propertyId={property.ID}
        />
      </motion.main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API}/buy/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
}
