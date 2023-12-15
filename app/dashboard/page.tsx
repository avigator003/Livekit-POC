"use client";

import { setupHeaderToken } from "@/setup/api";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const authenticationStore= useAuthenticationStore();

  useEffect(() => {
    setIsMounted(true);
    setup();
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  const setup = async() =>{
    const token = authenticationStore.user?.token || "";
    await setupHeaderToken(token);
  }

  if (!isMounted) return null;

  return (
    <div>
      Coming Soon..
    </div>
  );
}

export default Dashboard;
