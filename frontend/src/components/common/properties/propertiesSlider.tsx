import { useCallback, useState } from "react";
import axios from "axios";
import crypto from "crypto";
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

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string | undefined) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export default function PropertySlider({ properties, tab }: IProps) {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [newProperties, setNewProperties] =
    useState<SingleProperty>(properties);

  const handleDelete = (propertyID: number, images: string[]) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REST_API}/user/properties?user_id=${user?.userId}&property_id=${propertyID}&jwt=${user?.jwt}`
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
          // delete images from cloudinary
          images.map((image) => {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
            const timestamp = new Date().getTime();
            const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_KEY;
            const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_SECRET;
            const signature = generateSHA1(generateSignature(image, apiSecret));
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

            axios
              .post(url, {
                public_id: image,
                signature: signature,
                api_key: apiKey,
                timestamp: timestamp,
              })
              .then(() => {
                dispatch(
                  setSnackbar({
                    status: "success",
                    message: ` Property deleted`,
                    open: true,
                  })
                );
              })
              .catch(() => {
                dispatch(
                  setSnackbar({
                    status: "error",
                    message: ` Unable to remove property images. Please contact support`,
                    open: true,
                  })
                );
              });
          });
        }

        setNewProperties(
          tab == "buy"
            ? res.data.buyProperties
            : tab === "rent"
            ? res.data.rentProperties
            : res.data.shortletProperties
        );
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackbar({
            status: "error",
            message:
              " There was an error deleting item, please contact support",
            open: true,
          })
        );
      });
  };

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
              : res.data.shortletProperties
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
        {newProperties?.length! > 0 ? (
          newProperties.map((d: SingleProperty) => (
            <SwiperSlide key={d.ID} className="my-3 pr-3">
              <PropertyCard
                property={d}
                handleDelete={handleDelete}
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
