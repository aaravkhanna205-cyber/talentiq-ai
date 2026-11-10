"use client";
import { useEffect, useState } from "react";

// Pretends data takes a moment to arrive, so the loading placeholders can be seen.
// In Phase 3 this is replaced by real requests to the backend.
export function useDemoLoad(ms = 700) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(timer);
  }, [ms]);
  return loading;
}
