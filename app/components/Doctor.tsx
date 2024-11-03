import Image from "next/image";
import React from "react";
import MiniTitle from "./defaults/MiniTitle";
import Link from "next/link";

const Doctor = ({
  doctor,
  link,
}: {
  doctor: { image: string; name: string; duration: string; speciality: string; avatar_url?: String; id: string };
  link?: String;
}) => {
  return (
    <Link href={link ? link : `/doctor/${doctor?.id}`} className=" gap-2 flex flex-col items-center">
      <div className=" w-20 relative h-20 aspect-square overflow-hidden rounded-full">
        <Image src={doctor?.image || doctor?.avatar_url || ""} alt={doctor.name} fill className="object-cover" />
      </div>
      <MiniTitle size="sm" headingClass=" text-center" color="text-black" className=" text-center" text={doctor.name} />
      <p className=" text-sm text-muted-foreground font-semibold">{doctor?.speciality}</p>
      <p className=" text-xs text-muted-foreground">{doctor?.duration}</p>
    </Link>
  );
};

export default Doctor;
