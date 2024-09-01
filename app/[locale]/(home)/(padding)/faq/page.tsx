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
  {
    question: "How can I get a prescription refill?",
    answer:
      "To request a prescription refill, visit the 'Prescription' section in your account, select the medication you need a refill for, and follow the instructions. Your doctor will review your request, and you'll be notified once it's approved.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods, including credit cards, debit cards, and digital wallets like Apple Pay and Google Pay. For more details, please visit our 'Payment Options' page.",
  },
  {
    question: "How do I access my medical records?",
    answer:
      "To access your medical records, log in to your account and navigate to the 'My Medical Records' section. You can view, download, or share your records securely from there.",
  },
  {
    question: "Can I choose my preferred doctor?",
    answer:
      "Yes, you can select your preferred doctor when booking an appointment. Simply browse our list of available doctors, read their profiles, and choose the one that best fits your needs.",
  },
  {
    question: "Do you offer telemedicine consultations?",
    answer:
      "Yes, we offer telemedicine consultations for both general and specialist consultations. You can book a telemedicine appointment from the 'Book Appointment' page and select the 'Telemedicine' option.",
  },
  {
    question: "What should I do if I experience technical issues?",
    answer:
      "If you experience any technical issues, please contact our support team via the 'Help' section in your account or send an email to support@doctorapp.com. We’re here to assist you 24/7.",
  },
];

const FAQPage = () => {
  return (
    <section>
      <MaxWidthWrapper className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center text-main2">FAQ</h1>
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
