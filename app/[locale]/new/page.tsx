import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Image from "next/image";
import React from "react";
import Profile2 from "../../components/Profile2";

const page = () => {
  return (
    <section>
      <div className=" relative w-full h-96 lg:h-[500px]">
        <Image className="object-cover  hidden lg:block" src="/cover.webp" alt="cover" fill />
        <Image className="object-cover  lg:hidden block" src="/coverphone.webp" alt="cover" fill />
      </div>
      <MaxWidthWrapper className=" flex items-center justify-center">
        <Profile2 />
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
