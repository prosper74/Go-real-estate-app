import Head from "next/head";
import axios from "axios";
import { motion } from "framer-motion";
import PropertyCard from "@src/components/common/properties/propertyCard";
import AgentSidebar from "@src/components/common/agent/agentSidebar";
import { SingleProperty, UserProps } from "@src/components/common/helpers/interfaces";
import {
  imageAnimate,
  imageAnimateRight,
} from "@src/components/common/helpers/variants";

interface IProps {
  properties: SingleProperty;
  agent: UserProps;
}

export default function AgentProperties({ properties }: IProps) {
  //@ts-ignore
  const agent = properties[0].User;
  const pageTitle = `Agent | ${agent.FirstName} ${agent.LastName}`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          content={`View all ads of properties posted by ${agent.FirstName}`}
        />
      </Head>

      <main className="px-4 mx-auto my-28 sm:!px-10 lg:!px-32">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.5 }}
        >
          {/* agent sidebar */}
          <motion.div variants={imageAnimate}>
            <AgentSidebar agent={agent} totalCount={properties.length} />
          </motion.div>

          {/* Agent Properties  */}
          <motion.div
            className="col-span-2 lg:col-span-2 2xl:col-span-3"
            variants={imageAnimateRight}
          >
            <div className="grid gap-6">
              {properties.map((property: SingleProperty) => (
                <PropertyCard
                  key={property.ID}
                  property={property}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API}/user?id=${id}`
  );

  return {
    props: {
      properties: res.data.properties,
    },
  };
}
