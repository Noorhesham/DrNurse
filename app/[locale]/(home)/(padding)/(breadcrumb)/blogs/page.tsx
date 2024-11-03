import React from "react";
import BreadCrumb from "@/app/components/BreadCrumb";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import CardHuge from "@/app/components/CardHuge";
import MotionContainer from "@/app/components/defaults/MotionContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Heading from "@/app/components/Heading";
import { Server } from "@/app/main/Server";

const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const data = await Server({
    resourceName: "getEntity",
    entityName: "blogs",
    queryParams: new URLSearchParams({ with: "tags,category_id" }),
  });

  return (
    <section className=" min-h-screen  ">
      <MaxWidthWrapper className="flex flex-col items-center   justify-center">
        <MotionContainer className=" w-full  gap-4 grid grid-cols-1 md:grid-cols-2    lg:grid-cols-3">
          {data.data.map((item: any) => (
            <CardHuge item={item} href={`/blog/${item.id}`} key={item.id} />
          ))}
        </MotionContainer>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
