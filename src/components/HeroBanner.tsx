import clsx from "clsx";

import "swiper/css";
import "swiper/css/navigation";
import { register } from "swiper/element/bundle";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef } from "react";

function hexToRgb(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function getContrastColor(hexColor: string): "black" | "white" {
  const rgb = hexToRgb(hexColor);

  // http://www.w3.org/TR/AERT#color-contrast
  const brightness = Math.round(
    (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  );
  return brightness > 125 ? "black" : "white";
}

export const HeroBanner = ({
  theme,
  brandingColor,
  logo,
  screenshot,
  name,
  summary,
  isFullscreenApp,
}: {
  theme: "dark" | "light";
  brandingColor: string;
  name: string;
  summary: string;
  logo?: string;
  screenshot?: string;
  isFullscreenApp?: boolean;
}) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    register();

    const params = {
      modules: [Navigation, Autoplay],
      slidesPerView: 1,
      centeredSlides: true,
      navigation: true,
      className: "h-[288px] xl:h-[352px] shadow-md rounded-xl overflow-hidden",
      injectStyles: [
        `
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background-color: hsla(0, 0%, 100%, 0.2);
        }
        .swiper-button-next {
          padding: 16px 14px 16px 18px;
        }
        .swiper-button-prev {
          padding: 16px 18px 16px 14px;
        }
        .swiper-button-next,
        .swiper-button-prev {
          width: 28px;
          height: 28px;
          border-radius: 100%;
          color: ${theme === "dark" ? "rgb(222, 221, 218)" : "rgb(36, 31, 49)"};
          transition: all 0.2s ease-in-out;
        }
      `,
      ],
    };

    Object.assign(swiperRef.current, params);

    swiperRef.current.initialize();
  });

  const textColor = brandingColor
    ? getContrastColor(brandingColor) === "black"
      ? "text-[rgb(36,31,49)]"
      : "text-[rgb(250,250,250)]"
    : "text-[rgb(36,31,49)] dark:text-[rgb(250,250,250)]";

  return (
    //@ts-ignore
    <swiper-container init={false} ref={swiperRef}>
      {/* @ts-ignore */}
      <swiper-slide className="overflow-hidden">
        <div
          style={{
            backgroundColor: brandingColor,
          }}
          className={clsx(
            "flex min-w-0 items-center gap-4 p-4 py-0 duration-500",
            "hover:cursor-grab",
            "h-full"
          )}
        >
          <div className="flex justify-center flex-row w-full h-full gap-6 px-16">
            <div className="flex flex-col justify-center items-center lg:w-1/3 h-auto w-full">
              <div className="relative flex flex-shrink-0 flex-wrap items-center justify-center drop-shadow-md lg:h-[128px] lg:w-[128px]">
                <img src={logo} className="h-[128px] w-[128px]" alt="Logo" />
              </div>
              <div className="flex pt-3">
                <span
                  className={clsx(
                    "truncate whitespace-nowrap text-2xl font-black",
                    textColor
                  )}
                >
                  {name}
                </span>
              </div>
              <div
                className={clsx(
                  "line-clamp-2 text-sm text-center",
                  textColor,
                  "lg:line-clamp-3 pb-8"
                )}
              >
                {summary}
              </div>
            </div>
            <div className="hidden w-2/3 xl:flex justify-center items-center overflow-hidden relative h-auto">
              <img
                src={screenshot}
                alt="Screenshot"
                className={clsx(
                  "absolute rounded-lg",
                  isFullscreenApp ? "top-20" : "top-10 "
                )}
              />
            </div>
          </div>
        </div>
        {/* @ts-ignore */}
      </swiper-slide>
      {/* @ts-ignore */}
    </swiper-container>
  );
};
