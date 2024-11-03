import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ReactNode } from "react";

const Widget = ({
  icon,
  title,
  subTitle,
  className,
}: {
  icon: ReactNode;
  title: string;
  subTitle: string;
  className?: string;
}) => {
  return (
    <div className={cn(className, " flex w-full rounded-2xl items-start uppercase gap-3 py-4 pr-16 pl-5 bg-white/80")}>
      <div className=" bg-main w-20 relative overflow-hidden h-20 text-gray-50 p-3 rounded-2xl">
        <Image src={icon} alt="icon" fill />
      </div>
      <div className=" flex items-start font-normal  flex-col">
        <h2 className=" font-semibold  text-main2 text-xl">{title}</h2>
        <p className=" text-gray-600 font-normal text-sm">{subTitle}</p>
      </div>
    </div>
  );
};

export default Widget;
