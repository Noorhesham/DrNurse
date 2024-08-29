"use client";
import React from "react";
import MiniTitle from "./MiniTitle";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FunctionalButton from "./FunctionalButton";
import { MinusCircle } from "lucide-react";

const Manager = () => {
  return (
    <div className=" w-full flex items-start gap-5 justify-between">
      <div className=" flex flex-1 flex-col items-start ">
        <MiniTitle size="md" color=" text-black" text="AHEMD MOHAMED HASSAN" />
        <p className="  text-sm text-muted-foreground ">MOHAMED@gmail.com</p>
      </div>
      <div className=" flex-[30%] w-full flex-grow">
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
      <div className=" flex-1  justify-end gap-2 flex items-center">
        <FunctionalButton className=" rounded-full" size={"sm"} btnText="UPDATE" onClick={() => {}} />
        <FunctionalButton
          icon={<MinusCircle />}
          className=" rounded-full"
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
