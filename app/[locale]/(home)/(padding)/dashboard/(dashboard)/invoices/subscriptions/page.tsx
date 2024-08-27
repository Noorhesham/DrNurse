import Container from "@/app/components/Container";
import GridContainer from "@/app/components/GridContainer";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MiniTitle from "@/app/components/MiniTitle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <MaxWidthWrapper>
      <GridContainer cols={3}>
        <div className=" border border-input rounded-xl">
          <div className=" px-8 py-4 flex items-start flex-col gap-2 border-b border-input">
            <MiniTitle text="BASIC" />
            <p className=" text-sm text-muted-foreground"> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <h1 className=" text-2xl font-bold text-main2">100 SAR</h1>
          </div>
          <div className="px-8 py-4 flex flex-col gap-5">
            <div className=" flex items-center gap-2">
              <CheckIcon className=" w-4 h-4" /> <p>50 online meeting</p>
            </div>
            <Button size={"lg"} className={cn("w-full text-base bg-gray-100 text-main2 ")}>
              CHOOSE PLAN
            </Button>
          </div>
        </div>
        <div className=" border border-input rounded-xl">
          <div className=" px-8 py-4 flex items-start flex-col gap-2 border-b border-input">
            <MiniTitle text="BASIC" />
            <p className=" text-sm text-muted-foreground"> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <h1 className=" text-2xl font-bold text-main2">100 SAR</h1>
          </div>
          <div className="px-8 py-4 flex flex-col gap-5">
            <div className=" flex items-center gap-2">
              <CheckIcon className=" w-4 h-4" /> <p>50 online meeting</p>
            </div>
            <Button size={"lg"} className={cn("w-full text-base bg-gray-100 text-main2 ")}>
              CHOOSE PLAN
            </Button>
          </div>
        </div>
        <div className=" border border-input rounded-xl">
          <div className=" px-8 py-4 flex items-start flex-col gap-2 border-b border-input">
            <MiniTitle text="BASIC" />
            <p className=" text-sm text-muted-foreground"> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <h1 className=" text-2xl font-bold text-main2">100 SAR</h1>
          </div>
          <div className="px-8 py-4 flex flex-col gap-5">
            <div className=" flex items-center gap-2">
              <CheckIcon className=" w-4 h-4" /> <p>50 online meeting</p>
            </div>
            <Button size={"lg"} className={cn("w-full text-base bg-gray-100 text-main2 ")}>
              CHOOSE PLAN
            </Button>
          </div>
        </div>
      </GridContainer>
    </MaxWidthWrapper>
  );
};

export default page;
