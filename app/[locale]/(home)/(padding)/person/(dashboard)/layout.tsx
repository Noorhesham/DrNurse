"use client";
import BreadCrumb from "@/app/components/BreadCrumb";
import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import SideBar from "@/app/components/nav/SideBar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const lastSegment = pathname.split("/").pop();

  const formattedLastSegment = lastSegment
    ? lastSegment.replace(/-/g, " ").replace(/\b\w/g, (char: string) => char.toUpperCase())
    : "";
  return (
    <div className="  pt-36">
      <BreadCrumb
        linksCustom={[
          { href: "", text: "Home" },
          { href: "/person", text: "Dashboard" },
          ...(lastSegment === "person" ? [] : [{ href: pathname, text: formattedLastSegment }]),
        ]}
      />
      <MaxWidthWrapper className="">
        <GridContainer className=" relative gap-2 lg:gap-8" cols={12}>
          <div className=" col-span-2 lg:col-span-1">
            <SideBar person={true} iconsOnly />
          </div>
          <div className=" relative col-span-10 lg:col-span-11">{children}</div>
        </GridContainer>
      </MaxWidthWrapper>
    </div>
  );
}
