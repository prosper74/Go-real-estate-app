// @ts-nocheck
import { useState, FC } from "react";
import { Image } from "cloudinary-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useIsXLarge } from "../hooks/mediaQuery";
import { SingleProperty } from "../helpers/interfaces";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

interface IProps {
  property: SingleProperty;
}

const ImageSlider: FC<IProps> = ({ property }) => {
  const images = property.Images;
  const isXLarge = useIsXLarge();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={images.length < 2 ? false : true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i} className="relative">
            <Image
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
              publicId={image}
              crop="scale"
              className="mb-2 rounded-xl shadow-md w-full h-127 md:h-128 object-cover"
            />

            <div className="absolute left-0 top-0 z-[100] bg-purple-500 text-white py-1 px-2 rounded-xl">
              {images.indexOf(image) + 1}/{images.length}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        // onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={5}
        slidesPerView={
          images.length < 2
            ? 1
            : images.length < 3
            ? 4
            : images.length > 2 && isXLarge
            ? 6
            : 5
        }
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Image
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
              publicId={image}
              crop="scale"
              className="rounded-xl shadow-md md:w-32 md:h-24 w-full h-20 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
