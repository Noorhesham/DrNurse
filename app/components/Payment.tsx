"use client";
import React, { useTransition } from "react";
import { useGetEntity } from "@/lib/queries";
import Spinner from "./Spinner";
import Image from "next/image";
import { Server } from "../main/Server";
import { WEBSITEURL } from "../constants";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import GridContainer from "./defaults/GridContainer";
import MiniTitle from "./defaults/MiniTitle";
import FunctionalButton from "./FunctionalButton";
import Link from "next/link";
import { format } from "date-fns";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";

const Payment = ({ planId, invoice, job }: { planId: string; invoice?: boolean; job?: any }) => {
  const [selected, setSelected] = React.useState<string>("");
  const { data, isLoading } = useGetEntity("payment", "payment");
  const { id } = useParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  if (isLoading || !data) return <Spinner />;
  const handlePayment = () => {
    startTransition(async () => {
      const res = invoice
        ? await Server({
            resourceName: "pay-invoice",
            id: planId,
            body: {
              callback: `${WEBSITEURL}/success`,
              external_app_id: selected,
            },
          })
        : await Server({
            resourceName: "subscribe",
            body: {
              callback: `${WEBSITEURL}/success`,
              plan_id: planId,
              external_app_id: selected,
              company_id: id,
            },
          });
      console.log(res);
      if (res.status) {
        toast.success(res.message);
        router.refresh();
        if (res.url) router.push(res.url);
        else router.push(`/dashboard/${id}/invoices`);
      } else toast.error(res.message);
    });
  };
  return (
    <div className="flex flex-col mt-5 items-center gap-5">
      <MaxWidthWrapper noPadding className="flex justify-between w-full items-center">
        <h2 className=" text-gray-900  font-semibold">{job?.title}</h2>{" "}
        <span
          className={`list-disc relative ml-3 mr-2 after:-left-2 after:top-1/2 after:-translate-y-1/2 after:absolute 
                          after:w-1.5 
                          after:h-1.5 after:rounded-full ${
                            job.status === "publish"
                              ? "after:bg-green-500"
                              : job.status === "draft"
                              ? "after:bg-blue-500"
                              : job.status === "closed"
                              ? "after:bg-red-500"
                              : " after:bg-yellow-400"
                          }`}
        >
          {format(job.created_at, "dd/MM/yyyy")}
        </span>
      </MaxWidthWrapper>
      <MiniTitle text="Select Payment Method" />
      <GridContainer cols={3}>
        {" "}
        {data.paymentGateWays.map(
          ({ logo, id, title }: { logo: { sizes: { large: string } }[]; id: string; title: string }, i: number) => (
            <label htmlFor={id} className=" flex  gap-2  flex-col items-center">
              <div className=" w-20 h-20 aspect-square relative">
                <Image className=" object-contain" src={logo?.[0]?.sizes?.large} alt={title} fill />
              </div>
              <p className="text-main2 font-semibold text-xs">{title}</p>
              <input
                value={id}
                checked={selected === id}
                name="payment-method"
                onChange={() => setSelected(id)}
                type="radio"
                id={id}
              />
            </label>
          )
        )}
      </GridContainer>
      <FunctionalButton btnText={invoice ? "PAY INVOICE" : "SUBSCRIBE"} onClick={handlePayment} disabled={isPending} />
    </div>
  );
};

export default Payment;
