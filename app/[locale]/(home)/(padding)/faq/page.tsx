import React from "react";
import Heading from "@/app/components/Heading";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Paragraph from "@/app/components/defaults/Paragraph";
import { Server } from "@/app/main/Server";

const FAQPage = async () => {
  const res = await Server({ resourceName: "home", id: "faq" });
  const { questions } = res.page;
  return (
    <section className=" pt-32">
      <MaxWidthWrapper className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center text-main2">{res.page.title}</h1>
        <div className="flex flex-col items-start mt-5 w-full">
          <Accordion type="single" collapsible className="w-full mt-4">
            {questions.map((item: any, index: number) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>
                  <h2 className="text-base font-semibold text-main2">{item.question}</h2>
                </AccordionTrigger>
                <AccordionContent>
                  <Paragraph description={item.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default FAQPage;
