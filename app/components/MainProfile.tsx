import React, { ReactNode } from "react";
import UserCard from "./UserCard";

const MainProfile = ({ user, children, h1=false }: { user: any; children?: ReactNode; h1?: boolean }) => {
  return (
    <div className=" flex lg:flex-row gap-3  w-full lg:items-center flex-col justify-between">
      <UserCard  h1={h1||false} className=" w-full" applicant={user} show={true} />
      {children}
    </div>
  );
};

export default MainProfile;
