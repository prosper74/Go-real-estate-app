// index.tsx
import React, { FC } from "react";
import Head from "next/head";
import { SingleProperty } from "@src/components/common/interfaces";
import axios from "axios";
// import SidebarCard from '@src/components/common/properties/sidebarCard';
// import { formData } from '@src/components/common/properties/sidebarData';
// import Breadcrumb from '@src/components/common/layouts/breadcrumb';
// import SingleProperty from '@src/components/common/properties/singleProperty';
// import axios from 'axios';

interface IProps {
  properties: {
    0: SingleProperty;
  };
}

const RentSingle: FC<IProps> = ({ data }: any) => {
  console.log("data:", data);
  return (
    <>
      <Head>
        <title>Rent |{/* {property.title} */}</title>
        <link rel="icon" href="/favicon.png" />
        <meta content="View all ads of properties that are to be sold" />
      </Head>

      <main className="px-4 mx-auto my-24 sm:!px-10 lg:!px-32">
        <div className="sm:container xs:px-4 sm:px-6 xl:px-32 mx-auto bg-white">
          {/* <Breadcrumb category="Rent" property={property.title} /> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 sm:gap-6 mt-6">
            Rent
            {/* main properties  */}
            {/* <div className="col-span-2">
              <SingleProperty property={property} />
            </div> */}
            {/* SideBar  */}
            {/* <div className="">
              {formData.map((d) => (
                <SidebarCard key={d.id} data={d} property={property} />
              ))}
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default RentSingle;

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  // const rentSingleId = rentSingle.slice(rentSingle.length - 24);
  // const res = await axios
  //   .get(`${process.env.NEXT_PUBLIC_REST_API}/adverts?id=${rentSingleId}`)
  //   .then((response) => response.data)
  //   .catch((err) => {
  //     console.error(err);
  //   });

  const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API}/rent/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
}
