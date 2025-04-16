"use client";
import React from "react";

const InputCard = ({ setSearch, value }: { setSearch: any; value?: string }) => {
  return (
    <div
      onClick={() => setSearch(value)}
      className=" py-1.5 hover:text-gray-800 px-4  cursor-pointer hover:bg-white duration-150 text-white rounded-full border border-white text-center"
    >
      {value?.toUpperCase()}
    </div>
  );
};

export default InputCard;
