import CardContainer from "@/app/components/CardContainer";
import DownloadButtons from "@/app/components/DownloadButtons";
import FlexWrapper from "@/app/components/defaults/FlexWrapper";
import Head1 from "@/app/components/Head1";
import Heading from "@/app/components/Heading";
import { PlayIcon } from "@/app/components/Icons";
import JobCard from "@/app/components/JobCard";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MotionContainer from "@/app/components/defaults/MotionContainer";
import MotionItem from "@/app/components/defaults/MotionItem";
import SwiperCards from "@/app/components/SwiperCards";
import VideoZoom from "@/app/components/VideoZoom";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Server } from "@/app/main/Server";
import { getYouTubeEmbedUrl } from "@/app/helpers/utils";
import { convertToHTML } from "@/lib/utils";
import SearchBox from "@/app/components/SearchBox";
import { Button } from "@/components/ui/button";
import { WEBSITEURL } from "@/app/constants";
export const generateMetadata = async () => {
  const { page } = await Server({
    resourceName: "home",
    id: "persons-home",
  });
  return {
    title: `${page.title}`,
    canonical: WEBSITEURL,
    openGraph: {
      title: "drnurse",
      url: "/logodark.webp",
      images: [
        {
          url: "/logodark.webp",
          alt: "drnurse",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "drnurse",
      images: [
        {
          url: "/logodark.webp",
          title: "drnurse",
        },
      ],
    },
  };
};
const page = async () => {
  const data = await Server({ resourceName: "home", id: "persons-home" });

  const page = data.page;
  return (
    <main>
      <section className={`w-full h-screen relative bg-no-repeat bg-cover  `}>
        <div className=" w-full  absolute z-[-1] h-screen">
          <Image
            className="object-cover lg:block  hidden w-full h-full"
            src={page.pc_image?.[0]?.file}
            alt="cover"
            fill
          />
          <Image
            className="object-cover lg:hidden block w-full h-full"
            src={page.mobile_image[0]?.file}
            alt="cover"
            fill
          />
        </div>
        <div className="w-full h-screen bg-[#224982] bg-opacity-30 absolute inset-0 z-10"></div>
        <MaxWidthWrapper className=" flex-col items-center justify-center w-full h-full">
          <div className="   h-full z-10 relative flex gap-4 md:gap-8 lg:gap-12  mt-4 flex-col items-center justify-center">
            <Heading animation text={page.main_cover_main_title} title2={page.main_cover_title} />
            <SearchBox active />
          </div>
        </MaxWidthWrapper>
      </section>{" "}
      <MaxWidthWrapper className=" mt-5 flex flex-col gap-20">
        <div className="flex flex-col gap-5">
          <Head1 animation={false} text={page.hospital_logos_title} />
          <SwiperCards
            autoplay={true}
            slidesPerView={5.3}
            className="h-32 mt-2"
            contain
            logo
            items={page.hospital_logos.map((logo: any) => {
              return {
                src: logo.sizes.large,
              };
            })}
          />
        </div>
        <FlexWrapper max={false} className=" h-full">
          <div className="  rounded-[2.5rem] overflow-hidden flex-1 relative aspect-square">
            {page?.video_1_youtube_url && (
              <VideoZoom
                btn={
                  <div className=" cursor-pointer">
                    <div className="overflow-visible absolute z-10 top-3 right-3">
                      <PlayIcon />
                    </div>
                    <Image alt="image" fill className="object-cover " src={page.video_1_image[0]?.file} />
                  </div>
                }
                content={
                  <div className="relative w-full dynamic-padding h-auto overflow-hidden">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={getYouTubeEmbedUrl(page.video_1_youtube_url)}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      frameBorder="0"
                    ></iframe>
                  </div>
                }
              />
            )}
          </div>
          <div className="  rounded-[2.5rem] overflow-hidden flex-1  relative aspect-square">
            {page?.video_2_youtube_url && (
              <VideoZoom
                btn={
                  <div className=" cursor-pointer">
                    <Image alt="image" fill className="object-cover w-full h-full " src={page.video_2_image[0].file} />
                    <div className="cursor-pointer absolute z-10 top-3 right-3">
                      <PlayIcon />
                    </div>
                  </div>
                }
                content={
                  <div className="relative w-full dynamic-padding h-auto overflow-hidden">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={getYouTubeEmbedUrl(page.video_2_youtube_url)}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      frameBorder="0"
                    ></iframe>
                  </div>
                }
              />
            )}
          </div>
        </FlexWrapper>
      </MaxWidthWrapper>
      <div className="bg-[#F2F5FF] mt-5">
        <MaxWidthWrapper className=" ">
          <div className=" flex items-center lg:gap-4 gap-2 flex-col">
            <Head1 animation={false} className=" my-0 mt-0" text={page.latest_job_title} />
            <div
              dangerouslySetInnerHTML={{ __html: convertToHTML(page.latest_jobs_content || "") }}
              className={`lg:max-w-4xl text-center text-black lg:text-base text-sm  font-medium my-2 leading-[1.7] `}
            />
          </div>
          <MotionContainer className="  grid-cols-1 grid gap-5 lg:grid-cols-2 mt-3">
            {page.latest_jobs.map((job: any, i: number) => (
              <JobCard job={job} i={i} />
            ))}
          </MotionContainer>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <div className=" flex items-center gap-2 lg:gap-4 flex-col">
          <Head1 animation={false} text={page.specialties_title} />
          <div
            dangerouslySetInnerHTML={{ __html: convertToHTML(page.specialties_content || "") }}
            className={`lg:max-w-4xl text-center text-black lg:text-base text-sm  font-medium  leading-[1.7] `}
          />
        </div>

        <div className=" mt-4 lg:mt-14  block">
          <SwiperCards
            autoplay={true}
            slidesPerView={5}
            className=" h-auto "
            contain
            logo
            items={page.specialties.map((specialty: any) => {
              return {
                card: (
                  <MotionItem className=" pt-4 overflow-auto">
                    <Link
                      className=" z-20 w-full block aspect-square h-52 relative"
                      href={`/person/jobs?career_specialty_id=${specialty.career_specialty_id}`}
                    >
                      <Image
                        fill
                        alt="image"
                        src={specialty?.specialty_image?.[0]?.file}
                        className=" object-cover object-top"
                      />
                    </Link>
                    <h2 className=" text-center font-semibold text-main2 uppercase py-2 bg-white">
                      {specialty.specialty_title}
                    </h2>
                  </MotionItem>
                ),
              };
            })}
          />
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="">
        <div className=" flex flex-col gap-2 lg:gap-3">
          <Head1 animation={false} size="lg" text={page.Keywords_title} />
          <MotionContainer className=" grid grid-cols-1 md:grid-cols-2 items-stretch  gap-3 lg:grid-cols-5 my-5">
            {page.keywords_jobs.map((keyword: any) => {
              return (
                <MotionItem className=" uppercase h-full self-stretch">
                  <CardContainer customPadding="h-full w-full  px-4 py-3 ">
                    <Link className="flex flex-col" href={`/person/job/${keyword.id}`}>
                      <p className=" text-xs text-muted-foreground">{keyword.job_title}</p>
                      <p className="  font-semibold leading-5  text-base  text-gray-800 ">
                        {keyword.branch?.country?.title || ""},{keyword.branch?.state?.title || ""}
                      </p>
                    </Link>
                  </CardContainer>
                </MotionItem>
              );
            })}
          </MotionContainer>
        </div>
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
            <div className="flex p-4 max-w-xl relative -top-10 lg:top-24 lg:left-[40%]  gap-2 lg:absolute z-30 flex-col ">
              <h2 className=" text-white text-2xl md:text-3xl lg:text-5xl font-semibold">{page.download_app_title}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: convertToHTML(page.download_app_content || "") }}
                className={`lg:max-w-4xl text-white text-base  leading-[1.7] `}
              />
              <div className=" mt-8 flex gap-2 items-center">
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
        <section className="flex  lg:flex-row flex-col items-center gap-5 ">
          <div className="flex flex-col items-start gap-10 justify-between  flex-1">
            <div className="flex flex-col items-start">
              <h3 className=" text-main2 text-lg md:text-xl uppercase font-medium ">
                {page.employer_section_small_title}
              </h3>
              <Head1
                animation={false}
                alignment="left"
                className=" text-left"
                text={page.employer_section_main_title}
              />
              <div
                dangerouslySetInnerHTML={{ __html: convertToHTML(page.employer_section_content) }}
                className={`lg:max-w-4xl text-black lg:text-base text-sm  font-medium my-2 leading-[1.7] `}
              />
              <Link href={"/hospital-home"}>
                <Button size={"lg"} className="  mt-5 ">
                  GET STARTED
                </Button>
              </Link>
            </div>
          </div>
          <div className=" rounded-2xl flex-1 overflow-hidden aspect-square relative w-full h-full">
            <Image alt="image" fill className="object-contain " src={page?.employer_section_image?.[0]?.file} />
          </div>
        </section>
      </MaxWidthWrapper>
    </main>
  );
};

export default page;
