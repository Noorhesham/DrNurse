import React, { ReactNode } from "react";
import UserCard from "./UserCard";
import FlexWrapper from "./FlexWrapper";

const MainProfile = ({ user, children }: { user: any; children?: ReactNode }) => {
  return (
    <FlexWrapper max={false} className="   justify-between">
      <UserCard applicant={user} show={true} />
      {children}
    </FlexWrapper>
  );
};

export default MainProfile;
