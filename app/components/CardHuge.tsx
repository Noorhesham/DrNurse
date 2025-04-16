import React from "react";
import Image from "next/image";
import Link from "next/link";
import { convertToHTML } from "@/lib/utils";
import { format } from "date-fns";
import MotionItem from "./defaults/MotionItem";
import Paragraph from "./defaults/Paragraph";

export interface BlogProps {
  id: number;
  title: string;
  thumbnail: string;
  main_gallery: {
    alt: string;
    thumbnail: string;
    sizes: {
      thumbnail: string;
      large: string;
      medium: string;
      "1200_800": string;
      "300_1200": string;
      "800_1200": string;
    };
  }[];
  content: string;
}

const CardHuge = ({ h1, h2, href, item }: { h1?: string; h2?: string; href?: string; item: BlogProps }) => {
  const { title, main_gallery, content, main_thumbnail, short_description } = item;
  console.log(main_thumbnail);
  return (
    <MotionItem nohover className=" relative w-full ">
      <div className="rounded-2xl   hover:opacity-80 duration-200  overflow-hidden relative w-full h-96">
        <Link href={item.id ? `/blogs/${item.id}` : "#"} className="  rounded-2xl w-full   h-full  ">
          <Image
            src={main_thumbnail.length > 0 ? main_thumbnail[0]?.sizes.large : "/drdefault.jpg"}
            fill
            className="group-hover:scale-110  duration-200 group-hover:opacity-90 object-cover"
            alt={main_gallery[0]?.alt || "post"}
          />{" "}
        </Link>
        <div
          className=" absolute left-1/2 -translate-x-1/2 bottom-[20px]  h-24  flex flex-col items-center rounded-xl
         bg-[#0d3b6fc3] w-[80%]  text-gray-50 px-4 py-2"
        >
          {item.created_at && (
            <div className="flex items-center gap-2">
              <p className="text-xs  sm:text-sm font-medium ">{format(new Date(item.created_at), "dd MMM, yyyy")}</p>
            </div>
          )}
          <Link href={item.id ? `/blogs/${item.id}` : "#"} className="  text-center w-full  h-full  ">
            <h2 className="mt-2  line-clamp-2 text-base font-semibold ">{title}</h2>
          </Link>
        </div>
      </div>
    </MotionItem>
  );
};

export default CardHuge;
