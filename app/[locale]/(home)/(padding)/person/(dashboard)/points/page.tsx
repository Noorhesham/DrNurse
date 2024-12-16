"use client";
import FlexWrapper from "@/app/components/defaults/FlexWrapper";
import FunctionalButton from "@/app/components/FunctionalButton";
import Head1 from "@/app/components/Head1";
import Paragraph from "@/app/components/defaults/Paragraph";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaperclipIcon } from "lucide-react";
import React, { useTransition } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import { format } from "date-fns";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import { useAuth } from "@/app/context/AuthContext";
import { convertToHTML } from "@/lib/utils";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import FormContainer from "@/app/components/forms/FormContainer";
import { Server } from "@/app/main/Server";
import { toast } from "react-toastify";
import { WEBSITEURL } from "@/app/constants";
import Empty from "@/app/components/Empty";

const page = () => {
  const { data: terms, isLoading: isLoadingTerms } = useGetEntity("home", "terms-points", "terms-and-conditions");
  const { data: points, isLoading } = useGetEntity("points", "points");
  const { data: prizes, isLoading: isLoadingPrizes } = useGetEntity("prizes", "prizes");
  const handelCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("copied");
  };
  const { user2Settings, loading, userSettings } = useAuth();
  if (isLoading || !points || loading || isLoadingTerms || isLoadingPrizes || loading) return <Spinner />;
  return (
    <section>
      <div className="flex flex-col gap-2">
        <FlexWrapper max={false} className=" justify-between">
          <Head1 alignment="left" text="ABOUT POINTS PROGRAM" />
          <FunctionalButton
            icon={<PaperclipIcon className="w-5 h-5" />}
            btnText="CONDITIONS"
            content={
              <MaxWidthWrapper className=" flex flex-col items-center gap-3">
                <MiniTitle boldness="bold" text="Conditions for the points system" color="text-main2" />
                <div
                  dangerouslySetInnerHTML={{ __html: convertToHTML(terms.page.content || "") }}
                  className={` text-black lg:text-base text-sm  font-medium my-2 leading-[1.7] `}
                />
              </MaxWidthWrapper>
            }
          />
        </FlexWrapper>
        <Paragraph
          full
          description="About program I am pleased to reach out to you today to offer a job opportunity as a Surgical Nurse with us. Given your experience and outstanding skills in the field About program I am pleased to reach out to you today to offer a job opportunity as a Surgical Nurse with us. Given your experience and outstanding skills in the fields"
        />
      </div>
      <FlexWrapper max={false} className=" mt-10 justify-between">
        <div className=" flex w-full items-center   gap-1">
          <div className=" flex  w-full flex-col gap-2">
            <Label>Invite a friend</Label>
            <div className=" flex items-center gap-2 justify-between">
              <Input disabled className={` bg-white shadow-sm w-full `} placeholder={userSettings.referral_code} />
              <button
                onClick={() => handelCopy(userSettings.referral_code)}
                className=" m-auto text-sm text-main2 font-medium "
              >
                COPY
              </button>
            </div>
          </div>
        </div>
        <div className=" flex items-center  w-full gap-1">
          <div className=" flex  w-full  flex-col gap-2">
            <Label>Invite a friend</Label>{" "}
            <div className=" flex items-center gap-2 justify-between">
              <Input
                disabled
                className={` bg-white shadow-sm w-full `}
                placeholder={`${WEBSITEURL}?referal=${userSettings.referral_code}`}
              />{" "}
              <button
                onClick={() => handelCopy(userSettings.referral_code)}
                className=" m-auto text-sm text-main2 font-medium "
              >
                COPY
              </button>
            </div>
          </div>
        </div>
      </FlexWrapper>
      {points > 0 ? 
        <div className=" flex flex-col gap-2 mt-10">
          <FlexWrapper max={false} className=" justify-between">
            <div className=" flex flex-col gap-2">
              <Head1 alignment="left" text={`${user2Settings.points.available} Points`} />
              <h2 className=" font-semibold text-black">from {user2Settings.points.total}</h2>
            </div>

            <FunctionalButton
              icon={<PaperclipIcon className="w-5 h-5" />}
              btnText="REDEEM NOW"
              content={
                <MaxWidthWrapper className=" flex flex-col ">
                  <FormContainer
                    submit={async (data: any) => {
                      const res = await Server({
                        resourceName: "reedem",
                        body: data,
                      });
                      if (res.status) toast.success(res.message);
                      else toast.error(res.message);
                    }}
                    formArray={[{ name: "prize", select: true, options: prizes.prizes.map((prize: string) => prize) }]}
                  />
                </MaxWidthWrapper>
              }
            />
          </FlexWrapper>
          <Table className=" mt-2">
            <TableHeader className=" bg-light">
              <TableRow>
                <TableHead className="w-[35%]">Title</TableHead>
                <TableHead>Redeem Date</TableHead>
                <TableHead className="w-[25%]">Number of points</TableHead>
                <TableHead className="">Purpose of replacement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {points.history.map((job, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <div className=" flex flex-col items-start">
                      <h2 className=" text-gray-900 font-semibold">{job.title}</h2>
                    </div>
                  </TableCell>

                  <TableCell className="  gap-2 ">{format(job.created_at, "mmm dd, yyyy")}</TableCell>
                  <TableCell
                    className={`${job.operation !== "deposit" ? "text-red-500" : " text-main2"} font-semibold  gap-2 `}
                  >
                    {job.operation !== "deposit" && "-"}
                    {job.points}
                  </TableCell>
                  <TableCell className=" text-main2 font-semibold  gap-2 ">{job.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>:<div className="mt-8"><Empty text="You don't have any points yet"/></div>
      }
    </section>
  );
};

export default page;
