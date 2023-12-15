"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <Tabs defaultValue="light" className="h-fit w-full">
      <TabsList className="h-fit w-fit rounded-lg border-2 border-borderColor bg-transparent p-0">
        <TabsTrigger
          value="light"
          className="group/light w-fit rounded-lg py-1.5 text-textGrey ring-offset-slate-50 data-[state=active]:bg-faceBlue data-[state=active]:text-white"
          onClick={() => setTheme("light")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-90 transition-all group-data-[state=active]:light:-rotate-90 group-data-[state=active]:light:scale-100" />
          <span className="ml-2">Light</span>
          <span className="sr-only">Toggle light theme</span>
        </TabsTrigger>

        <TabsTrigger
          value="dark"
          className="group/dark w-fit rounded-lg py-1.5 text-textGrey ring-offset-slate-50 data-[state=active]:bg-faceBlue data-[state=active]:text-white"
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-90 transition-all group-data-[state=active]:dark:-rotate-90 group-data-[state=active]:dark:scale-100" />
          <span className="ml-2">Dark</span>
          <span className="sr-only">Toggle dark theme</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
