import React from "react";
import UserCard from "./UserCard";
import Container from "./Container";
import FlexWrapper from "./FlexWrapper";

const Education = ({ edu }: { edu: any }) => {
  return (
    <Container className="hover:bg-gradient-to-r from-light to-white duration-150 ">
      <FlexWrapper max={false} className=" justify-between">
        <UserCard show={false} applicant={edu} />
        <div className=" font-medium text-gray-600">
          <p>GENERAL SURGERY {"(BACHELOROS DEGREE)"}</p>
          <span className=" text-sm">May 2013 - May 2020 . 7yrs</span>
        </div>
      </FlexWrapper>
    </Container>
  );
};

export default Education;
