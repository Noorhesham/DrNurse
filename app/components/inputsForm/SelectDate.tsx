"use client";
import React, { useTransition } from "react";
import Container from "../Container";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FlexWrapper from "../defaults/FlexWrapper";
import MiniTitle from "../defaults/MiniTitle";
import Paragraph from "../defaults/Paragraph";
import { Label } from "@/components/ui/label";
import { useGetEntity } from "@/lib/queries";
import Spinner from "../Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Server } from "@/app/main/Server";
import { format } from "date-fns";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FunctionalButton from "../FunctionalButton";
const formatToGMT = (dateStr) => {
  const date = new Date(dateStr);
  const gmtTime = utcToZonedTime(date, "Etc/UTC");
  return format(gmtTime, "dd/MM/yyyy hh:mmaaa");
};
const formatToLocalTime = (dateStr) => {
  const date = new Date(dateStr);
  return format(date, "dd/MM/yyyy hh:mmaaa");
};

const SelectDate = ({ meeting_id, jobId = "" }: { meeting_id: string; jobId: string }) => {
  const { data, isLoading } = useGetEntity("person-slots", `person-slots-${jobId}`, jobId || "");

  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = React.useState();
  const queryCLient = useQueryClient();
  if (isLoading || !data) return <Spinner />;
  const handleSelect = (slot_id: string) => {
    console.log(selected);
    startTransition(async () => {
      const res = await Server({
        resourceName: "book",
        body: {
          slot_id,
          meeting_id,
        },
      });
      console.log(res);
      if (res.status) {
        toast.success(res.message);
        queryCLient.invalidateQueries({ queryKey: [`person-meetings`] });
      } else toast.error(res.message);
    });
  };
  console.log(data);
  return (
    <div className=" flex flex-col gap-4 items-center">
      <div className=" flex flex-col items-center ">
        {/* <MiniTitle
          size="lg"
          text="Senior General Practitioner"
          boldness="bold"
          color="text-main2"
          className=" text-center"
        /> */}
        <Paragraph size="sm" description="Choose the time that suits you from the following appointments" />
      </div>
      <RadioGroup value={selected} className="flex justify-center w-full flex-col items-center mt-2">
        {data.data.map((option: any, i: number) => (
          <Container key={i} className=" w-[80%]">
            <div>
              <Label className="flex justify-between w-full items-center gap-2" htmlFor={option.date}>
                <div className="flex flex-col gap-1">
                  <h4 className="text-main2 font-semibold">{formatToLocalTime(option.from_date)}</h4>
                  <p className=" text-muted-foreground">DURATION {option.duration}</p>
                </div>
                <RadioGroupItem
                  onClick={() => setSelected(option.id)}
                  disabled={isPending}
                  id={option.id}
                  value={option.id}
                />
              </Label>
            </div>
          </Container>
        ))}
      </RadioGroup>
      <div className="flex items-center gap-4">
        <FunctionalButton disabled={isPending} btnText="Book" onClick={() => handleSelect(selected)} />
        <DialogClose className="mx-auto flex items-center gap-5">
          {
            <div className="text-xs py-3 text-center  flex-grow mr-auto min-w-[150px] self-center mx-0 hover:bg-main2 hover:text-white rounded-full flex items-center gap-2 px-6 border border-main2 bg-white text-main2">
              Close
            </div>
          }
        </DialogClose>
      </div>
    </div>
  );
};

export default SelectDate;
