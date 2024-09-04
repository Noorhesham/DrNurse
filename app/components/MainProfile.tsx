import React, { ReactNode } from "react";
import UserCard from "./UserCard";
import FlexWrapper from "./defaults/FlexWrapper";

const MainProfile = ({ user, children }: { user: any; children?: ReactNode }) => {
  return (
    <div className=" flex lg:flex-row gap-3 lg:items-center flex-col justify-between">
      <UserCard className="" applicant={user} show={true} />
      {children}
    </div>
  );
};

export default MainProfile;
