import React from "react";
import GridContainer from "./defaults/GridContainer";
import Logo from "./Logo";
import Socials from "./Socials";
import { useTranslations } from "next-intl";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import Image from "next/image";
import DownloadButtons from "./DownloadButtons";
import FlexWrapper from "./defaults/FlexWrapper";
import Link from "next/link";
import RightMind from "./RightMind";
import JobsFooter from "./JobsFooter";

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer className=" text-xs md:text-sm relative">
      <Image
        className=" lg:block hidden w-full  -z-10 absolute left-0 -top-5"
        width={800}
        height={400}
        alt="footer"
        src={"/footershape.svg"}
      />
      <div className="lg:block hidden w-6 h-6 rounded-full bg-main2 absolute top-10 z-30 left-[30%]"></div>
      <div className=" relative ">
        <div className="  hidden lg:block z-[-1] absolute w-full h-full inset-0">
          <Image src={"/footer.svg"} alt="footer" fill className=" object-top object-cover" />
        </div>
        <MaxWidthWrapper
          noPadding
          className=" flex z-10 lg:bg-none  bg-gradient-to-b from-[#224982] to-[#0C1D37]  flex-col items-start  pb-5 lg:pt-32"
        >
          <GridContainer
            className=" pb-5   text-center lg:text-justify  border-white border-b justify-between gap-y-5 md:gap-y-10 lg:gap-20 "
            cols={11}
          >
            <div className=" col-span-4 lg:col-span-3 flex flex-col  items-center">
              <Logo size="lg" />
              <Socials />
            </div>

            <div className=" col-span-full lg:col-span-2 self-end flex flex-col text-white items-start">
              <ul className=" lg:list-disc gap-2 mx-auto grid grid-cols-1 w-full items-start  place-items-center lg:place-items-start ">
                <li className=" hover:opacity-80 duration-150">
                  <Link href={"/about-us"}>{t("aboutus")}</Link>
                </li>
                <li className=" hover:opacity-80 duration-150">
                  <Link href={"/contact-us"}>{t("contactus")}</Link>
                </li>
                <li className=" hover:opacity-80 duration-150">
                  {" "}
                  <Link href={"/blogs"}>{t("ourblog")}</Link>
                </li>
                {/* <Link href={"#"}>{t("testimonials")}</Link> */}
                <li className=" hover:opacity-80 duration-150">
                  {" "}
                  <Link href={"/faq"}>FAQ</Link>
                </li>
                <li className=" hover:opacity-80 duration-150">
                  {" "}
                  <Link href={"/privacy-policy"}>PRIVACY POLICY</Link>
                </li>
              </ul>
            </div>

            <div className=" col-span-full lg:col-span-6 self-end flex flex-col items-center lg:items-start">
              <h4
                className=" text-white   mb-3 after:w-full after:lg:block after:hidden after:left-[110%] after:top-1/2 after:rounded-2xl after:bg-white after:absolute after:h-[1px] 
          relative text-base md:text-xl"
              >
                MORE JOBS
              </h4>
           <JobsFooter/>
            </div>
          </GridContainer>
          <FlexWrapper max={false} className=" w-full mt-5 gap-5 flex justify-between items-center">
            <RightMind />

            <div className="flex   justify-center self-end  w-full lg:basis-[30%] items-center gap-3">
              <DownloadButtons />
            </div>
          </FlexWrapper>
        </MaxWidthWrapper>
      </div>
    </footer>
  );
};

export default Footer;
