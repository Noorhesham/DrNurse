"use client";
import Container from "@/app/components/Container";
import FlexWrapper from "@/app/components/defaults/FlexWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import Empty from "@/app/components/Empty";
import Meet from "@/app/components/Meet";
import Spinner from "@/app/components/Spinner";
import { Server } from "@/app/main/Server";
import { Button } from "@/components/ui/button";
import { useGetEntity } from "@/lib/queries";
import { redirect, useParams, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import Paragraph from "@/app/components/defaults/Paragraph";
import Link from "next/link";
const page = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId") || "0";
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading } = useGetEntity("meetings", `meetings-${jobId}`, jobId || "0" || "");
  if (isLoading || !data) return <Spinner />;
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  const invitations = data.data.filter((meet: any) => meet.status === "invitation");
  const meetings = data.data.filter((meet: any) => meet.status !== "invitation");
  console.log(meetings)
  return (
    <section className=" flex flex-col gap-8">
      <div className=" flex flex-col gap-2">
        <MiniTitle text="MEETINGS" />
        <div className=" flex flex-col gap-3 mt-4">
          {meetings.length > 0 ? (
            meetings.map((meet: any) => (
              <Container>
                <FlexWrapper max={false} className=" justify-between">
                  <Meet id={id} meet={meet} img />
                  <div className=" flex items-center gap-3">
                    {meet.status !== "cancelled" ? (
                      <div className="flex lg:flex-nowrap flex-wrap items-center gap-2">
                        <ModalCustom
                          btn={
                            <Button size={"lg"} className=" rounded-full">
                              Change Status
                            </Button>
                          }
                          content={
                            <div className="flex flex-col items-center justify-center gap-2">
                              <Paragraph
                                description={"DETERMINE WHETHER YOU WANT TO DISABLED OR RESCHEDULE THE MEETING"}
                              />
                              <div className="flex items-center justify-center gap-5">
                                <Button
                                  disabled={isPending}
                                  onClick={() => {
                                    startTransition(async () => {
                                      const res = await Server({
                                        resourceName: "cancelInvite",
                                        body: {
                                          meeting_id: meet.id,
                                          cancelled: false,
                                        },
                                      });
                                      if (res.status) {
                                        toast.success(res.message);

                                        queryClient.invalidateQueries({
                                          queryKey: [`meetings-${jobId}`],
                                        });
                                      } else toast.error(res.message);
                                    });
                                  }}
                                  variant={"destructive"}
                                  size={"lg"}
                                  className=" rounded-full"
                                >
                                  Reschedule Meeting
                                </Button>{" "}
                                <Button
                                  disabled={isPending}
                                  onClick={() => {
                                    startTransition(async () => {
                                      const res = await Server({
                                        resourceName: "cancelInvite",
                                        body: {
                                          meeting_id: meet.id,
                                          cancelled: true,
                                        },
                                      });
                                      if (res.status) {
                                        toast.success(res.message);

                                        queryClient.invalidateQueries({
                                          queryKey: [`meetings-${jobId}`],
                                        });
                                      } else toast.error(res.message);
                                    });
                                  }}
                                  variant={"destructive"}
                                  size={"lg"}
                                  className=" rounded-full"
                                >
                                  Cancel Meeting
                                </Button>
                              </div>
                            </div>
                          }
                        />
                        <Button
                          disabled={isPending}
                          onClick={async () => {
                            startTransition(async () => {
                              const res = await Server({ resourceName: "start-meet", id: meet.id });
                              console.log(res);
                              router.push(res.start_url);
                            });
                          }}
                          size={"lg"}
                          className="self-center mr-auto bg-main2  rounded-full"
                        >
                          Start Meeting
                        </Button>
                        <Button
                          onClick={() => copyToClipboard(meet.zoom_meeting.start_url)}
                          size={"lg"}
                          className=" rounded-full"
                        >
                          Copy Invitaion Link
                        </Button>
                      </div>
                    ) : (
                      <Button disabled={true} variant={"destructive"} size={"lg"} className=" rounded-full">
                        Cancelled
                      </Button>
                    )}
                  </div>
                </FlexWrapper>
              </Container>
            ))
          ) : (
            <Empty text="NO MEETINGS" />
          )}
        </div>
      </div>{" "}
      <div className=" flex flex-col gap-2">
        <MiniTitle text="INVITATIONS" />
        <div className=" flex flex-col gap-3 mt-4">
          {invitations.length > 0 ? (
            invitations.map((meet: any) => (
              <Container>
                <FlexWrapper max={false} className=" justify-between">
                  <Meet meet={meet} img />{" "}
                  <Button
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        const res = await Server({
                          resourceName: "cancelInvite",
                          body: {
                            meeting_id: meet.id,
                            cancelled: true,
                          },
                        });
                        if (res.status) {
                          toast.success(res.message);
                          router.refresh();
                          queryClient.invalidateQueries({
                            queryKey: ["person-slots", `person-meetings`, `meetings-${jobId}`],
                          });
                        } else toast.error(res.message);
                      });
                    }}
                    variant={"destructive"}
                    size={"lg"}
                    className=" rounded-full"
                  >
                    Cancel Invitation
                  </Button>
                </FlexWrapper>
              </Container>
            ))
          ) : (
            <Empty text="NO INVITATIONS" />
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
