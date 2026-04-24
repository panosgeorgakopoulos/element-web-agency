import { useEffect, useState } from "react";

export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState(() => formatTime(timeZone));
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(timeZone)), 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}

function formatTime(timeZone: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "--:--:--";
  }
}
