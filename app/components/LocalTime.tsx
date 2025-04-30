import { useEffect, useState } from "react";

const LocalTime = ({ time, date }: { time?: string; date?: string }) => {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    if (time || date) {
      let gmtDate: Date;

      if (date && date.includes(" ")) {
        // Handle combined date and time in "YYYY-MM-DD HH:mm:ss" format
        const [datePart, timePart] = date.split(" ");
        const [year, month, day] = datePart.split("-").map(Number);
        const [hours, minutes, seconds] = timePart.split(":").map(Number);
        gmtDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
      } else if (date) {
        // Handle date only
        const [year, month, day] = date.split("-").map(Number);
        gmtDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
      } else if (time) {
        // Handle time only
        const today = new Date();
        const [hours, minutes] = time.split(":").map(Number);
        gmtDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes));
      } else {
        // Fallback to current date and time
        gmtDate = new Date();
      }

      // Convert GMT to local time
      const formattedTime = gmtDate.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        second: date && date.includes(" ") ? "2-digit" : undefined,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // System's local timezone
        timeZoneName: "short", // Include timezone abbreviation
      });

      setLocalTime(formattedTime);
    }
  }, [time, date]);

  return <p className="text-sm text-gray-500">Local Time: {localTime}</p>;
};

export default LocalTime;
