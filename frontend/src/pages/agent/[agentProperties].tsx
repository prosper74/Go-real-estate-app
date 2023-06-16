import Head from "next/head";
import { SingleProperty, UserProps } from "@src/components/common/interfaces";
import axios from "axios";
import PropertyCard from "@src/components/common/properties/propertyCard";
import AgentSidebar from "@src/components/common/agent/agentSidebar";

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
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {/* agent sidebar */}
          <div>
            <AgentSidebar agent={agent} totalCount={properties.length} />
          </div>

          {/* Agent Properties  */}
          <div className="col-span-2 lg:col-span-2 2xl:col-span-3">
            <div className="grid gap-6">
              {properties.map((property: SingleProperty) => (
                <PropertyCard
                  key={property.ID}
                  property={property}
                  showDescription={true}
                />
              ))}
            </div>
          </div>
        </div>
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
