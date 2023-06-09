import Head from "next/head";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProperty } from "@src/store/reducers/propertyReducer";
import { setTemplateData } from "@src/store/reducers/templateDataReducer";
import HomeBanner from "@src/components/home_components/banner";
import HowItWorks from "@src/components/home_components/howItWorks";
import FeaturedProperties from "@src/components/home_components/featuredProperties";
import CTASection from "@src/components/home_components/ctaSection";

export default function Home({ data }: any) {
  const dispatch = useDispatch();
  const properties = data.properties;
  const templateData = data.templateData;
  dispatch(setProperty({ properties }));
  dispatch(setTemplateData({ templateData }));  

  return (
    <>
      <Head>
        <title>Safe Haven</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="mt-16">
        <HomeBanner />
        <FeaturedProperties />
        <HowItWorks />
        <CTASection />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API}`);
  return {
    props: {
      data: res.data,
    },
  };
}
