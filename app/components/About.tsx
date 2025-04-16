import React from "react";
import GridContainer from "./defaults/GridContainer";
import Image from "next/image";
import Paragraph from "./defaults/Paragraph";
import Head1 from "./Head1";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import MotionContainer from "./defaults/MotionContainer";
import MotionItem from "./defaults/MotionItem";
import { convertToHTML } from "@/lib/utils";

const About = ({
  nohead = false,
  title,
  paragraph,
  services_list,
}: {
  nohead?: boolean;
  title: string;
  paragraph?: string;
  services_list: any;
}) => {
  return (
    <MaxWidthWrapper>
      <div className="flex-col flex items-center gap-2 lg:gap-4">
        {!nohead && <Head1 className=" max-w-4xl text-center mx-auto" text={title} />}{" "}
        <div
          dangerouslySetInnerHTML={{ __html: convertToHTML(paragraph || "") }}
          className={`lg:max-w-4xl text-center text-black lg:text-base text-sm  font-medium my-2 leading-[1.7] `}
        />
        <MotionContainer className="grid grid-cols-1 mt-2 lg:grid-cols-3 gap-5">
          {services_list.map((service: any) => (
            <MotionItem className="text-center flex flex-col items-center">
              <div className=" rounded-2xl overflow-hidden w-full h-52 relative">
                <Image
                  alt="image"
                  fill
                  className="object-cover object-top w-full h-full "
                  src={service.service_list_image[0]?.file}
                />
              </div>
              <Head1 className=" mt-4" size="sm" text={service?.service_list_main_title} />
              <div
                dangerouslySetInnerHTML={{ __html: convertToHTML(service?.service_list_content) }}
                className={`lg:max-w-2xl text-black text-sm  font-medium my-2 leading-[1.7] `}
              />
            </MotionItem>
          ))}
        </MotionContainer>
      </div>
    </MaxWidthWrapper>
  );
};

export default About;
