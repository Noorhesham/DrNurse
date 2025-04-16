"use client";
import React from "react";

import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Meet from "@/app/components/Meet";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import SideBar from "@/app/components/nav/SideBar";

import OffersTable from "@/app/components/tables/OffersTable";
import Image from "next/image";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import Empty from "@/app/components/Empty";
import TableData from "@/app/components/TableData";
import BreadCrumb from "@/app/components/BreadCrumb";
import Link from "next/link";
import VerificationStatus from "@/app/components/VerficationStatus";
import { useAuth } from "@/app/context/AuthContext";

const Page = () => {
  const { data: overView, isLoading: isLoadingOverView } = useGetEntity("person-overview");
  const { data, isLoading } = useGetEntity("my-profile", "my-profile");
  const { userSettings, loading } = useAuth();
  if (isLoading || !data || isLoadingOverView || loading) return <Spinner />;
  const dataPage = data.data;
  console.log(overView);
  return (
    <div className="pt-40 ">
      <BreadCrumb
        linksCustom={[
          { href: "", text: "Home" },
          { href: "/person", text: "Dashboard" },
        ]}
      />
      <MaxWidthWrapper>
        <div className="flex flex-col lg:grid lg:grid-cols-8 gap-5">
          <SideBar person />

          {!data.status ? (
            <div className="col-span-6">
              {" "}
              <Empty text={data.message} textLink="Create  Profile Now" link="/person/create-profile" />
            </div>
          ) : (
            <section className="col-span-6">
              {userSettings?.verification_type !== "auto-approved" &&
                userSettings?.verification_type !== "manual-approved" && (
                  <VerificationStatus verification_type={userSettings.verification_type} />
                )}

              <div className="flex mb-5 justify-between">
                <div className="flex text-main2 font-semibold flex-col">
                  <span className="text-xl tracking-widest">HELLO,</span>
                  <MiniTitle
                    boldness="bold"
                    size="2xl"
                    color="text-main2"
                    className="-mt-2 uppercase"
                    text={dataPage?.name}
                  />
                  <p className="text-gray-700 font-normal capitalize tracking-wider">
                    Here is your daily activities and applications
                  </p>
                </div>
              </div>
              <div className="flex gap-2   flex-col">
                <MiniTitle
                  link="/person/jobs"
                  className="capitalizes"
                  boldness="bold"
                  color="text-gray-900"
                  text="Recently Posted Jobs"
                />
                <TableData
                  viewbtn
                  person
                  jobs={overView.data.recomended_jobs.sort(
                    (a: any, b: any) => new Date(b.created_at) - new Date(a.created_at)
                  )}
                />
              </div>
              <div className="my-5">
                {" "}
                {overView.data.job_offers.length > 0 ? (
                  <div className=" flex flex-col  gap-2">
                    <MiniTitle
                      link="/person/job-offers"
                      className="capitalizes"
                      boldness="bold"
                      color="text-gray-900"
                      text="Offers"
                    />
                    <OffersTable person offers={overView.data.job_offers} />
                  </div>
                ) : (
                  <Empty text="No Job Offers Yet !" />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 my-4 gap-5">
                <div className="flex col-span-2 flex-col gap-4 bg-[#F7F9FB] px-5 py-5 rounded-lg">
                  <MiniTitle boldness="bold" text="RECENTLY MEETINGS" />
                  {overView.data.meetings.length > 0 ? (
                    overView.data.meetings.map((meet: any) => <Meet key={meet.id} meet={meet} />)
                  ) : (
                    <Empty text="No Meetings Yet !" />
                  )}
                  {overView.data.meetings.length > 0 && (
                    <Link href={`/person/meetings`} className=" underline flex items-center gap-2">
                      <span>View All Meetings</span>
                    </Link>
                  )}
                </div>
                <Link href="/person/jobs" className=" col-span-3 relative w-full h-96">
                  <Image src={"/find.jpg"} alt={"doctor"} fill className={"object-cover rounded-2xl"} />
                </Link>
              </div>
            </section>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
