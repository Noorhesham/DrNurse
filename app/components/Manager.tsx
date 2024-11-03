"use client";
import React from "react";
import MiniTitle from "./defaults/MiniTitle";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FunctionalButton from "./FunctionalButton";
import { MinusCircle } from "lucide-react";
import { MultiSelect } from "./inputsForm/MultiSelect";
import { useFormContext } from "react-hook-form";

const Manager = ({ manager }: { manager: { email: string; name: string } }) => {
  const permissions = JSON.parse(manager.pivot.permissions);
  const form=useFormContext()
  return (
    <div className=" w-full flex sm:flex-nowrap flex-wrap items-start gap-3 justify-between">
      <div className=" flex flex-1 flex-col items-start ">
        <MiniTitle size="md" color=" text-black" text={manager.name} />
        <p className="  text-xs sm:text-sm text-muted-foreground ">{manager.email}</p>
      </div>
      <div className=" flex-[30%] text-xs w-full flex-grow">
        <MultiSelect
          name={`managers.${index}.permissions`}
          options={[
            { value: "mangers-view", label: "View Managers" },
            { value: "update-mangers", label: "Update Managers" },
          ]}
          onValueChange={(val) => form.setValue(`managers.${index}.permissions`, val)}
          defaultValue={permissions || []}
        />
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
