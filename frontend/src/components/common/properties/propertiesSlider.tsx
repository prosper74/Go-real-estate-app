import { Swiper, SwiperSlide } from "swiper/react";
import { SingleProperty } from "../helpers/interfaces";
import PropertyCard from "./propertyCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";

interface IProps {
  properties: SingleProperty;
}

export default function PropertySlider({ properties }: IProps) {
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
        {properties.length! >= 1 ? (
          properties.map((d: SingleProperty) => (
            <SwiperSlide key={d.ID}>
              <PropertyCard property={d} showDescription={true} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide >
            <h4 className="h-52 flex items-center justify-center text-2xl">No Item found</h4>
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
}
