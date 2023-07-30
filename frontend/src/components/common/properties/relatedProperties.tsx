import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "./propertyCard";
import {
  useIsLarge,
  useIsMedium,
  useIsXLarge,
} from "@src/components/common/hooks/mediaQuery";
import { SingleProperty } from "../interfaces";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// install Swiper modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

SwiperCore.use([Pagination, Navigation, Autoplay]);

interface IProps {
  propertyType: string;
  propertyId: number;
}

export const RelatedPropertiesSlide: FC<IProps> = ({
  propertyType,
  propertyId,
}) => {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REST_API}/property?type=${propertyType}`)
      .then((response) => {
        setProperties(response.data.properties);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredProperties = properties.filter(
    (property) => property.ID !== propertyId
  );

  const isMedium = useIsMedium();
  const isLarge = useIsLarge();

  return (
    <div>
      <Swiper
        slidesPerView={isLarge ? 3 : isMedium ? 2 : 1}
        spaceBetween={15}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
      >
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property: SingleProperty) => (
            <SwiperSlide
              key={property.ID}
              className="my-6 bg-white rounded-lg shadow-lg"
            >
              <PropertyCard property={property} fixed={true} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="my-1">
            <h3>No Related Properties Item Found</h3>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};
