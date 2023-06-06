import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "./propertyCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";
import { useSelector } from "react-redux";
import { SingleProperty } from "../interfaces";

interface IProps {
  property: SingleProperty;
}

export default function PropertySlider() {
  const properties = useSelector((state: IProps) => state.property);
  console.log("Properties:", properties)

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
        {[1, 2, 3, 4, 5].map((i) => (
          <SwiperSlide key={i}>
            <PropertyCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
