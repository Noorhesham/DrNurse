import CompanyInfo from "@/app/components/CompanyInfo";
import Container from "@/app/components/Container";
import FlexWrapper from "@/app/components/FlexWrapper";
import SelectDate from "@/app/components/forms/SelectDate";
import MainProfile from "@/app/components/MainProfile";
import Meet from "@/app/components/Meet";
import MiniTitle from "@/app/components/MiniTitle";
import ModalCustom from "@/app/components/ModalCustom";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
const hospital = {
  name: "Mohamed M.",
  image: "/edu.png",
  speciality: "Dentist",
  address: "Nairobi, Kenya",
  duration: "in 7 days",
};
const page = () => {
  return (
    <section className=" flex flex-col gap-8">
      <div className=" flex flex-col gap-2">
        <MiniTitle text="INVITATIONS" />
        <div className=" flex flex-col gap-3 mt-4">
          <Container>
            <FlexWrapper max={false} className=" justify-between">
              <Meet img />
              <div className=" flex items-center gap-3">
                <ModalCustom
                  content={<SelectDate/>}
                  btn={
                    <Button size={"lg"} className=" rounded-full">
                      SET DATE
                    </Button>
                  }
                />
                <Link href={"/job/1"}>
                  <Button size={"lg"} className="  bg-light text-main2 rounded-full" variant={"outline"}>
                    VIEW JOB
                  </Button>
                </Link>
                <ModalCustom
                  content={
                    <div className=" flex flex-col gap-5">
                      <MainProfile user={hospital} />
                      <CompanyInfo />
                    </div>
                  }
                  btn={
                    <Button size={"lg"} className="  bg-light text-main2 rounded-full" variant={"outline"}>
                      HOSPITAL INFO
                    </Button>
                  }
                />
              </div>
            </FlexWrapper>
          </Container>
          <Container>
            <FlexWrapper max={false} className=" justify-between">
              <Meet img />
              <div className=" flex items-center gap-3">
                <Button size={"lg"} className=" rounded-full">
                  SET DATE
                </Button>
                <Button size={"lg"} className="  bg-light text-main2 rounded-full" variant={"outline"}>
                  VIEW JOB
                </Button>
                <Button size={"lg"} className="  bg-light text-main2 rounded-full" variant={"outline"}>
                  HOSPITAL INFO
                </Button>
              </div>
            </FlexWrapper>
          </Container>
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <MiniTitle text="MEETINGS" />
        <div className=" flex flex-col gap-3 mt-4">
          <Container>
            <FlexWrapper max={false} className=" justify-between">
              <Meet img />
              <div className=" flex items-center gap-3">
                <Button variant={"destructive"} size={"lg"} className=" rounded-full">
                  CANCEL MEETING
                </Button>
                <Button size={"lg"} className="  bg-light text-main2 rounded-full" variant={"outline"}>
                  VIEW JOB
                </Button>
                <Button size={"lg"} className="  bg-light text-main2 rounded-full" variant={"outline"}>
                  HOSPITAL INFO
                </Button>
              </div>
            </FlexWrapper>
          </Container>
          <Container>
            <FlexWrapper max={false} className=" justify-between">
              <Meet img />
              <div className=" flex items-center gap-3">
                <Button variant={"destructive"} size={"lg"} className=" rounded-full">
                  CANCEL MEETING
                </Button>
                <Button size={"lg"} className="  bg-light text-main2 rounded-full" variant={"outline"}>
                  VIEW JOB
                </Button>
                <Button size={"lg"} className="  bg-light text-main2 rounded-full" variant={"outline"}>
                  HOSPITAL INFO
                </Button>
              </div>
            </FlexWrapper>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default page;
