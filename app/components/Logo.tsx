import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ size = "sm",isdark }: { size?: "sm" | "lg",isdark?:boolean }) => {
  return (
    <Link href={"/"} className={` relative ${size === "sm" ? "w-24 h-24" : "w-44 h-44"}`}>
     {isdark?<Image src={"/logodark.webp"} className=" object-contain" alt="logo" fill />: <Image src={"/drnurse.svg"} className=" object-contain" alt="logo" fill />}
    </Link>
  );
};

export default Logo;
