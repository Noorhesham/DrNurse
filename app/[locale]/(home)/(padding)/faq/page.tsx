import Heading from "@/app/components/Heading";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import React from "react";

const page = () => {
  return (
    <section>
      <MaxWidthWrapper className=" flex flex-col items-center ">
        <h1 className=" text-5xl font-bold text-center">FAQ</h1>
        <div className=" flex flex-col items-start mt-5">
          <Heading text="Frequently asked questions" />
          <Accordion defaultValue={} type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h2 className="text-base font-semibold text-main2"></h2>
              </AccordionTrigger>
              <AccordionContent>
              
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
