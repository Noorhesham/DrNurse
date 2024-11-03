import Image from "next/image";
import React from "react";
import MiniTitle from "./defaults/MiniTitle";
import { Location } from "./Icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

const UserCard = ({
  applicant,
  show = true,
  notification,
  className,
  edu,
  id,
}: {
  applicant: any;
  show?: boolean;
  notification?: boolean;
  className?: string;
  id?: string;
  edu?: boolean;
}) => {
  return !edu ? (
    <div className={`${className || ""} flex items-center gap-3`}>
      <div className={cn("relative rounded-2xl overflow-hidden", show ? "w-36 h-36" : " w-20 h-20")}>
        <Image alt="image" fill className="object-cover" src={applicant.image} />
      </div>
      <div className=" flex ml-2 flex-col gap-1">
        <MiniTitle
          boldness="bold"
          size={show ? "2xl" : "lg"}
          color={show ? " text-main2 " : "text-gray-700"}
          text={applicant.name}
        />
        <p className={cn(" text-muted-foreground uppercase", show ? "text-base" : "text-xs")}>{applicant.speciality}</p>
        <div className=" flex items-center gap-2">
          {!notification && applicant.address && <Location sizes={{ width: 18, height: 18 }} />}
          <p className={cn(" text-muted-foreground  text-base uppercase font-semibold")}>{applicant.address}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className={`${className || ""} w-full flex items-center gap-3`}>
      <div className={cn("relative", show ? "w-40 h-40" : " w-20 h-20")}>
        <Image alt="image" fill className="object-contain" src={applicant.image} />
      </div>
      <div className=" flex ml-2 flex-col gap-1">
        <MiniTitle
          boldness="bold"
          size={show ? "2xl" : "lg"}
          color={show ? " text-main2 " : "text-gray-700"}
          text={applicant.name}
        />
        <div className=" flex items-center gap-2">
          {!notification && <Location sizes={{ width: 18, height: 18 }} />}
          <p className={cn(" text-muted-foreground  text-base uppercase font-semibold")}>{applicant.address}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
