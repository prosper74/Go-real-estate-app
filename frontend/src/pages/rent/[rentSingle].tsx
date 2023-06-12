import Head from "next/head";
import {
  SingleProperty,
  TemplateData,
} from "@src/components/common/interfaces";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTemplateData } from "@src/store/reducers/templateDataReducer";
import Breadcrumb from "@src/components/common/layouts/breadcrumb";

interface IProps {
  data: {
    property: SingleProperty;
    templateData: TemplateData;
  };
}

export default function RentSingle({ data }: IProps) {
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
        <Breadcrumb category="Rent" property={property.Title} />
        <div className="my-6">Rent</div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API}/rent/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
}
