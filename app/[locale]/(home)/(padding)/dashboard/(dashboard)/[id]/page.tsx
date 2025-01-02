"use client";
import Doctor from "@/app/components/Doctor";
import FunctionalButton from "@/app/components/FunctionalButton";
import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Meet from "@/app/components/Meet";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import SideBar from "@/app/components/nav/SideBar";
import SwiperCards from "@/app/components/SwiperCards";
import TableData from "@/app/components/TableData";
import React from "react";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import { useParams } from "next/navigation";
import Empty from "@/app/components/Empty";
import Link from "next/link";
import VerificationStatus from "@/app/components/VerficationStatus";
const page = () => {
  const params = useParams();

  const { data: overView, isLoading: isLoadingOverView } = useGetEntity(
    "company-overview",
    `company-overview-${params.id}`,
    ""
  );

  const { data, isLoading } = useGetEntity("company", `company-${params.id}`, params.id || "", { enabled: !params.id });
  if (isLoading || !data || isLoadingOverView) return <Spinner />;
  if (!data.data?.title) return <Empty text="Company not Created" />;
  const { title } = data.data;
  return (
    <>
      <MaxWidthWrapper>
        <div className="  flex flex-col lg:grid lg:grid-cols-9 gap-4 lg:gap-8">
          <SideBar />
          <section className=" col-span-7">
            {data.data.verification_type !== "manual-approved" && data.data.verification_type !== "auto-approved" && (
              <VerificationStatus verification_type={data.data.verification_type || "pending"} />
            )}

            <div className=" flex md:flex-row flex-col md:gap-0 gap-3 md:mb-0 mb-2  justify-between">
              <div className="flex text-main2 font-semibold flex-col ">
                <span className=" text-xl tracking-widest">HELLO,</span>
                <MiniTitle
                  boldness="extraBold"
                  size="lg"
                  color=" text-main2"
                  className=" -mt-2 text-main2  uppercase"
                  text={title}
                />
                <p className=" text-gray-700 font-normal capitalize tracking-wider">
                  Here is your daily activities and applications
                </p>
              </div>
              <FunctionalButton btnText="POST A JOB" link={`/dashboard/${params.id}/post-job`} />
            </div>
            <div className=" my-5">
              {overView.data?.jobs.length > 0 ? (
                <div className=" mt-2 gap-2 flex flex-col">
                  <MiniTitle
                    link={`/dashboard/${params.id}/jobs`}
                    className=" capitalizes"
                    boldness="bold"
                    color=" text-gray-900"
                    text="Recently Posted Jobs"
                  />
                  <TableData
                    jobs={
                      overView.data?.jobs.sort((a: any, b: any) => new Date(b.created_at) - new Date(a.created_at)) ||
                      []
                    }
                  />
                </div>
              ) : (
                <Empty text="No Jobs Yet !" />
              )}
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 my-4 gap-5">
              <div className=" flex flex-col gap-4 bg-[#F7F9FB] px-5 py-5 rounded-lg">
                <MiniTitle boldness="bold" text="RECENTLY MEETINGS" />
                {overView.data?.meetings?.length > 0 ? (
                  overView.data?.meetings.map((meet: any) => <Meet id={params.id} key={meet.id} meet={meet} />)
                ) : (
                  <Empty text="No Meetings Yet !" />
                )}
                {overView.data?.meetings?.length > 0 && (
                  <Link href={`/dashboard/${params.id}/meetings`} className="underline flex items-center gap-2">
                    <span>View All Meetings</span>
                  </Link>
                )}
              </div>
              <div className=" flex flex-col gap-4 bg-[#F7F9FB] px-5 py-5 rounded-lg">
                <MiniTitle
                  link={`/dashboard/${params.id}/employees`}
                  boldness="bold"
                  text="Recently Proposed persons"
                />
                <div className=" md:block hidden">
                  <GridContainer cols={3}>
                    {overView.data?.proposed_persons?.length > 0 ? (
                      overView.data?.proposed_persons
                        .filter((person) => person.user?.profile)
                        .map((doctor: any) => (
                          <Doctor
                            link={`/dashboard/${params.id}/doctor/${doctor.user?.profile?.id}?job=${doctor.req_job_post_id}`}
                            doctor={{ ...doctor.user, image: doctor.user?.avatar_url }}
                          />
                        ))
                    ) : (
                      <Empty text="No Proposed persons Yet !" />
                    )}
                  </GridContainer>
                </div>
                <div className=" block md:hidden ">
                  {overView.data?.proposed_persons?.length > 0 ? (
                    <SwiperCards
                      autoplay
                      className=" w-full h-full"
                      slidesPerView={2}
                      samePhone
                      items={overView.data.proposed_persons.map((doctor: any, i: number) => ({
                        card: (
                          <Doctor
                            key={i}
                            link={`/dashboard/${params.id}/doctor/${doctor.user?.profile?.id}?job=${doctor.req_job_post_id}`}
                            doctor={{ ...doctor.user, image: doctor.user?.avatar_url }}
                          />
                        ),
                      }))}
                    />
                  ) : (
                    <Empty text="No Proposed persons Yet !" />
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default page;
