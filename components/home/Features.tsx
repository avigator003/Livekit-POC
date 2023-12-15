import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

const images = [
  {
    src: "/feature_1.svg",
    alt: "feature_1",
    title: "Live Interactive Video Rooms",
    points: [
      "Host interactive live sessions and users can engage actively via microphones, cameras, or screen sharing.",
      "Earn through ads or selling subscriptions.",
    ],
  },
  {
    src: "/feature_2.svg",
    alt: "feature_2",
    title: "Organized Chat Groups",
    points: [
      "Create organized chat groups with customized tags & permissions.",
      "Earn through selling subscriptions.",
      "Enhance content discovery and filtration for users.",
    ],
  },
  {
    src: "/feature_3.svg",
    alt: "feature_3",
    title: "Feeds",
    points: [
      "Share Diverse Content, Tag Companies in Posts.",
      "Engage through comments or by reacting to posts.",
    ],
  },
  {
    src: "/feature_4.svg",
    alt: "rev_soon_2",
    title: "Trending List",
    points: [
      "Explore Trends via the Trending Page.",
      "Refine your feed by choosing a specific company and explore the diverse opinions of users from around the world.",
    ],
  },
  {
    src: "/feature_5.svg",
    alt: "rev_soon_2",
    title: "Profile",
    points: [
      "Create a compelling profile that represents you effectively by Expressing your thoughts and ideas through engaging posts.",
      "Increase your reach by gaining followers or connecting with like-minded individuals.",
    ],
  },
  {
    src: "/feature_6.svg",
    alt: "rev_soon_2",
    title: "Experience Much More",
    points: ["Stay Engaged, More Excitement Unveiling Soon!"],
  },
];

const forCreatorsImages = [
  {
    src: "/feature_7.svg",
    alt: "feature_7",
    title: "Hosting Live Rooms",
    points: [
      "Engage your audience in real-time discussions through live streaming.",
      "Get paid for every watch minute as users actively participate in your live stream.",
    ],
  },
  {
    src: "/feature_8.svg",
    alt: "feature_8",
    title: "Premium Groups",
    points: [
      "Create exclusive groups and share special content with your premium users.",
      "Charge a monthly subscription fee to appreciate and support your hard work and dedication.",
    ],
  },
];

const Features: React.FC = () => {
  return (
    <div>
      <div className="mt-20 w-full sm:mt-32" id="features">
        <h1 className="bg-gradient-to-br from-[#3578EA] to-[#B53AE1] bg-clip-text px-2 text-center text-3xl font-extrabold text-transparent md:text-5xl">
          What makes us stand out?
        </h1>

        <div className="mx-auto space-y-8 py-16 md:space-y-16">
          <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
            {images.map(
              ({ src, alt, title, points }, i) =>
                i < images.length / 2 && (
                  <div key={i} className="relative z-20">
                    <div
                      className={cn(
                        "relative flex h-[430px] w-[300px] flex-col items-center gap-4 rounded-[20px] bg-[#EFEFEF] p-4 dark:bg-[#0A0A0A] lg:h-[400px] lg:w-[270px] xl:h-[583px] xl:w-[408px]",
                        // {
                        //   "2xl:h-[550px] 2xl:w-[410px]": i === 1,
                        // },
                      )}
                    >
                      <div className="absolute -right-1 -top-1 -z-10 h-[151px] w-[145px] rounded-[20px] bg-faceBlue" />
                      <div className="absolute -bottom-1 -left-1 -z-10 h-[151px] w-[145px] rounded-[20px] bg-faceBlue" />
                      <div
                        className={cn(
                          "relative h-[320px] w-[300px] lg:h-[320px] lg:w-[294px]",
                          // {
                          //   "lg:h-[320px] lg:w-[294px]": i === 1,
                          // },
                        )}
                      >
                        <Image src={src} fill alt={alt} />
                      </div>
                      <p className="ml-8 self-start text-[20px] font-medium text-faceBlue">
                        {title}
                      </p>
                      <div className="flex flex-col items-start px-3 font-medium">
                        {points.map((point, i) => (
                          <div
                            key={i}
                            className="flex gap-3 text-lg text-gray-400"
                          >
                            &bull;
                            <p key={i} className="">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
            {images.map(
              ({ src, alt, title, points }, i) =>
                i >= images.length / 2 && (
                  <div className="relative z-20" key={i}>
                    <div
                      className={cn(
                        "relative flex h-[430px] w-[300px] flex-col items-center gap-4 rounded-[20px] bg-[#EFEFEF] p-4 dark:bg-[#0A0A0A] lg:h-[400px] lg:w-[270px] xl:h-[583px] xl:w-[408px]",
                        // {
                        //   "2xl:h-[550px] 2xl:w-[410px]": i === 4,
                        // },
                        {
                          "justify-center": i === 5,
                        },
                      )}
                    >
                      <div className="absolute -right-1 -top-1 -z-10 h-[151px] w-[145px] rounded-[20px] bg-faceBlue" />
                      <div className="absolute -bottom-1 -left-1 -z-10 h-[151px] w-[145px] rounded-[20px] bg-faceBlue" />
                      <div
                        className={cn(
                          "relative h-[320px] w-[300px] lg:h-[320px] lg:w-[294px]",
                          // {
                          //   "lg:h-[320px] lg:w-[294px]": i === 4,
                          // },
                        )}
                      >
                        <Image src={src} fill alt={alt} />
                      </div>
                      <p
                        className={cn(
                          "ml-8 self-start text-[20px] font-medium text-faceBlue",
                          {
                            "ml-0 self-center": i === 5,
                          },
                        )}
                      >
                        {title}
                      </p>
                      <div className="flex flex-col items-start px-3 font-medium">
                        {points.map((point, pointIndex) => (
                          <div
                            key={pointIndex}
                            className="flex gap-3 text-lg text-black dark:text-gray-400"
                          >
                            {i !== 5 && <>&bull;</>}
                            <p key={i} className={cn(i === 5 && "text-center")}>
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>

      <div className="mt-20 w-full sm:mt-32" id="features">
        <div className="mx-auto flex w-full max-w-[82rem] flex-col items-center gap-5 px-3 tracking-wider lg:px-0">
          <h1 className="z-20 bg-gradient-to-br from-[#3578EA] to-[#B53AE1] bg-clip-text px-2 text-start text-3xl font-extrabold !leading-[3.5rem] text-transparent md:text-5xl">
            Are You a Creator? Are you passionate about sharing valuable content
            or hosting engaging discussions?
          </h1>
          <p className="mt-3 w-full text-start text-4xl font-semibold">
            Whalesbook offers a fantastic opportunity to monetize your efforts
            in various ways.
            <br className="hidden md:flex" />
          </p>
        </div>

        <div className="mx-auto space-y-8 py-16 md:space-y-16">
          <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-32">
            {forCreatorsImages.map(({ src, alt, title, points }, i) => (
              <div key={i} className="relative z-20">
                <div
                  className={cn(
                    "relative flex h-[430px] w-[300px] flex-col items-center gap-4 rounded-[20px] bg-[#EFEFEF] p-4 dark:bg-[#0A0A0A] lg:h-[400px] lg:w-[270px] xl:h-[633px] xl:w-[531px]",
                  )}
                >
                  <div className="absolute -right-1 -top-1 -z-10 h-[151px] w-[145px] rounded-[20px] bg-faceBlue" />
                  <div className="absolute -bottom-1 -left-1 -z-10 h-[151px] w-[145px] rounded-[20px] bg-faceBlue" />
                  <div
                    className={cn(
                      "relative h-[320px] w-[300px] lg:h-[371px] lg:w-[477px]",
                    )}
                  >
                    <Image src={src} fill alt={alt} />
                  </div>
                  <p className="ml-8 self-start text-[26px] font-medium text-faceBlue">
                    {title}
                  </p>
                  <div className="flex flex-col items-start px-3 font-medium">
                    {points.map((point, i) => (
                      <div key={i} className="flex gap-3 text-lg text-gray-400">
                        &bull;
                        {i === 0 ? (
                          <div>
                            <span className="font-bold text-gray-300">
                              How it works:{" "}
                            </span>
                            {point}
                          </div>
                        ) : (
                          <div>
                            <span className="font-bold text-gray-300">
                              Earnings:{" "}
                            </span>
                            {point}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
