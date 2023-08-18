import { Swiper, SwiperSlide } from "swiper/react";
import { SingleProperty } from "../helpers/interfaces";
import PropertyCard from "./propertyCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";
import { useIsMedium, useIsXLarge } from "../hooks/mediaQuery";

interface IProps {
  properties: SingleProperty;
}

export default function PropertySlider({ properties }: IProps) {
  const isMedium = useIsMedium();
  const isXLarge = useIsXLarge();

  return (
    <section>
      <Swiper
        slidesPerView={isXLarge ? 3 : isMedium ? 2 : 1}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
      >
        {properties.length! >= 1 ? (
          properties.map((d: SingleProperty) => (
            <SwiperSlide key={d.ID} className="my-3 m-2">
              <PropertyCard property={d} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <h4 className="h-32 flex items-center justify-center text-2xl">
              No Item found
            </h4>
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
}
