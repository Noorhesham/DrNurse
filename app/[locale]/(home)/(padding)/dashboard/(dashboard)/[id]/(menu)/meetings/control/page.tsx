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
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import Paragraph from "@/app/components/defaults/Paragraph";
const page = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId") || "0";
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();
  console.log(jobId);
  const { data, isLoading } = useGetEntity("meetings", `meetings-${jobId}`, jobId || "0" || "");
  if (isLoading || !data) return <Spinner />;
  console.log(data);
  console.log(data);
  // const invitations = data.data.filter((meet: any) => meet.status === "invitation");
  const meetings = data.data.filter((meet: any) => meet.status !== "invitation");
  return (
    <section className=" flex flex-col gap-8">
      {/* <div className=" flex flex-col gap-2">
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
                          resourceName: "cancel-book",
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
                    CANCEL MEETING
                  </Button>
                </FlexWrapper>
              </Container>
            ))
          ) : (
            <Empty text="NO INVITATIONS" />
          )}
        </div>
      </div> */}
      <div className=" flex flex-col gap-2">
        <MiniTitle text="MEETINGS" />
        <div className=" flex flex-col gap-3 mt-4">
          {meetings.length > 0 ? (
            meetings.map((meet: any) => (
              <Container>
                <FlexWrapper max={false} className=" justify-between">
                  <Meet meet={meet} img />
                  <div className=" flex items-center gap-3">
                    {meet.status !== "cancelled" ? (
                      <ModalCustom
                        btn={
                          <Button size={"lg"} className=" rounded-full">
                            CHANGE MEETING STATUS
                          </Button>
                        }
                        content={
                          <div className="flex flex-col justify-center gap-2">
                          <Paragraph
                            description={"DETERMINE WHETHER YOU WANT TO DISABLED OR RESCHEDULE THE MEETING"}
                          />
                          <div className="flex items-center justify-center gap-5">
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

                                    queryClient.invalidateQueries({ queryKey: [`meetings-${meet.req_job_post_id}`] });
                                  } else toast.error(res.message);
                                });
                              }}
                              variant={"destructive"}
                              size={"lg"}
                              className=" rounded-full"
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

                                    queryClient.invalidateQueries({ queryKey: [`meetings-${meet.req_job_post_id}`] });
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
                    ) : (
                      <Button disabled={true} variant={"destructive"} size={"lg"} className=" rounded-full">
                        CANCELED
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
      </div>
    </section>
  );
};

export default page;
