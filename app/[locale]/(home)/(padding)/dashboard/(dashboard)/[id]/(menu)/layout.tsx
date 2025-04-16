import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import SideBar from "@/app/components/nav/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MaxWidthWrapper className=" ">
      <GridContainer className="  gap-8" cols={12}>
        <div className=" col-span-2 lg:col-span-1">
          <SideBar person={false} iconsOnly />
        </div>
        <div className=" relative min-h-screen w-full col-span-10 lg:col-span-11">{children}</div>
      </GridContainer>
    </MaxWidthWrapper>
  );
}
