import React from "react";
import MiniTitle from "./defaults/MiniTitle";


const JobBenefits = ({ job }: any) => {
  return (
    <div>
      {JSON.parse(job.benefits).length > 0 && (
        <div className="flex flex-col my-2 gap-1">
          {" "}
          {<MiniTitle boldness="bold" color=" text-main2" text="JOB BENEFITS" />}
          <ul className=" text-black ml-[16px] list-disc lg:text-base text-sm  font-medium  leading-[1.7] ">
            {JSON.parse(job.benefits)?.map((benefit: string) => (
              <li className="" key={benefit}>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobBenefits;
