import { useEffect, useState } from "react";

const LocalTime = ({ time }: { time?: string }) => {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    if (time) {
      // Get today's date
      const today = new Date();
      const [hours, minutes] = time.split(":").map(Number); // Extract hours and minutes from time input

      // Create a GMT date object for today with the provided time
      const gmtDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes));

      // Convert GMT to local time
      const formattedTime = gmtDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // System's local timezone
        timeZoneName: "short", // Include timezone abbreviation
      });

      setLocalTime(formattedTime);
    }
  }, [time]);

  return <p className="text-sm text-gray-500">Local Time: {localTime}</p>;
};

export default LocalTime;
