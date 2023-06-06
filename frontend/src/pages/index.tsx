import Head from "next/head";
import HomeBanner from "@src/components/home_components/banner";
import HowItWorks from "@src/components/home_components/howItWorks";
import FeaturedProperties from '@src/components/home_components/featuredProperties';
import CTASection from "@src/components/home_components/ctaSection";
import axios from "axios";

export default function Home({properties}: any) {
  console.log("Properties: ", properties.properties)

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
      properties: res.data,
    },
  };
}
