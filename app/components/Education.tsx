import React from "react";
import UserCard from "./UserCard";
import Container from "./Container";
import FlexWrapper from "./defaults/FlexWrapper";
import { formatDate } from "date-fns";

const Education = ({ edu }: { edu: any }) => {
  return (
    <Container className="bg-gradient-to-r w-full from-light to-white duration-150 ">
      <FlexWrapper max={false} className=" w-full  items-center justify-between">
        <UserCard edu={true} show={false} applicant={edu} />
        <div className=" ml-auto self-end   font-medium text-gray-600">
          <p className=" lg:text-base text-sm  font-semibold uppercase">{edu.speciality}</p>
          <span className=" text-sm">{formatDate(edu.date, "dd MMM yyyy")}</span>
        </div>
      </FlexWrapper>
    </Container>
  );
};

export default Education;
