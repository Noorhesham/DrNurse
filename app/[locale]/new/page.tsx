import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Image from "next/image";
import React from "react";
import Profile2 from "../../components/Profile2";

const page = () => {
  return (
    <section>
      <div className=" relative w-full h-[500px]">
        <Image className=" object-cover" src="/cover.png" alt="logo" fill />
      </div>
      <MaxWidthWrapper className=" flex items-center justify-center">
        <Profile2 />
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
