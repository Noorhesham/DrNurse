import React from "react";

const UpdateCard = ({ icon, text, desc }: { icon: any; text: string; desc: string }) => {
  return (
    <div className="  cursor-pointer z-20 relative  rounded-2xl  py-12    flex flex-col items-center  text-xl bg-[#F2F5FF] ">
      {icon}
      <h1 className=" my-2 text-xl text-center font-medium">{text}</h1>
      <p className=" text-black    text-muted-foreground text-sm">{desc}</p>
    </div>
  );
};

export default UpdateCard;
