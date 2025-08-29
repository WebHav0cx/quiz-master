import React, { useEffect, useState } from "react";

const Timer = ({ initialTime, onTimeUp, isActive }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (!isActive) return;

    if (time === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, isActive, onTimeUp]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
