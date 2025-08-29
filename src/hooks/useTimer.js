// src/hooks/useTimer.js
import { useState, useEffect, useCallback } from "react";

export const useTimer = (initialTime = 0, onTimeUp = () => {}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive) return undefined;
    if (timeLeft <= 0) {
      onTimeUp();
      setIsActive(false);
      return undefined;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [isActive, timeLeft, onTimeUp]);

  const start = useCallback(() => setIsActive(true), []);
  const pause = useCallback(() => setIsActive(false), []);
  const reset = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(false);
  }, [initialTime]);

  return { timeLeft, isActive, start, pause, reset, setTimeLeft };
};
