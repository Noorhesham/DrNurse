import React from "react";
import MiniTitle from "./MiniTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Meet = ({ cancel }: { cancel?: boolean }) => {
  return (
    <div className=" flex  gap-1 items-stretch">
      <div className="flex flex-col items-center  px-2 py-2  rounded-xl bg-main2 text-gray-50 ">
        <span className=" text-sm">MO</span>
        <span className=" font-semibold">23</span>
      </div>
      <div className=" ml-2 text-sm ">
        <div className=" flex items-center gap-2">
          <div className=" w-10 h-10 relative">
            <Image src={"/doctor1.png"} alt={"doctor"} fill className={"object-cover  rounded-2xl"} />
          </div>
          <MiniTitle boldness="bold" size="md" color="text-black" text="Dr. Mohamed Ahmed" />
        </div>
        <p className="text-muted-foreground">GTM : 24 /10/ 2024 09:00AM - 10:00 AM</p>
        <p className="text-muted-foreground">Your local time : 24 /10/ 2024 12:00PM - 1:00 PM</p>
      </div>
      {cancel && (
        <Button className=" self-center ml-auto " size={"lg"} variant={"destructive"}>
          CANCEL
        </Button>
      )}
    </div>
  );
};

export default Meet;
