import { useEffect, useState } from "react";

const LocalTime = ({ fromDate }) => {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    if (fromDate) {
      const date = new Date(fromDate); // Parse the input date
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short", // Shows timezone abbreviation (e.g., IST, PST)
      });
      setLocalTime(formattedTime);
    }
  }, [fromDate]);

  return <p className="text-sm text-gray-500">Local Time: {localTime}</p>;
};

export default LocalTime;
