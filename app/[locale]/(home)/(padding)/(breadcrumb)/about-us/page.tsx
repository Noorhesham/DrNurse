import About from "@/app/components/About";
import FindDoctor from "@/app/components/FindDoctor";
import FlexWrapper from "@/app/components/defaults/FlexWrapper";
import GridContainer from "@/app/components/defaults/GridContainer";
import Head1 from "@/app/components/Head1";
import React from "react";
import CounterAnimation from "@/app/components/CounterAnimation";
import { Server } from "@/app/main/Server";
import Image from "next/image";
import MotionItem from "@/app/components/defaults/MotionItem";
import { convertToHTML } from "@/lib/utils";
import MotionContainer from "@/app/components/defaults/MotionContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { WEBSITEURL } from "@/app/constants";
export const generateMetadata = async () => {
  const data = await Server({ resourceName: "about-us" });

  return {
    title: `${data.page.title}`,
    canonical: `${WEBSITEURL}/about-us`,
    openGraph: {
      title: "drnurse",
      url: "/logodark.webp",
      images: [
        {
          url: "/logodark.webp",
          alt: "drnurse",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "drnurse",
      images: [
        {
          url: "/logodark.webp",
          title: "drnurse",
        },
      ],
    },
  };
};
const page = async () => {
  const data = await Server({ resourceName: "about-us" });
  const page = data.page;
  return (
    <div>
      <FindDoctor
        images={page.main_section_images}
        miniTitle={page.title}
        paragraph={page.content}
        title={page.main_section_title}
        reverse
      />
      <div className=" bg-[#F2F5FF]">
        <MaxWidthWrapper>
          <MotionContainer className="grid grid-cols-1 mt-2 lg:grid-cols-3 gap-5">
            {page.vision.map((service: any, i: number) => (
              <MotionItem className="text-center flex flex-col items-start">
                <div className=" rounded-2xl overflow-hidden w-full h-52 relative">
                  <Image alt="image" fill className="object-cover w-full h-full " src={service.image[0].file} />
                </div>
                <div className=" my-2 items-start flex flex-col text-main2  font-semibold">
                  <h2 className=" text-xl lg:text-2xl">0{i + 1}</h2>
                  <h3 className=" text-main2 font-bold text-xl uppercase lg:text-2xl mt-2">{service.vision_title}</h3>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: convertToHTML(service.vision_content) }}
                  className={`lg:max-w-2xl text-left text-black text-sm  font-medium my-2 leading-[1.7] `}
                />
              </MotionItem>
            ))}
          </MotionContainer>
        </MaxWidthWrapper>
      </div>{" "}
      <FlexWrapper className=" py-4 justify-between flex items-center">
        <div className="flex flex-1 flex-col items-start">
          <h3 className=" text-main2 uppercase text-lg font-medium my-1">{page.history_section_small_title}</h3>
          <Head1 alignment="left" className=" text-left" text={page.history_section_main_title} />
          <div
            dangerouslySetInnerHTML={{ __html: convertToHTML(page.history_section_content) }}
            className={`lg:max-w-2xl text-black lg:text-base text-sm  font-medium my-2 leading-[1.7] `}
          />
        </div>
        <GridContainer className="  flex-1" cols={2}>
          {page.important_number.map((numb: any) => (
            <div className=" flex items-center flex-col gap-4 relative">
              <span className=" absolute  -top-5 text-main2 right-10">{numb.prefix}</span>
              <CounterAnimation from={0} to={parseInt(numb.number)} />
              <p className=" text-gray-800 capitalize  font-semibold">{numb.important_number_title}</p>
            </div>
          ))}{" "}
        </GridContainer>
      </FlexWrapper>
    </div>
  );
};

export default page;
