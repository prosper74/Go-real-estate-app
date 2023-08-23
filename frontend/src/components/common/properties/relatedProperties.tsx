import React, { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import crypto from "crypto";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "./propertyCard";
import {
  useIsMedium,
  useIsXLarge,
} from "@src/components/common/hooks/mediaQuery";
import { SingleProperty, UserProps } from "../helpers/interfaces";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// install Swiper modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";

SwiperCore.use([Pagination, Navigation, Autoplay]);

interface IProps {
  user: UserProps;
  propertyType: string;
  propertyId: number;
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

export const RelatedPropertiesSlide: FC<IProps> = ({
  propertyType,
  propertyId,
}) => {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [properties, setProperties] = useState<any[]>([]);

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

          axios
            .get(
              `${process.env.NEXT_PUBLIC_REST_API}/property?type=${propertyType}`
            )
            .then((res) => {
              setProperties(res.data.properties);
            })
            .catch((error) => {
              console.error(error);
            });
        }
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
            axios
              .get(
                `${process.env.NEXT_PUBLIC_REST_API}/property?type=${propertyType}`
              )
              .then((res) => {
                setProperties(res.data.properties);
                dispatch(
                  setSnackbar({
                    status: "success",
                    message: ` Property status updated`,
                    open: true,
                  })
                );
              })
              .catch((error) => {
                console.error(error);
              });
          }
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
  const isXLarge = useIsXLarge();

  return (
    <div>
      <Swiper
        slidesPerView={isXLarge ? 3 : isMedium ? 2 : 1}
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
              <PropertyCard
                property={property}
                handleDelete={handleDelete}
                handleStatusUpdate={handleStatusUpdate}
              />
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
