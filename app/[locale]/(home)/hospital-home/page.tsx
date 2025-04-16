import About from "@/app/components/About";
import FindDoctor from "@/app/components/FindDoctor";
import FlexWrapper from "@/app/components/defaults/FlexWrapper";
import GridContainer from "@/app/components/defaults/GridContainer";
import Head1 from "@/app/components/Head1";
import Heading from "@/app/components/Heading";
import { CheckIcon, CloudUploadIcon, PersonAdd, PlayIcon, SearchIcon } from "@/app/components/Icons";
import InfoCard from "@/app/components/InfoCard";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import SwiperCards from "@/app/components/SwiperCards";
import VideoZoom from "@/app/components/VideoZoom";
import Widget from "@/app/components/Widget";
import Image from "next/image";
import { Server } from "@/app/main/Server";
import { getYouTubeEmbedUrl } from "@/app/helpers/utils";
import { convertToHTML } from "@/lib/utils";
import LoaderBtn from "@/app/components/LoaderBtn";
import { WEBSITEURL } from "@/app/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ClientButton from "./ClientButton";
export const generateMetadata = async () => {
  const { page } = await Server({ resourceName: "home", id: "company-home" });
  return {
    title: `${page.title}`,
    canonical: `${WEBSITEURL}/hospital-home`,
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
export default async function Home() {
  const data = await Server({ resourceName: "home", id: "company-home" });

  const page = data.page;
  const { important_numbers, services_list, hospital_logos, main_cover_title } = page;

  return (
    <main>
      <section className={`w-full h-screen relative bg-no-repeat bg-cover  `}>
        <div className=" w-full  absolute z-[-1] h-screen">
          <Image
            className="object-cover lg:block  hidden w-full h-full"
            src={page.main_cover_image_for_pc?.[0]?.file}
            alt="cover"
            fill
          />
          <Image
            className="object-cover lg:hidden block w-full h-full"
            src={page.main_cover_image_for_mobile?.[0]?.file}
            alt="cover"
            fill
          />
        </div>
        <div className="w-full h-screen bg-[#224982] bg-opacity-30 absolute inset-0 z-10"></div>
        <MaxWidthWrapper className=" flex-col items-center justify-center w-full h-full">
          <div className="   h-full z-10 relative flex gap-4 md:gap-8 lg:gap-12 mt-20 lg:mt-10 flex-col items-center justify-center">
            <div className=" flex flex-col  gap-4  items-center">
              <Heading text={page.main_cover_main_title} title2={`${main_cover_title}`} />
              <LoaderBtn />
            </div>
            <GridContainer cols={4}>
              {important_numbers.map((item: any, i: number) => (
                <Widget
                  key={i}
                  title={item.number}
                  subTitle={item.important_numbers_title}
                  icon={item?.important_numbers_icon?.[0]?.sizes?.medium}
                />
              ))}
            </GridContainer>
          </div>
        </MaxWidthWrapper>
      </section>
      <MaxWidthWrapper className=" my-4 lg:my-10 flex flex-col gap-20">
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
        <FlexWrapper className=" h-full">
          <div className="  rounded-[2.5rem] overflow-hidden flex-1 relative aspect-square">
            {page?.video_1_youtube_url && (
              <VideoZoom
                btn={
                  <div className=" cursor-pointer">
                    <div className="overflow-visible absolute z-10 top-3 right-3">
                      <PlayIcon />
                    </div>
                    <Image
                      alt="image"
                      fill
                      className="object-cover "
                      src={page.introductory_videos_video_1_image?.[0]?.file}
                    />
                  </div>
                }
                content={
                  <div className="relative dynamic-padding w-full h-auto overflow-hidden">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={getYouTubeEmbedUrl(page?.video_1_youtube_url)}
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
                    <Image
                      alt="image"
                      fill
                      className="object-cover w-full h-full "
                      src={page.introductory_videos_video_2_image?.[0]?.file}
                    />

                    <div className="overflow-visible absolute z-10 top-3 right-3">
                      <PlayIcon />
                    </div>
                  </div>
                }
                content={
                  <div className="relative dynamic-padding w-full h-auto overflow-hidden">
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
      {page?.about_service_content && (
        <FindDoctor
          images={page.about_service_images}
          title={page.about_service_main_title}
          miniTitle={page.about_service_small_title}
          paragraph={page.about_service_content}
        />
      )}
      {page?.our_service_content && (
        <About
          paragraph={page.our_service_content}
          services_list={page.services_list}
          title={page.our_service_main_title}
        />
      )}
      <div className="my-4 lg:my-10 bg-[#F2F5FF]">
        <MaxWidthWrapper>
          <div className=" flex flex-col gap-3  lg:gap-5 my-4 ">
            <Head1 animation={false} className=" mx-auto" text="HOW DOCTOR NURSE WORK" />
            <GridContainer motion className="relative mt-5" cols={4}>
              <InfoCard
                arrow
                Icon={PersonAdd}
                title="Sign Up"
                description="Create your account quickly and easily to get started."
              />

              <InfoCard
                arrow
                reverse
                Icon={CloudUploadIcon}
                title="Post or Find Jobs"
                description="Post a job listing or browse through available job opportunities."
                iconBgColor="bg-main"
              />

              <InfoCard
                arrow
                Icon={SearchIcon}
                title="Connect & Communicate"
                description="Schedule meetings and interviews with potential hires or employers."
              />

              <InfoCard
                Icon={CheckIcon}
                title="Finalize Job Offers"
                description="Send and receive job offers to secure your next opportunity."
              />
            </GridContainer>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <section className="flex  lg:flex-row flex-col items-center gap-5 ">
          <div className=" rounded-2xl flex-1 overflow-hidden aspect-square relative w-full h-full">
            <Image alt="image" fill className="object-contain " src={page?.start_to_end_section_image?.[0]?.file} />
          </div>
          <div className="flex flex-col items-start gap-10 justify-between  flex-1">
            <div className="flex flex-col items-start">
              <h3 className=" text-main2 text-lg uppercase font-medium my-1">
                {page.start_to_end_section_small_title}
              </h3>
              <Head1
                alignment="left"
                animation={false}
                className=" text-left"
                text={page.start_to_end_section_main_title}
              />
              {page?.start_to_end_section_content && (
                <div
                  dangerouslySetInnerHTML={{ __html: convertToHTML(page?.start_to_end_section_content) }}
                  className={`lg:max-w-2xl text-black text-sm  font-medium my-2 leading-[1.7] `}
                />
              )}
              <ClientButton />
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </main>
  );
}
