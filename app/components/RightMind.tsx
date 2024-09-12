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
  console.log(hover);
  return (
    <div className=" relative">
      <AnimatePresence>
        {hover && (
          <MotionItem
            whileInView={{ scale: 1.2, rotate: 0, opacity: 1 }}
            initial={{ scale: 1, rotate: 40, opacity: 0 }}
            exit={{ scale: 1, rotate: 40, opacity: 0 }}
            className=" w-16  bg-white rounded-full p-2 z-50 h-16 aspect-square -top-14 left-36  absolute"
          >
            <Image src={"/brain.svg"} alt={"brain"} fill className={"object-cover"} />
          </MotionItem>
        )}
      </AnimatePresence>
      <p onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} className=" basis-[70%] text-gray-100">
        {t("footer.copyright")} <Link href={`https://rightminddev.com/`}>Right Mind</Link>
      </p>
    </div>
  );
};

export default RightMind;
