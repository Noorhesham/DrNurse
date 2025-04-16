import BreadCrumb from "@/app/components/BreadCrumb";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Empty from "@/app/components/Empty";
import Share from "@/app/components/Share";
import { Server } from "@/app/main/Server";
import { convertToHTML, generateMetadataCustom } from "@/lib/utils";
import { CalendarHeartIcon, LayoutDashboardIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import styles from "../product.module.css";

export async function generateMetadata({ params }: { params: { id: string; locale: string } }) {
  const data = await Server({ resourceName: "getSingleEntity", id: params.id, entityName: "blogs" });
  const item: any = data.item;
  const { title, main_gallery, content } = item;

  return generateMetadataCustom({
    title,
    description: content.slice(0, 150) || "Discover insightful content on Dr.Nurse blogs.",
    url: `https://your-site.com/blogs/${params.id}`,
    image: main_gallery?.[0]?.file || "/default-image.png",
  });
}
const page = async ({ params }: { params: { locale: string; id: string } }) => {
  const data = await Server({ resourceName: "getSingleEntity", id: params.id, entityName: "blogs" });
  const item: any = data.item;
  const { main_gallery, title, content } = item;
  const contentHTML = content ? convertToHTML(content) : "";
  return (
    <section className="  min-h-screen  ">
      <div className="pt-36 ">
        <BreadCrumb
          linksCustom={[
            { href: "", text: "Home" },
            { href: "/blogs", text: "BLOGS" },
            { text: title, href: `/blogs/${params.id}` },
          ]}
        />
        <MaxWidthWrapper className="flex flex-col items-start px-14  mt-5 justify-center">
          {" "}
          {main_gallery.length > 0 && (
            <div className=" relative w-full h-44 lg:h-[750px]">
              <Image src={main_gallery?.[0]?.file} alt="blog" className=" object-contain lg:object-cover" fill />
            </div>
          )}
          <div className=" flex items-start mr-auto my-10 gap-3">
            <div className=" flex items-center gap-2">
              <CalendarHeartIcon className=" w-5 h-5" />
              <p className=" text-xs font-medium text-[#475156]">{item.created_at}</p>
            </div>
            <div className=" flex items-center gap-2">
              <LayoutDashboardIcon className=" w-5 h-5" />
              <p className=" text-xs font-medium text-[#475156]">Blog</p>
            </div>
          </div>
          <h2 className=" capitalize mb-4 text-2xl lg:text-4xl text-main2 text-left font-semibold max-w-5xl">{title}</h2>
          {contentHTML ? (
            <div
              className={`  ${styles.product} content-text font-[300] text-base`}
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
          ) : (
            <Empty text="No Content Added Yet" />
          )}
          <Share title={title} image={main_gallery?.[0]?.file} />
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

export default page;
