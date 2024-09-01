import React from "react";
import Heading from "@/app/components/Heading";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Paragraph from "@/app/components/Paragraph";

const faqItems = [
  {
    question: "How do I book an appointment?",
    answer:
      "To book an appointment, simply go to the 'Book Appointment' page, select your preferred doctor, choose a date and time, and fill in the required details. You will receive a confirmation email once your appointment is booked.",
  },
  {
    question: "Can I cancel or reschedule my appointment?",
    answer:
      "Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time. Go to your account, find the appointment under 'My Appointments,' and choose 'Cancel' or 'Reschedule.'",
  },
  {
    question: "What services do you offer?",
    answer:
      "We offer a wide range of medical services including general consultations, specialist consultations, telemedicine, lab tests, and more. Please check our 'Services' page for a full list.",
  },
  {
    question: "Is my medical data safe and secure?",
    answer:
      "Absolutely. We take data security seriously and use the latest encryption technologies to protect your medical records and personal information. Your data is only accessible to authorized personnel.",
  },
];

const FAQPage = () => {
  return (
    <section>
      <MaxWidthWrapper className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center mb-6">FAQ</h1>
        <div className="flex flex-col items-start mt-5 w-full">
          <Heading text="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="w-full mt-4">
            {faqItems.map((item, index) => (
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
