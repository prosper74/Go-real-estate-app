import Head from 'next/head';
import axios from 'axios';
// import HomeBanner from '@src/components/home/banner';
// import HowItWorks from '@src/components/home/howItWorks';
// import FeaturedProperties from '@src/components/home/featured';
// import CTASection from '@src/components/home/ctaSection';
import { singleProperties } from '@src/components/common/interfaces';

interface IProps {
  properties: singleProperties;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Safe Haven</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="mt-16">
        {/* <HomeBanner properties={properties} />
        <FeaturedProperties properties={properties} />
        <HowItWorks />
        <CTASection /> */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident beatae porro corporis nulla voluptate cupiditate, aperiam adipisci repudiandae unde, natus esse nesciunt? Dicta quo consectetur corporis saepe possimus. Cum, excepturi.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident beatae porro corporis nulla voluptate cupiditate, aperiam adipisci repudiandae unde, natus esse nesciunt? Dicta quo consectetur corporis saepe possimus. Cum, excepturi.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident beatae porro corporis nulla voluptate cupiditate, aperiam adipisci repudiandae unde, natus esse nesciunt? Dicta quo consectetur corporis saepe possimus. Cum, excepturi.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident beatae porro corporis nulla voluptate cupiditate, aperiam adipisci repudiandae unde, natus esse nesciunt? Dicta quo consectetur corporis saepe possimus. Cum, excepturi.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident beatae porro corporis nulla voluptate cupiditate, aperiam adipisci repudiandae unde, natus esse nesciunt? Dicta quo consectetur corporis saepe possimus. Cum, excepturi.
      </main>
    </>
  );
};

// export async function getServerSideProps() {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API}/adverts`);
//   return {
//     props: {
//       properties: res.data,
//     },
//   };
// }
