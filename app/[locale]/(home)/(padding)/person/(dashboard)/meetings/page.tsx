"use client";
import CompanyInfo from "@/app/components/CompanyInfo";
import Container from "@/app/components/Container";
import FlexWrapper from "@/app/components/defaults/FlexWrapper";
import SelectDate from "@/app/components/inputsForm/SelectDate";
import MainProfile from "@/app/components/MainProfile";
import Meet from "@/app/components/Meet";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useTransition } from "react";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import Empty from "@/app/components/Empty";
import { Server } from "@/app/main/Server";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Paragraph from "@/app/components/defaults/Paragraph";

const page = () => {
  const { data, isLoading } = useGetEntity("person-meetings", "person-meetings");
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();
  if (isLoading || !data) return <Spinner />;

  const invitations = data.data.filter((meet: any) => meet.status === "invitation");
  const meetings = data.data.filter((meet: any) => meet.status !== "invitation");
  console.log(meetings);
  return (
    <section className=" flex flex-col gap-8">
      <div className=" flex flex-col gap-2">
        <MiniTitle text="INVITATIONS" />
        <div className=" flex flex-col gap-3 mt-4">
          {invitations.length > 0 ? (
            invitations.map((meet: any) => (
              <Container>
                <FlexWrapper max={false} className=" justify-between">
                  <Meet meet={meet} img />
                  <div className=" flex flex-wrap lg:flex-nowrap items-center gap-3">
                    <ModalCustom
                      content={
                        <SelectDate
                          companyId={meet.company_id}
                          person
                          meet={meet}
                          jobId={meet.req_job_post_id}
                          meeting_id={meet.id}
                        />
                      }
                      btn={
                        <Button size={"lg"} className=" rounded-full">
                          SET DATE
                        </Button>
                      }
                    />{" "}
                    {meet.req_job_post_id && (
                      <Link target="_blank" href={`/person/job/${meet.req_job_post_id}`}>
                        <Button size={"lg"} className="  bg-light text-main2 rounded-full" variant={"outline"}>
                          VIEW JOB
                        </Button>
                      </Link>
                    )}
                    <ModalCustom
                      content={
                        <div className=" flex flex-col gap-5">
                          <MainProfile
                            user={{
                              name: meet.company?.title,
                              image: meet.company_logo?.[0]?.file || "/nanana.svg",
                              address:
                                meet.company?.branches?.length > 0
                                  ? `${meet.company?.branches?.[0].country?.title}, ${meet.company?.branches?.[0].city?.title}`
                                  : "",
                            }}
                          />
                          <CompanyInfo hospital={meet.company} />
                        </div>
                      }
                      btn={
                        <Button size={"lg"} className=" w-full  bg-light text-main2 rounded-full" variant={"outline"}>
                          HOSPITAL INFO
                        </Button>
                      }
                    />
                  </div>
                </FlexWrapper>
              </Container>
            ))
          ) : (
            <Empty text="NO INVITATIONS" />
          )}
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <MiniTitle text="MEETINGS" />
        <div className=" flex flex-col gap-3 mt-4">
          {meetings.length > 0 ? (
            meetings.map((meet: any) => (
              <Container>
                <FlexWrapper max={false} className=" justify-between">
                  <Meet meet={meet} img />{" "}
                  <div className=" md:grid grid-cols-2 flex-wrap items-center gap-3">
                    {meet.zoom_meeting&& meet.status !== "completed" && (
                      <Link className="self-center w-full " target="_blank" href={meet.zoom_meeting.join_url}>
                        <Button size={"lg"} className=" w-full rounded-full">
                          JOIN MEETING
                        </Button>
                      </Link>
                    )}
                    {meet.status !== "cancelled" && meet.status !== "completed" ? (
                      <ModalCustom
                        btn={
                          <Button size={"lg"} className=" rounded-full">
                            CHANGE MEETING STATUS
                          </Button>
                        }
                        content={
                          <div className="flex lg:flex-nowrap flex-wrap items-center justify-center flex-col gap-2">
                            <Paragraph
                              description={"DETERMINE WHETHER YOU WANT TO DISABLED OR RESCHEDULE THE MEETING"}
                            />
                            <div className="flex flex-wrap lg:flex-nowrap  justify-center  items-center gap-5">
                              <Button
                                disabled={isPending}
                                onClick={() => {
                                  startTransition(async () => {
                                    const res = await Server({
                                      resourceName: "cancel-book",
                                      body: {
                                        meeting_id: meet.id,
                                        cancelled: false,
                                      },
                                    });
                                    if (res.status) {
                                      toast.success(res.message);
                                      queryClient.invalidateQueries({ queryKey: [`person-meetings`] });
                                    } else toast.error(res.message);
                                  });
                                }}
                                variant={"destructive"}
                                size={"lg"}
                                className="uppercase rounded-full"
                              >
                                RESCHEDULE MEETING
                              </Button>{" "}
                              <Button
                                disabled={isPending}
                                onClick={() => {
                                  startTransition(async () => {
                                    const res = await Server({
                                      resourceName: "cancel-book",
                                      body: {
                                        meeting_id: meet.id,
                                        cancelled: true,
                                      },
                                    });
                                    if (res.status) {
                                      toast.success(res.message);

                                      queryClient.invalidateQueries({ queryKey: [`person-meetings`] });
                                    } else toast.error(res.message);
                                  });
                                }}
                                variant={"destructive"}
                                size={"lg"}
                                className=" rounded-full"
                              >
                                CANCEL MEETING
                              </Button>
                            </div>
                          </div>
                        }
                      />
                    ) : meet.status !== "completed" ? (
                      <Button
                        disabled={true}
                        variant={"destructive"}
                        size={"lg"}
                        className=" w-full lg:w-fit rounded-full"
                      >
                        CANCELED
                      </Button>
                    ) : (
                      ""
                    )}
                    {meet.req_job_post_id && (
                      <Link target="_blank" className="w-full" href={`/person/job/${meet.req_job_post_id}`}>
                        {" "}
                        <Button size={"lg"} className=" w-full  bg-light  text-main2 rounded-full" variant={"outline"}>
                          VIEW JOB
                        </Button>
                      </Link>
                    )}
                    {meet.company && (
                      <ModalCustom
                        content={
                          <div className=" flex flex-col gap-5">
                            <MainProfile
                              user={{
                                name: meet.company.title,
                                image: meet.company.logo?.[0]?.file || "/nanana.svg",
                                address: meet.company.business,
                              }}
                            />
                            <CompanyInfo hospital={meet.company} />
                          </div>
                        }
                        btn={
                          <Button size={"lg"} className="w-full   bg-light text-main2 rounded-full" variant={"outline"}>
                            HOSPITAL INFO
                          </Button>
                        }
                      />
                    )}
                  </div>
                </FlexWrapper>
              </Container>
            ))
          ) : (
            <Empty text="NO MEETINGS" />
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
