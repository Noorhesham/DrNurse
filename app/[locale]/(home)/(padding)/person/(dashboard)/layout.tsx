import BreadCrumb from "@/app/components/BreadCrumb";
import GridContainer from "@/app/components/GridContainer";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import SideBar from "@/app/components/SideBar";
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
      <GridContainer className=" relative gap-8" cols={12}>
        <div className=" col-span-1">
          <SideBar person iconsOnly />
        </div>
        <div className=" col-span-11">{children}</div>
      </GridContainer>
    </MaxWidthWrapper>
  );
}
