"use client";
import React from "react";
import MiniTitle from "./defaults/MiniTitle";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FunctionalButton from "./FunctionalButton";
import { MinusCircle } from "lucide-react";

const Manager = () => {
  return (
    <div className=" w-full flex sm:flex-nowrap flex-wrap items-start gap-3 justify-between">
      <div className=" flex flex-1 flex-col items-start ">
        <MiniTitle size="md" color=" text-black" text="AHEMD MOHAMED HASSAN" />
        <p className="  text-xs sm:text-sm text-muted-foreground ">MOHAMED@gmail.com</p>
      </div>
      <div className=" flex-[30%] text-xs w-full flex-grow">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="MANAGE USERS" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="GOOD">GOOD</SelectItem>
              <SelectItem value="POOR">POOR</SelectItem>
              <SelectItem value="SHORTLIST">SHORTLIST</SelectItem>
              <SelectItem value="REJECTED">REJECTED</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className=" flex-1  justify-start gap-2 flex  items-center">
        <FunctionalButton className=" text-xs rounded-full" size={"sm"} btnText="UPDATE" onClick={() => {}} />
        <FunctionalButton
          icon={<MinusCircle className=" mr-2" />}
          className=" text-xs rounded-full"
          size={"sm"}
          variant={"destructive"}
          btnText="DELETE"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Manager;
