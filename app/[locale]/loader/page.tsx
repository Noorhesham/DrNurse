"use client";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import Paragraph from "@/app/components/defaults/Paragraph";
import MyHospitals from "@/app/components/MyHospitals";
import Spinner from "@/app/components/Spinner";
import { useAuth } from "@/app/context/AuthContext";
import useCachedQuery from "@/app/hooks/useCachedData";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const isAccountOlderThan10Days = (userSettings) => {
  const createdAt = new Date(userSettings.created_at); // Parse ISO format date
  const currentDate = new Date(); // Current date
  console.log(createdAt, currentDate);
  // Check if createdAt is valid
  if (isNaN(createdAt.getTime())) {
    console.error("Invalid date format:", userSettings.created_at);
    return false;
  }

  const diffInMs = currentDate.getTime() - createdAt.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  console.log("Days difference:", diffInDays, userSettings);
  return diffInDays > 10;
};

const page = () => {
  const { data: userSettings, loading } = useCachedQuery("user_settings");
  console.log(userSettings, loading);
  const router = useRouter();

  useEffect(() => {
    if (!userSettings) return;
    if (
      isAccountOlderThan10Days(userSettings) &&
      !userSettings?.role.includes("admin") &&
      !userSettings?.role.includes("hospital") &&
      userSettings?.companies.length === 0
    ) {
      router.push("/person");
    } else if (
      userSettings.has_profile &&
      (userSettings.role.includes("nurse") || userSettings.role.includes("doctor")) &&
      userSettings?.companies.length === 0
    ) {
      router.push("/person");
    }
    // } else if (userSettings.role.includes("hospital") && userSettings?.companies.length === 1) {
    //   router.push(`/dashboard/${userSettings.companies[0].id}`);
    // }
  }, [userSettings]);
  if (loading || !userSettings) return <Spinner />;

  const HasProfile = () => {
    if (userSettings.has_profile)
      return (
        <Link href="/person">
          <Button size="lg" className=" px-8  rounded-full">
            Continue as Medical Staff
          </Button>
        </Link>
      );
    else
      return (
        <ModalCustom
          btn={null}
          isOpen={true}
          content={
            <div className=" flex flex-col items-center py-4 px-2 gap-8">
              <MiniTitle size="2xl" color="text-main" text="COMPLETE YOUR PROFILE" />
              <Paragraph
                size="lg"
                description="Complete your profile, so you can appear in search results and apply for jobs, Complete your profile now and earn 10 points for free"
              />
              <div className="flex items-center gap-4">
                <Link href="/person/create-profile">
                  <Button size="lg" className=" px-8  rounded-full">
                    Create Profile
                  </Button>
                </Link>
                <Link href="/person">
                  <Button size="lg" className=" px-8  bg-main2 rounded-full">
                    SKIP
                  </Button>
                </Link>
              </div>
            </div>
          }
        />
      );
  };

  return (
    <section
      className=" h-screen  justify-center gap-10 w-full relative flex items-center "
      style={{
        backgroundImage: "url(/loader.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {loading || !userSettings ? (
        <Spinner className=" absolute  z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 " />
      ) : (
        userSettings.role.includes("admin") && (
          <div className="flex  w-full justify-center  items-center gap-10">
            <ModalCustom
              btn={
                <Button size="lg" className=" px-8  rounded-full">
                  Continue as Hospital Manager
                </Button>
              }
              content={<MyHospitals />}
            />
            <Link href="/person">
              <Button size="lg" className=" px-8  rounded-full">
                Continue as Medical Staff
              </Button>
            </Link>
          </div>
        )
      )}
      {(userSettings.role.includes("nurse") ||
        userSettings.role.includes("doctor") ||
        userSettings.role.includes("specialist")) &&
        !userSettings.companies.length && <>{HasProfile()}</>}
      {userSettings.role.includes("hospital") && !userSettings.role.includes("admin") && (
        <ModalCustom
          isOpen={true}
          btn={
            <Button size="lg" className=" px-8  rounded-full">
              Continue as Hospital Manager
            </Button>
          }
          content={<MyHospitals />}
        />
      )}
    </section>
  );
};

export default page;
