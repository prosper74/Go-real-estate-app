import { useCallback, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { useIsMedium, useIsXLarge } from "../hooks/mediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { SingleProperty, UserProps } from "../helpers/interfaces";
import PropertyCard from "./propertyCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";

interface IProps {
  user?: UserProps;
  properties: SingleProperty;
  tab?: string;
}

export default function PropertySlider({ properties, tab }: IProps) {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [newProperties, setNewProperties] =
    useState<SingleProperty>(properties);

  const handleStatusUpdate = useCallback(
    (propertyID: number, propertyStatus: string) => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_REST_API}/user/update-property-status?user_id=${user?.userId}&property_id=${propertyID}&property_status=${propertyStatus}&jwt=${user?.jwt}`
        )
        .then((res) => {
          if (res.data.error) {
            dispatch(
              setSnackbar({
                status: "error",
                message: res.data.error,
                open: true,
              })
            );
          } else {
            dispatch(
              setSnackbar({
                status: "success",
                message: ` Property status updated`,
                open: true,
              })
            );
          }
          setNewProperties(
            tab == "buy"
              ? res.data.buyProperties
              : tab === "rent"
              ? res.data.rentProperties
              : res.data.shortletPropertie
          );
        })
        .catch((err) => {
          console.error(err);
          dispatch(
            setSnackbar({
              status: "error",
              message:
                " There was an error updating the property item, please contact support",
              open: true,
            })
          );
        });
    },
    []
  );

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
        className="p-12"
      >
        {newProperties.length! >= 1 ? (
          newProperties.map((d: SingleProperty) => (
            <SwiperSlide key={d.ID} className="my-3 pr-3">
              <PropertyCard
                property={d}
                handleStatusUpdate={handleStatusUpdate}
              />
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
