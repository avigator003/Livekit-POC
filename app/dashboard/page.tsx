"use client";

import React, { useEffect, useState } from "react";

function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      Coming Soon..
    </div>
  );
}

export default Dashboard;
