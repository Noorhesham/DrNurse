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

const Payment = ({ planId, invoice }: { planId: string; invoice?: boolean }) => {
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
        router.refresh()
        if (res.url) router.push(res.url);
        else router.push(`/dashboard/${id}/invoices`);
      } else toast.error(res.message);
    });
  };
  return (
    <div className="flex flex-col items-center gap-5">
      <MiniTitle text="Select Payment Method" />
      <GridContainer cols={3}>
        {" "}
        {data.paymentGateWays.map(
          ({ logo, id, title }: { logo: { sizes: { large: string } }[]; id: string; title: string }, i: number) => (
            <label htmlFor={id} className=" flex  gap-2  flex-col items-center">
              <div className=" w-20 h-20 aspect-square relative">
                <Image className=" object-contain" src={logo[0].sizes.large} alt={title} fill />
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
      <FunctionalButton btnText={invoice?'PAY INVOICE':'SUBSCRIBE'} onClick={handlePayment} disabled={isPending} />
    </div>
  );
};

export default Payment;
