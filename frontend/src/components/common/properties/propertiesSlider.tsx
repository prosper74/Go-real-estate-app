import { Swiper, SwiperSlide } from "swiper/react";
import { SingleProperty } from "../interfaces";
import PropertyCard from "./propertyCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";

export default function PropertySlider({ properties }: any) {
  return (
    <section>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        className="bg-white rounded-lg shadow-lg"
      >
        {properties.map((d: SingleProperty) => (
          <SwiperSlide key={d.ID}>
            <PropertyCard property={d} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
