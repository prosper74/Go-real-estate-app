import Link from "next/link";
import { Carousel } from "flowbite-react";
import { FacebookIconFilled, InstagramIcon, TwitterIcon } from "../svgIcons";
import PropertyCard from "./propertyCard";

export default function PropertySlider() {
  return (
    <section className="h-[22rem] md:h-64">
      <Carousel slideInterval={5000} className="bg-white rounded-lg">
        {[1, 2, 3, 4, 5].map((i) => (
          <PropertyCard key={i} />
        ))}
      </Carousel>
    </section>
  );
}
