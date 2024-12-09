import React, { ReactNode } from "react";
import Paragraph from "./defaults/Paragraph";

const IconWidget = ({ icon, header, paragraph }: { icon: ReactNode; header: string; paragraph: string }) => {
  return (
    <div className=" flex my-2 gap-2 items-start">
      {icon}
      <div className=" max-w-[15rem] flex flex-col ">
        <h2 className="capitalize text-main2 font-semibold">{header}</h2>

        <Paragraph size="sm" description={paragraph} />
      </div>
    </div>
  );
};

export default IconWidget;
