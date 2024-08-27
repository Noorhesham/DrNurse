import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SateChange = ({ size }: { size?: string }) => {
  return (
    <Select>
      <SelectTrigger
        className={`w-[180px] ${
          size === "sm" && "py-1 px-2"
        } text-sm rounded-full text-center placeholder:text-center placeholder:text-sm  bg-main2 text-gray-50`}
      >
        <SelectValue className=" text-center placeholder:text-center text-xs md:text-sm " placeholder="CHANGE STATE" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {["GOOD", "POOR", "SHORTLIST", "REJECTED"].map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SateChange;
