import AddNewManager from "@/app/components/forms/AddNewManager";
import Manager from "@/app/components/Manager";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import React from "react";

const page = () => {
  return (
    <section>
      <MiniTitle boldness="bold" size="lg" text="CONTROL MANAGERS" />
      <div className=" mt-5 flex items-start gap-6  md:gap-4 flex-col">
        <Manager />
        <Manager />
        <Manager />
      </div>
      <div className=" mt-10">
        <MiniTitle boldness="bold" size="lg" text="ADD NEW MANAGER" />
        <AddNewManager />
      </div>
    </section>
  );
};

export default page;
