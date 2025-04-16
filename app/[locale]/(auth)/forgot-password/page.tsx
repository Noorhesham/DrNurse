"use client";
import ResetPassword from "@/app/main/authentication/components/ResetPassword";
import Image from "next/image";

const page = () => {
  return (
    <section className="min-h-screen  flex items-stretch ">
      <div className=" hidden md:block md:w-[40%] lg:w-[60%]  min-h-full relative">
        <Image src="/login.jpg" alt="login" className=" object-cover" fill />
      </div>
      <ResetPassword />
    </section>
  );
};

export default page;
