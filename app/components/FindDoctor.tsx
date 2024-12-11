import React from "react";
import GridContainer from "./defaults/GridContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Paragraph from "./defaults/Paragraph";
import Head1 from "./Head1";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import FlexWrapper from "./defaults/FlexWrapper";
import { convertToHTML } from "@/lib/utils";
import Link from "next/link";
import MotionContainer from "./defaults/MotionContainer";
import MotionItem from "./defaults/MotionItem";
import LoaderBtn from "./LoaderBtn";

const FindDoctor = ({
  reverse,
  title,
  images,
  paragraph,
  miniTitle,
}: {
  reverse?: boolean;
  miniTitle?: string;
  images?: any;
  title: string;
  paragraph?: string;
}) => {
  return (
    <MaxWidthWrapper>
      <FlexWrapper
        max={false}
        className={`flex  lg:flex-row flex-col items-center gap-5 ${reverse ? "lg:flex-row-reverse" : ""} `}
      >
        <div className="flex flex-col items-start gap-10 justify-between  flex-1">
          <div className="flex flex-col items-start">
            <h3 className=" text-main2  uppercase  font-semibold">{miniTitle}</h3>
            <Head1 animation={false} headingClasses=" text-left " alignment="left" text={title} />
            <div
              dangerouslySetInnerHTML={{ __html: convertToHTML(paragraph || "") }}
              className={`lg:max-w-2xl text-black lg:text-base text-sm  font-medium my-2 leading-[1.7] `}
            />
          </div>
          <LoaderBtn text="GET STARTED" />
        </div>
        <MotionContainer className=" grid gap-2 lg:gap-4 grid-cols-2 w-full h-full flex-1 ">
          <div className="flex flex-col gap-x-2 gap-y-4  col-span-1">
            {images.slice(0, 2).map((img: any) => (
              <MotionItem nohover className=" rounded-2xl overflow-hidden aspect-square relative w-full h-full">
                <Image alt="image" fill className="object-cover " src={img.file} />
              </MotionItem>
            ))}
          </div>
          <MotionItem nohover className=" rounded-2xl overflow-hidden relative w-full h-[80%] self-center my-auto">
            <Image alt="image" fill className="object-cover " src={images[images.length - 1].file} />
          </MotionItem>
        </MotionContainer>
      </FlexWrapper>
    </MaxWidthWrapper>
  );
};

export default FindDoctor;
