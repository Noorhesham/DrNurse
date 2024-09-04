import About from "@/app/components/About";
import FindDoctor from "@/app/components/FindDoctor";
import FlexWrapper from "@/app/components/defaults/FlexWrapper";
import GridContainer from "@/app/components/defaults/GridContainer";
import Head1 from "@/app/components/Head1";
import Paragraph from "@/app/components/defaults/Paragraph";
import React from "react";
import CounterAnimation from "@/app/components/CounterAnimation";

const page = () => {
  return (
    <div>
      <FindDoctor reverse />
      <div className=" bg-[#F2F5FF]">
        <About nohead />
      </div>{" "}
      <FlexWrapper className="my-5 justify-between flex items-center">
        <div className="flex flex-1 flex-col items-start">
          <h3 className=" text-main2 uppercase text-lg font-medium my-1">Are you an employer?</h3>
          <Head1 alignment="left" className=" text-left" text="Find a health professional" />
          <Paragraph
            description="The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus. 
anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus."
          />
        </div>
        <GridContainer className="  flex-1" cols={2}>
          <div className=" flex items-center flex-col gap-4 relative">
            <span className=" absolute  top-0 right-10">+</span>
            <CounterAnimation from={0} to={200} />
            <p className=" text-gray-800 font-medium">EMPLOYEE</p>
          </div>{" "}
          <div className=" flex items-center flex-col gap-4 relative">
            <span className=" absolute  top-0 right-10">+</span>
            <CounterAnimation from={0} to={200} />
            <p className=" text-gray-800 font-medium">EMPLOYEE</p>
          </div>{" "}
          <div className=" flex items-center flex-col gap-4 relative">
            <span className=" absolute  top-0 right-10">+</span>
            <CounterAnimation from={0} to={563} />
            <p className=" text-gray-800 font-medium">EMPLOYEE</p>
          </div>{" "}
          <div className=" flex items-center flex-col gap-4 relative">
            <span className=" absolute  top-0 right-10">+</span>
            <CounterAnimation from={0} to={1235} />
            <p className=" text-gray-800 font-medium">EMPLOYEE</p>
          </div>
        </GridContainer>
      </FlexWrapper>
    </div>
  );
};

export default page;
