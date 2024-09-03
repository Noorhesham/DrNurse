import { Bookmark } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Location } from "./Icons";
import Link from "next/link";
import MotionItem from "./MotionItem";

const JobCard = ({ heading }: { heading: string }) => {
  return (
    <MotionItem>
      <Link
        href={"/job/1"}
        className=" bg-white rounded-xl w-full gap-2   border border-input shadow-sm px-6 md:px-10 py-3 md:py-7 flex flex-col"
      >
        <h2 className=" font-semibold text-base lg:text-xl text-gray-900  uppercase">{heading}</h2>
        <div className=" flex  gap-4 items-center ">
          <div className=" text-blue-700 bg-blue-200 uppercase font-medium rounded-2xl text-xs py-1 px-2">
            InternShip
          </div>
          <p className=" text-xs sm:text-sm font-semibold text-muted-foreground">Salary: 3500 SAR - 5000 SAR</p>
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-2 items-center">
          <div className=" w-12 h-12 relative">
            <Image alt="hospital" fill src={"/his.png"} className=" object-cover" />
          </div>
          <div className=" p-1 flex flex-col text-xs sm:text-sm lg:text-base items-start gap-1">
            <h3>#Hospital : K123456789-25</h3>
            <div className=" flex  items-center gap-2">
              <Location />
              <p>Mecca, Sudia Arabics</p>
            </div>
          </div>
          <div className="   ml-auto items-center flex flex-col">
            <Bookmark />
            <p className=" text-xs text-muted-foreground">25 minutes</p>
          </div>
        </div>
      </Link>
    </MotionItem>
  );
};

export default JobCard;
