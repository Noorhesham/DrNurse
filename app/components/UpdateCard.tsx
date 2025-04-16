import React, { cloneElement } from "react";

const UpdateCard = ({ icon, text, desc }: { icon: any; text: string; desc: string }) => {
  return (
    <div className="  cursor-pointer z-20 relative  rounded-2xl  py-12    flex flex-col items-center  text-xl bg-[#F2F5FF] ">
      {React.cloneElement(icon, { className: " w-8 h-8 lg:w-10 lg:h-10 text-main" })}
      <h2 className=" my-2  text-lg lg:text-xl text-center font-medium">{text}</h2>
      <p className=" text-black text-center    text-muted-foreground text-sm">{desc}</p>
    </div>
  );
};

export default UpdateCard;
