"use client";

import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import MotionItem from "./defaults/MotionItem";
import Image from "next/image";
// brain.svg
const RightMind = () => {
  const [hover, setHover] = useState(false);
  const t = useTranslations();

  return (
    <div className=" relative">
      <AnimatePresence>
        {hover && (
          <MotionItem
            whileInView={{ scale: 1.2, rotate: 0, opacity: 1 }}
            initial={{ scale: 1, rotate: 40, opacity: 0 }}
            exit={{ scale: 1, rotate: 40, opacity: 0 }}
            className=" w-16 p-3  bg-white rounded-full  z-50 h-16 aspect-square -top-20 right-16  absolute"
          >
            <Image src={"/brain.svg"} alt={"brain"} fill className={"object-cover  p-1"} />
          </MotionItem>
        )}
      </AnimatePresence>
      <p onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} className=" basis-[70%] text-gray-100">
        {t("footer.copyright")}{" "}
        <Link target="_blank" href={`https://rightminddev.com/`}>
          Right Mind
        </Link>
      </p>
    </div>
  );
};

export default RightMind;
