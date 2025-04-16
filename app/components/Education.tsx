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
        <div className=" mr-auto  ">
          <p className=" lg:text-base text-sm  font-semibold text-nowrap uppercase">{edu.speciality}</p>
          <div className="flex items-center gap-2">
            {" "}
            <span className=" text-sm text-nowrap">{formatDate(edu.date, "MMM yyyy")}</span>
            {edu.dateTo && <span className=" text-sm text-nowrap">{formatDate(edu.dateTo, "MMM yyyy")}</span>}
          </div>
        </div>
        {/* {edu.present&& <div className=" ml-auto self-end   font-medium text-green-400">PRESENT</div>} */}
      </FlexWrapper>
    </Container>
  );
};

export default Education;
