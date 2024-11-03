import React from "react";
import Paragraph from "./defaults/Paragraph";

const Head1 = ({
  text,
  text2,
  className,
  paragraph,
  secondText,
  size,
  alignment,
  headingClasses,
}: {
  text: string;
  text2?: string;
  className?: string;
  paragraph?: string;
  secondText?: string;
  size?: "sm" | "lg";
  alignment?: "left" | "center" | "right";
  headingClasses?: string;
}) => {
  return (
    <div
      className={` ${className || ""}    flex flex-col items-center gap-2 font-bold ${
        size === "sm" ? " text-lg sm:text-xl" : " text-2xl lg:text-4xl my-2"
      }  ${
        alignment === "left" || alignment === "right" ? "text-start" : "text-center mx-auto  "
      }    max-w-4xl   uppercase text-main2  line-clamp-5`}
    >
      <h1 className={headingClasses || ""}>{text}</h1>
      {secondText && <h1>{secondText}</h1>}
      {paragraph && <Paragraph className=" text-center" maxWidth description={paragraph} />}
      {text2 && <span className=" text-main">{text2}</span>}
    </div>
  );
};

export default Head1;
