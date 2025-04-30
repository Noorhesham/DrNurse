"use client";
import React, { useState, useTransition } from "react";
import Container from "@/app/components/Container";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MiniTitle from "../defaults/MiniTitle";
import { Button } from "@/components/ui/button";
import { useGetEntities } from "../inputsForm/CareerTypeInput";
import Spinner from "../Spinner";
import { Server } from "@/app/main/Server";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { DialogClose } from "@/components/ui/dialog";
const MeetingActions = ({ offerId }: { offerId: string }) => {
  const { data, isLoading } = useGetEntities({
    resourceName: "getEntity",
    entityName: "negotiations",
    key: "negotiations",
  });
  const [negotiation, setNegotiation] = useState();
  const [isPending, startTransition] = useTransition();
  const QueryClient = useQueryClient();
  const handleOffer = async (status: string) => {
    startTransition(async () => {
      const res = await Server({
        resourceName: "offerAction",
        body: {
          status,
          job_offer_id: offerId,
        },
      });
      console.log(res);
      if (res.status) {
        toast.success(res.message);
        QueryClient.invalidateQueries({ queryKey: ["offers"] });
      } else toast.error(res.message);
    });
  };
  if (isLoading || !data) return <Spinner />;
  console.log(data);
  return (
    <div className=" flex gap-5 flex-col justify-center items-center">
      <div className=" flex flex-col items-center gap-4">
        <MiniTitle color=" text-main" text="MAIN ACTIONS" />
        <div className=" flex items-center gap-3">
          <Button
            disabled={isPending}
            onClick={() => handleOffer("approved")}
            className=" px-4 bg-main2 text-gray-50 rounded-full  py-1"
          >
            AGREE
          </Button>
          <Button
            disabled={isPending}
            onClick={() => handleOffer("rejected")}
            className=" px-4 bg-red-600 text-gray-50 rounded-full  py-1"
          >
            REFUSE
          </Button>
        </div>
      </div>
      <div className=" flex flex-col items-center gap-4">
        <MiniTitle color=" text-main" text="MORE ACTIONS" />
        <div className=" flex flex-col gap-3">
          <RadioGroup className=" flex justify-between flex-col items-center">
            {data.data.map((d: any) => (
              <Container
                onClick={() => setNegotiation(d.id)}
                className="  w-full  justify-between flex items-center gap-2"
              >
                <label>{d.description}</label>
                <RadioGroupItem disabled={isPending} checked={d.id === negotiation} id={d.id} value={d.id} />
              </Container>
            ))}
          </RadioGroup>
        </div>
      </div>
      <DialogClose>
        <Button
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              const res = await Server({
                resourceName: "negotiate",
                body: {
                  negotiation_id: negotiation,
                  job_offer_id: offerId,
                },
              });
              console.log(res);
              if (res.status) {
                toast.success(res.message);
                QueryClient.invalidateQueries({ queryKey: ["offers"] });
              } else toast.error(res.message);
            });
          }}
          className=" w-full lg:w-[30%]"
          size="lg"
        >
          SEND
        </Button>
      </DialogClose>
    </div>
  );
};

export default MeetingActions;
