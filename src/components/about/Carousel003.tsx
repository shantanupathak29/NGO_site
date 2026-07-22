import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { cn } from "../../lib/utils";

const Skiper49 = () => {
  const images = [
    { src: "/photos/20230217_121338-1-1024x576.jpg", alt: "SMAE / ATMA Farmer Capacity Development" },
    { src: "/photos/20220330_121946-1-1024x576.jpg", alt: "Climate Resilient Farming" },
    { src: "/photos/20211111_130411-1-1024x576.jpg", alt: "Hand Wash Campaign" },
    { src: "/photos/WhatsApp-Image-2021-07-24-at-16.20.47-1024x576.jpeg", alt: "Women Empowerment SHGs" },
    { src: "/photos/20230914_171728-1024x576.jpg", alt: "Jal Jeevan Mission Water Security" },
    { src: "/photos/WhatsApp-Image-2023-03-17-at-18.00.32-1024x576.jpg", alt: "Livelihood Promotion" },
    { src: "/photos/WhatsApp-Image-2021-11-08-at-15.23.07-1-1024x576.jpeg", alt: "Water Prevention Campaign" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden py-6">
      <Carousel_003 className="" images={images} showPagination loop showNavigation />
    </div>
  );
};

export { Skiper49 };

interface Carousel003Props {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}

const Carousel_003 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}: Carousel003Props) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    height: 380px;
    padding-bottom: 50px !important;
  }
  @media (max-width: 640px) {
    .Carousal_003 {
      height: 310px;
      padding-bottom: 40px !important;
    }
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 320px;
    border-radius: 1.5rem;
    overflow: hidden;
    border: 1px solid rgba(186, 144, 198, 0.4);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: 640px) {
    .Carousal_003 .swiper-slide {
      width: 260px;
      border-radius: 1.25rem;
    }
  }

  .swiper-pagination-bullet {
    background-color: #BA90C6 !important;
    opacity: 0.6;
  }
  .swiper-pagination-bullet-active {
    background-color: #E8A0BF !important;
    opacity: 1;
  }
`;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.2,
      }}
      className={cn("relative w-full max-w-5xl px-5", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 2000,
                  disableOnInteraction: false,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative group">
              <img
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={image.src}
                alt={image.alt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#BA90C6]/80 via-transparent to-transparent flex items-end p-4">
                <p className="text-sm font-semibold text-[#FDF4F5] line-clamp-2 drop-shadow-md">{image.alt}</p>
              </div>
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden bg-[#FDF4F5]/80 backdrop-blur border border-[#BA90C6] p-3 rounded-full hover:bg-[#E8A0BF] transition-colors shadow-md">
                <ChevronRightIcon className="h-6 w-6 text-[#BA90C6]" />
              </div>
              <div className="swiper-button-prev after:hidden bg-[#FDF4F5]/80 backdrop-blur border border-[#BA90C6] p-3 rounded-full hover:bg-[#E8A0BF] transition-colors shadow-md">
                <ChevronLeftIcon className="h-6 w-6 text-[#BA90C6]" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_003 };
