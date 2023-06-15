import Head from "next/head";
import { SingleProperty, UserProps } from "@src/components/common/interfaces";
import axios from "axios";

interface IProps {
  properties: SingleProperty;
  agent: UserProps;
}

export default function AgentProperties({ properties }: IProps) {
  //@ts-ignore
  const agent = properties[0].User
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

      <main className="px-4 mx-auto my-24 sm:!px-10 lg:!px-32">
        <div className="sm:container xs:px-4 md:px-6 xl:px-32 mx-auto bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-0 sm:gap-4 mt-6">
            {/* agent sidebar */}
            <div>
              Agent SideBar
              {/* <AgentSidebar agent={agent} totalCount={properties.length} /> */}
            </div>

            {/* Agent Properties  */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-2 2xl:col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 2xl:gap-1 mb-32">
                {/* {properties.map((property: singleProperties) => (
                  <PropertyCard key={property.id} property={property} />
                ))} */}
                Agent Properties
              </div>
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
