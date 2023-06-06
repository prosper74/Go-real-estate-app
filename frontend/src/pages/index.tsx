import Head from "next/head";
import { useDispatch } from "react-redux";
import { setProperty } from "@src/store/reducers/propertyReducer";
import { setTemplateData } from "@src/store/reducers/templateDataReducer";
import HomeBanner from "@src/components/home_components/banner";
import HowItWorks from "@src/components/home_components/howItWorks";
import FeaturedProperties from "@src/components/home_components/featuredProperties";
import CTASection from "@src/components/home_components/ctaSection";
import axios from "axios";

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
  const res = await axios.get(`http://localhost:8080`);
  return {
    props: {
      data: res.data,
    },
  };
}
