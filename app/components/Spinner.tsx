import React from "react";
import "../loading.css";
const Spinner = ({ className }: { className?: string }) => {
  return <span className={`loader ${className || ""}`}></span>;
};

export default Spinner;
