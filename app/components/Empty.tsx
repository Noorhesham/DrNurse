import Link from "next/link";
import React from "react";

const Empty = ({ text, link, textLink }: { text: string; link?: string; textLink?: string }) => {
  return (
    <div className=" col-span-full flex flex-col gap-2 items-center lg:text-2xl md:text-xl text-lg">
      <p className=" text-center  font-semibold">{text}</p>
      {link && (
        <Link className=" text-muted-foreground hover:underline duration-150" href={link}>
          {textLink}
        </Link>
      )}
    </div>
  );
};

export default Empty;
