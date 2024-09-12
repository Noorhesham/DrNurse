import CardContainer from "@/app/components/CardContainer";
import DownloadButtons from "@/app/components/DownloadButtons";
import FlexWrapper from "@/app/components/defaults/FlexWrapper";
import GridContainer from "@/app/components/defaults/GridContainer";
import Head1 from "@/app/components/Head1";
import Heading from "@/app/components/Heading";
import { PlayIcon } from "@/app/components/Icons";
import JobCard from "@/app/components/JobCard";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MotionContainer from "@/app/components/defaults/MotionContainer";
import MotionItem from "@/app/components/defaults/MotionItem";
import Paragraph from "@/app/components/defaults/Paragraph";
import Search from "@/app/components/Search";
import SwiperCards from "@/app/components/SwiperCards";
import VideoZoom from "@/app/components/VideoZoom";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main>
      <section
        className={`w-full h-screen bg-no-repeat bg-cover  `}
        style={{
          backgroundImage: `url('/job.jpg')`,
          backgroundPosition: "center",
          padding: "0px 0px 0px 0px",
          zIndex: 1,
        }}
      >
        <div className="w-full h-screen bg-[#224982] bg-opacity-30 absolute inset-0 z-10"></div>
        <MaxWidthWrapper className=" flex-col items-center justify-center w-full h-full">
          <div className="   h-full z-10 relative flex gap-4 md:gap-8 lg:gap-12 xl:mt-10 flex-col items-center justify-center">
            <Heading text="FIND YOUR JOB" title2={`Search for more than 5,000+ jobs worldwide`} />
            <Search />
          </div>
        </MaxWidthWrapper>
      </section>{" "}
      <MaxWidthWrapper className=" mt-5 flex flex-col gap-20">
        <div className="flex flex-col gap-5">
          <Head1 text="Join Sudia arabic 's Top Hospitals" />
          <SwiperCards
            autoplay={true}
            slidesPerView={5.3}
            className="h-36"
            contain
            logo
            items={[
              { src: "/logo13.png", left: true },
              { src: "/logo12.png" },
              { src: "/logo9.png" },
              { src: "/logo8.png" },
              { src: "/logo7.png" },
              { src: "/logo1.png" },
              { src: "/logo5.png" },
              { src: "/logo2.png" },
              { src: "/logo3.png" },
              { src: "/logo4.png" },
            ]}
          />
        </div>
        <FlexWrapper className=" h-full">
          <VideoZoom
            btn={
              <div className="  rounded-[2.5rem] overflow-hidden flex-1 relative aspect-square">
                {" "}
                <Image alt="image" fill className="object-cover cursor-pointer" src={"/doc2.jpg"} />
                <MotionItem
                  nohover
                  initial={{ opacity: 0.4, scale: 0.9 }}
                  animate={{ opacity: 1, scale: [0.7, 1.02] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1,
                  }}
                  className="cursor-pointer absolute z-10 top-3 right-3"
                >
                  <PlayIcon />
                </MotionItem>
              </div>
            }
            content={
              <div className="relative w-full h-auto overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/QczGoCmX-pI?si=agurhHubDIgVjErj"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  frameBorder="0"
                ></iframe>
              </div>
            }
          />

          <VideoZoom
            btn={
              <div className="  rounded-[2.5rem] overflow-hidden flex-1  relative aspect-square">
                <MotionItem
                  nohover
                  initial={{ opacity: 0.4, scale: 0.9 }}
                  animate={{ opacity: 1, scale: [0.7, 1.02] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1,
                  }}
                  className="cursor-pointer absolute z-10 top-3 right-3"
                >
                  <PlayIcon />
                </MotionItem>
                <Image alt="image" fill className="object-cover cursor-pointer w-full h-full " src={"/doc1.jpg"} />
              </div>
            }
            content={
              <div className="relative w-full h-auto overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/QczGoCmX-pI?si=agurhHubDIgVjErj"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  frameBorder="0"
                ></iframe>
              </div>
            }
          />
        </FlexWrapper>
      </MaxWidthWrapper>
      <div className="bg-[#F2F5FF] mt-4 lg:mt-10">
        <MaxWidthWrapper className="  py-8 lg:py-16">
          <Head1
            paragraph="We are looking for an outstanding Surgical Nurse to join our medical team. The main role of a surgical nurse is to provide high-quality care to patients before, during and after surgical procedures.s"
            text="CURRENT JOB UPDATES"
          />
          <MotionContainer className="  grid-cols-1 grid gap-5 lg:grid-cols-2 mt-3">
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
          </MotionContainer>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className="  pt-8 lg:pt-16">
        <Head1
          paragraph="We are looking for an outstanding Surgical Nurse to join our medical team. The main role of a surgical nurse is to provide high-quality care to patients before, during and after surgical procedures."
          text="Find your job
          according to your specialty"
          headingClasses=" max-w-lg"
        />
        <div className=" hidden lg:grid">
          <MotionContainer className=" grid grid-cols-2  lg:grid-cols-5 mt-4">
            <MotionItem>
              <Link className=" w-full block h-72 relative" href={"/dashboard/employees?Career-type=NURSES"}>
                <Image fill alt="image" src={"/ob1.png"} className=" object-contain" />
              </Link>
            </MotionItem>
            <MotionItem>
              <Link className=" w-full block h-72 relative" href={"/dashboard/employees?Career-type=NURSES"}>
                <Image fill alt="image" src={"/ob2.png"} className=" object-contain" />
              </Link>
            </MotionItem>
            <MotionItem>
              <Link href={"/dashboard/employees?Career-type=NURSES"} className=" w-full block h-72 relative">
                <Image fill alt="image" src={"/ob3.png"} className=" object-contain" />
              </Link>
            </MotionItem>
            <MotionItem>
              <Link className=" w-full block h-72 relative" href={"/dashboard/employees?Career-type=NURSES"}>
                <Image fill alt="image" src={"/ob4.png"} className=" object-contain" />
              </Link>
            </MotionItem>
            <MotionItem>
              <Link className=" w-full block h-72 relative" href={"/dashboard/employees?Career-type=NURSES"}>
                <Image fill alt="image" src={"/ob5.png"} className=" object-contain" />
              </Link>
            </MotionItem>
          </MotionContainer>
        </div>
        <div className=" lg:hidden block">
          <SwiperCards
            autoplay={true}
            slidesPerView={2.1}
            samePhone
            className=" h-40"
            contain
            logo
            items={[
              { src: "/ob1.png" },
              { src: "/ob2.png" },
              { src: "/ob3.png" },
              { src: "/ob4.png" },
              { src: "/ob5.png" },
            ]}
          />
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <Head1 text="IMPORTANT KEYWORDS" />
        <MotionContainer className=" grid grid-cols-2  gap-3 lg:grid-cols-5 mt-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <MotionItem>
              <CardContainer customPadding=" px-3 py-1.5 md:px-6 md:py-3">
                <Link
                  className="flex font-medium  text-sm md:text-base  flex-col"
                  href={"/dashboard/employees?Career-type=NURSES"}
                >
                  <p className=" text-muted-foreground">120 JOBS</p>
                  <p className="  leading-5 md:text-sm text-xs  text-gray-800 ">
                    Find job Plastic surgry doctor in Jeddah, KSA
                  </p>
                </Link>
              </CardContainer>
            </MotionItem>
          ))}
        </MotionContainer>
        <div className=" relative mt-10 lg:mt-20">
          <div className="  hidden lg:block lg:w-[34rem] aspect-square absolute -left-10 lg:-left-20 z-20 -top-10">
            <Image alt="image" fill className="object-contain" src={"/phone.png"} />
          </div>
          <div className="w-full   relative h-full aspect-square lg:aspect-auto lg:h-[430px] flex md:flex-row flex-col justify-center items-center">
            <Image
              alt="image"
              fill
              className=" object-cover lg:object-contain rounded-[2.5rem]  object-center  lg:object-right-top"
              src={"/bg.jpg"}
            />
            <div className="flex p-4 max-w-xl relative -top-10 lg:top-24 lg:left-[40%]  lg:absolute z-30 flex-col gap-2 lg:gap-5">
              <h1 className=" text-white text-xl lg:text-3xl font-semibold">DOWNLOAD THE APP</h1>
              <p className=" text-sm lg:text-base text-gray-50">
                Download the application and enjoy the best services and features Download the application and enjoy the
                best services and features
              </p>
              <div className=" flex gap-2 items-center">
                <DownloadButtons />
              </div>
            </div>
          </div>
          <div className=" -mt-32 sm:-mt-36 block lg:hidden w-[20rem] mx-auto aspect-square relative  z-20">
            <Image alt="image" fill className="object-contain" src={"/phone.png"} />
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <section className="flex   lg:flex-row-reverse flex-col items-center gap-5 ">
          <div className=" rounded-2xl flex-1 overflow-hidden aspect-square relative w-full h-full">
            <Image alt="image" fill className="object-contain " src={"/bg3.jpg"} />
          </div>
          <div className="flex flex-col items-start gap-10 justify-between  flex-1">
            <div className="flex flex-col items-start">
              <h3 className=" text-main2 uppercase text-lg font-medium my-1">Are you an employer?</h3>
              <Head1 alignment="left" className=" text-left" text="Find a health professional" />
              <Paragraph
                description="The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus. 
anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus."
              />
              <Button size={"lg"} className=" mt-2">
                <Link href={"/hospital"}>GET STARTED</Link>
              </Button>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </main>
  );
};

export default page;
