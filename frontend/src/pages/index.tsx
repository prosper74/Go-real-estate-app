import Head from "next/head";
import HomeBanner from "@src/components/home_components/banner";
// import HowItWorks from '@src/components/home/howItWorks';
// import FeaturedProperties from '@src/components/home/featured';
import CTASection from '@src/components/home_components/ctaSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Safe Haven</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="mt-16">
        <HomeBanner />
        <CTASection /> 
        {/* <FeaturedProperties properties={properties} />
        <HowItWorks />
        */}
      </main>
    </>
  );
}
