import Container from "@/app/components/Container";
import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import Payment from "@/app/components/Payment";
import { Server } from "@/app/main/Server";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import React from "react";

const page = async () => {
  const data = await Server({ resourceName: "subs", cache: 0 });
  console.log(data.data[0].features);
  return (
    <MaxWidthWrapper>
      <div className=" grid lg:grid-cols-3  grid-cols-1 gap-5">
        {data.data.map((item: any) => (
          <div key={item.id} className=" border border-input rounded-xl">
            <div className=" mt-auto px-8 py-4 flex items-start flex-col gap-2 border-b  h-[11.5rem] border-input">
              <MiniTitle text={item.title} />
              <div className=" text-sm text-muted-foreground">
                {item.features.map((item: any) => (
                  <p key={item.id} className="flex items-center gap-1">
                    {item.title} usage limit {item.usage_limit}
                  </p>
                ))}
              </div>
              <h1 className=" text-2xl font-bold text-main2 mt-auto">{item.price} SAR</h1>
            </div>
            <div className="px-8 mt-auto py-4 flex flex-col gap-5">
              <div className=" flex items-center gap-2">
                <CheckIcon className=" w-4 h-4" /> <p>{item.usage_limit} online meeting</p>
              </div>
              <ModalCustom
                btn={
                  <Button size={"lg"} className={cn("w-full text-base hover:text-gray-50 bg-gray-100 text-main2 ")}>
                    CHOOSE PLAN
                  </Button>
                }
                content={<Payment planId={item.id} />}
              />
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
