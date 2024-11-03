import React from "react";

interface InfoItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoItem = ({ icon, title, description }: InfoItemProps) => {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div className="flex text-xs md:text-sm  flex-col">
        <p>{title}</p>
        <p className="text-xs  uppercase md:text-sm  text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default InfoItem;
