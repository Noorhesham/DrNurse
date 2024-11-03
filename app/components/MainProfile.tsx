import React, { ReactNode } from "react";
import UserCard from "./UserCard";

const MainProfile = ({ user, children }: { user: any; children?: ReactNode }) => {
  return (
    <div className=" flex lg:flex-row gap-3  w-full lg:items-center flex-col justify-between">
      <UserCard className=" w-full" applicant={user} show={true} />
      {children}
    </div>
  );
};

export default MainProfile;
