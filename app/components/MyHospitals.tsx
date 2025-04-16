import React from "react";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import Paragraph from "./defaults/Paragraph";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import cookies from "js-cookie";
import Spinner from "./Spinner";
import { Arrow } from "./Icons";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { DialogClose } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const MyHospitals = () => {
  const { userSettings, loading } = useAuth();
  const router = useRouter();
  if (loading) return <Spinner />;
  const companies = userSettings?.companies;
  return (
    <MaxWidthWrapper>
      {companies?.length === 0 ? (
        <div className=" flex items-center flex-col gap-2">
          <h2 className=" text-2xl font-bold text-main ">CREATE HOSPITAL PROFILE</h2>
          <Paragraph className="  uppercase" description="Complete your profile, so you can Create New Jobs and hire Medical Staff" />
          <Link href="/dashboard/create-hospital">
            <Button size="lg" className=" px-8  rounded-full">
              CREATE HOSPITAL
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex items-center flex-col gap-2">
            <h3 className=" text-2xl font-bold uppercase text-main ">Select hospital profile</h3>
            <Paragraph  className="  uppercase"   description="Select your profile, so you can Create New Jobs and hire Medical Staff"/>
            <div className=" flex w-full  px-4 mt-2 lg:px-8 flex-col gap-4">
              {companies?.map((item: any, i: number) => (
                <DialogClose
                  onClick={() => {
                    cookies.set("hospitalId", item.id);
                    router.push(`/dashboard/${item.id}`);
                  }}
                  key={i}
                >
                  <p className=" flex justify-between items-center gap-2">
                    <h3 className=" text-xl font-semibold text-black">{item.title}</h3>
                    <ArrowRight />
                  </p>
                </DialogClose>
              ))}{" "}
              <DialogClose onClick={() => router.push("/dashboard/create-hospital")}>
                <p className=" w-full">
                  <div className=" px-8 py-2 bg-main text-white mt-3 duration-150 hover:bg-main/80  w-full rounded-full">
                    CREATE HOSPITAL
                  </div>
                </p>
              </DialogClose>
            </div>
          </div>
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default MyHospitals;
