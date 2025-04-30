"use client";
import React, { useTransition } from "react";
import Paragraph from "./defaults/Paragraph";
import FlexWrapper from "./defaults/FlexWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const Negotiation = ({ negotiation, jobOfferId }: { negotiation: any; jobOfferId: string }) => {

  const { id } = useParams();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  return (
    <div className=" flex flex-col h-full justify-center   gap-4 items-center">
      <Paragraph size="lg" className=" uppercase" description={negotiation.description} />
      <FlexWrapper className=" justify-center">
        <Link href={`/dashboard/${id}/edit-offer/${jobOfferId}`}>
          <Button className=" rounded-full" size={"sm"}>
            EDIT OFFER
          </Button>
        </Link>
        <Button
          onClick={() => {
            startTransition(async () => {
              const res = await Server({ resourceName: "cancel-offer", body: { job_offer_id: jobOfferId } });
    
              if (res.status) {
                toast.success(res.message);
                queryClient.invalidateQueries({ queryKey: ["offers"] });
              } else toast.error(res.message);
            });
          }}
          disabled={isPending}
          variant={"destructive"}
          className=" rounded-full"
        >
          CANCEL OFFER
        </Button>
      </FlexWrapper>
    </div>
  );
};

export default Negotiation;
