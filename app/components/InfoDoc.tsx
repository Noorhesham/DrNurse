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
      <div className="flex text-xs flex-col">
        <p>{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default InfoItem;
