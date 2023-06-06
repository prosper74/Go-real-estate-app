import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "./propertyCard";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
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
        className="bg-white rounded-lg shadow-lg"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <SwiperSlide key={i}>
            <PropertyCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
