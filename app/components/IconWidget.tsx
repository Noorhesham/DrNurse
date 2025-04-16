import React, { ReactNode } from "react";
import Link from "next/link";
import MotionItem from "./defaults/MotionItem";
import Paragraph from "./defaults/Paragraph";

const IconWidget = ({
  icon,
  header,
  paragraph,
  link,
}: {
  icon: ReactNode;
  header?: string;
  paragraph: string;
  link?: string;
}) => {
  return (
    <MotionItem nohover className=" flex  gap-2 items-start">
      {React.cloneElement(icon, { className: " w-6 h-6 mt-[4.5px] text-main" })}
      <div className=" max-w-[15rem] flex items-start gap-1 flex-col ">
        {header && <h2 className=" text-main2 font-semibold">{header}</h2>}

        {link ? (
          <Link className={` text-black text-sm self-start lg:max-w-2xl font-medium  leading-[1.7] `} href={link}>
            {paragraph}
          </Link>
        ) : (
          <Paragraph className=" mt-0 mb-0" size="sm" description={paragraph} />
        )}
      </div>
    </MotionItem>
  );
};

export default IconWidget;
