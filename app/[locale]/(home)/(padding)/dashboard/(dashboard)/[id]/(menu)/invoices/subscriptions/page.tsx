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
  return (
    <MaxWidthWrapper>
      <div className=" grid lg:grid-cols-3  grid-cols-1 gap-5">
        {data.data.map((item: any) => (
          <div key={item.id} className=" flex flex-col  justify-between h-full border border-input rounded-xl">
            <div className=" h-full  px-8 py-4 mb-auto flex items-start flex-col gap-2 ">
              <MiniTitle size='lg' text={item.title} />
              <div className=" text-sm line-clamp-4 text-muted-foreground">
                {item.description.length > 200 ? item.description.slice(0, 200) + "..." : item.description}
              </div>
              <h3 className=" text-2xl font-bold text-main2 mt-auto">{item.price} SAR</h3>
            </div>
            <div className="px-8 border-t   border-input mt-auto py-4 flex flex-col gap-5">
              <div className=" flex flex-col items-start gap-2">
                {" "}
                {item.features.map((item: any) => (
                  <p key={item.id} className="flex  items-center gap-2">
                    <CheckIcon className=" w-4 h-4" /> {item.usage_limit} {item.title}
                  </p>
                ))}
              </div>
              <ModalCustom
                btn={
                  <Button size={"lg"} className={cn("w-full text-base hover:text-gray-50 bg-gray-100 text-main2 ")}>
                    CHOOSE PAYMENT METHOD
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
