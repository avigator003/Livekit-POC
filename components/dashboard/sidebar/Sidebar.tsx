"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import SignOutIcon from "@/svgs/sidebar/signout";
import { sidebarMenuItems } from "./SidebarMenuItems";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const authStore = useAuthenticationStore();
  const router = useRouter();

  const isDark = theme === "dark";


  const handleLogout = () => {
    authStore.removeUser();
    router.push("/");
  };


  return (
    <div className="relative mx-auto flex h-full w-full flex-col items-center gap-2 text-white">
      <div className="flex w-full flex-col gap-2">

      <div className="flex items-center justify-start gap-2 px-10 py-5">
        <div className="relative flex h-[40px] w-[45px] flex-col items-center">
          <Image src="/logo.png" alt="Whalesbook_Logo" fill />
        </div>
        <h1 className="text-base font-medium text-gray-600 dark:text-white">
          Whalesbook
        </h1>
      </div>

        <div className="flex flex-col gap-2 px-4">
          {sidebarMenuItems.map(({ route, title, icon: Icon }, index) => (
            <Link
              href={route}
              key={index}
              className={cn(
                "group flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-2 text-gray-800 transition-all hover:bg-faceBlue hover:text-white dark:text-white mb-2",
                {
                  "bg-faceBlue text-white": pathname === route,
                }
              )}
            >
              <Icon
                color={
                  pathname === route ? "white" : isDark ? "white" : "black"
                }
                className="group-hover:text-white"
              />
              <span className="text-[1rem] font-normal">{title}</span>
            </Link>
          ))}
        </div>

        <div className="flex w-full flex-col gap-2 px-4" onClick={handleLogout}>
          <div className="flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-2 text-red-400 transition-all hover:bg-faceBlue hover:text-white dark:text-white">
            <SignOutIcon />
            <span className={`text-base font-normal`}>Sign out</span>
          </div>
        </div>

        {/* Theme Switcher  */}
        {/* <div className="mt-8 flex w-full flex-col gap-2 px-4 lg:absolute lg:bottom-4 lg:mt-0">
          <DashboardThemeSwitcher />
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
