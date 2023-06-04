import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner1 from "../public/Banner1.jpg";
import Banner2 from "../public/Banner2.jpg";
import Banner3 from "../public/Banner3.jpg";
import Banner4 from "../public/Banner4.jpg";
import Banner5 from "../public/Banner5.jpg";
import Image from "next/image";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <Image loading="lazy" src={Banner1} alt="" />
        </div>

        <div>
          <Image loading="lazy" src={Banner2} alt="" />
        </div>

        <div>
          <Image loading="lazy" src={Banner3} alt="" />
        </div>

        <div>
          <Image loading="lazy" src={Banner4} alt="" />
        </div>

        <div>
          <Image loading="lazy" src={Banner5} alt="" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
