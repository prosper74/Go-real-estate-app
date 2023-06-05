import { Carousel } from "flowbite-react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "./propertyCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

export default function PropertySlider() {
  return (
    <section>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        loop={true}
        navigation={true}
        className="bg-white rounded-lg shadow-lg"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <SwiperSlide key={i}>
            <PropertyCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
    // <section className="h-[22rem] md:h-64">
    //   <Carousel slideInterval={5000} className="bg-white rounded-lg">
    //     {[1, 2, 3, 4, 5].map((i) => (
    //       <PropertyCard key={i} />
    //     ))}
    //   </Carousel>
    // </section>
  );
}
