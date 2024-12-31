"use client";
import UpdatePassword from "@/app/main/authentication/components/UpdatePassword";
import UpdatePersonalInfo from "@/app/main/authentication/components/UpdatePersonalInfo";
import UpdateNotifications from "@/app/main/authentication/components/UpdateNotifications";
import DeleteAccount from "@/app/main/authentication/components/DeleteAccount";
import Devices from "@/app/main/authentication/components/Devices";
import Activate2fa from "@/app/main/authentication/components/Activate2fa";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";

const page = () => {
  return (
    <MaxWidthWrapper noPadding>
      <div className="z-10 flex flex-col mx-auto justify-center flex-wrap lg:grid gap-4  lg:grid-cols-3">
        <UpdatePassword />
        <UpdateNotifications />
        <UpdatePersonalInfo />
        <Devices />
        <Activate2fa />
      </div>
      <DeleteAccount />
    </MaxWidthWrapper>
  );
};

export default page;
