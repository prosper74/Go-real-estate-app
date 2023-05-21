import Head from "next/head";
import HomeBanner from "@src/components/home_components/banner";
import HowItWorks from "@src/components/home_components/howItWorks";
import FeaturedProperties from '@src/components/home_components/featuredProperties';
import CTASection from "@src/components/home_components/ctaSection";

export default function Home() {
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
