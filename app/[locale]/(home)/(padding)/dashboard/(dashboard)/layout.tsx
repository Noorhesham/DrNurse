import BreadCrumb from "@/app/components/BreadCrumb";
import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import SideBar from "@/app/components/nav/SideBar";
import { unstable_setRequestLocale } from "next-intl/server";

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  return (
    <MaxWidthWrapper className="">
      <GridContainer className=" relative gap-4 md:gap-8" cols={12}>
        <div className=" col-span-2 lg:col-span-1">
          <SideBar iconsOnly />
        </div>
        <div className=" col-span-10 lg:col-span-11">{children}</div>
      </GridContainer>
    </MaxWidthWrapper>
  );
}
