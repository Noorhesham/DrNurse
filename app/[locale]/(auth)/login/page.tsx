"use client";
import Login from "@/app/main/authentication/components/Login";
import Image from "next/image";

const Page = () => {
  return (
    <section className="min-h-screen  flex items-stretch ">
      <div className=" hidden md:block md:w-[40%] lg:w-[60%]  min-h-full relative">
        <Image src="/login.jpg" alt="login" className=" object-cover" fill />
      </div>
      <Login />
    </section>
  );
};

export default Page;
