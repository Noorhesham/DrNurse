import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Heading = ({
  text,
  title2,
  btnText,
  link,
  animation,
}: {
  text: string;
  title2?: string;
  btnText?: string;
  link?: string;
  animation?: boolean;
}) => {
  return (
    <div className="flex flex-col  capitalize  items-center text-center">
      <h1 className={`uppercase ${animation && "reveal_header opacity-0 "} text-3xl text-white font-bold lg:text-6xl `}>
        {text}
      </h1>
      {title2 && (
        <h2
          className={`  ${
            animation && "reveal_header opacity-0 "
          } mt-2  text-xl  lg:text-2xl  tracking-wide text-gray-100 font-semibold`}
        >
          {title2}
        </h2>
      )}
      {btnText && !link ? (
        <Button size={"lg"} className="  mt-5 ">
          {btnText}
        </Button>
      ) : btnText && link ? (
        <Link href={link} className="  mt-5 ">
          <Button size={"lg"} className="  mt-5 ">
            {btnText}
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export default Heading;
