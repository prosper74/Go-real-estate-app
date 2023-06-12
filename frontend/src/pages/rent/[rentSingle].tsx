import React, { FC } from "react";
import Head from "next/head";
import { SingleProperty } from "@src/components/common/interfaces";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTemplateData } from "@src/store/reducers/templateDataReducer";

interface IProps {
  property: SingleProperty;
}

const RentSingle: FC<IProps> = ({ data }: any) => {
  const dispatch = useDispatch();
  const property = data.property;
  const templateData = data.templateData;
  dispatch(setTemplateData({ templateData }));
  console.log("property:", property);

  return (
    <>
      <Head>
        <title>Rent | {property.Title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta content="View all ads of properties that are to be sold" />
      </Head>

      <main className="px-4 mx-auto my-24 sm:!px-10 lg:!px-32">
        <div className="sm:container xs:px-4 sm:px-6 xl:px-32 mx-auto bg-white">
          {/* <Breadcrumb category="Rent" property={property.title} /> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 sm:gap-6 mt-6">
            Rent
          </div>
        </div>
      </main>
    </>
  );
};

export default RentSingle;

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API}/rent/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
}
