"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import AppStoreIcon from "@/svgs/appstore";
import PlayStoreIcon from "@/svgs/playstore";
import Image from "next/image";

export function NavLinks({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/home`,
      label: "Home",
      active: pathname === `/home`,
    },
    {
      href: `#features`,
      label: "About Us",
      active: pathname === `/about`,
    },
    {
      href: `#features`,
      label: "Features",
      active: pathname === `/features`,
    },
    {
      href: `/app`,
      label: "App",
      active: pathname === `/app`,
    },
    {
      href: `#contact`,
      label: "Contact Us",
      active: pathname === `/contact`,
    },
  ];

  return (
    <ul
      className={cn("items-center space-x-4 lg:space-x-8", className)}
      {...props}
    >
      {routes.map((route) => (
        <li key={route.href}>
          {route.label === "App" ? (
            <Dropdown placement="bottom-start">
              <DropdownTrigger className="cursor-pointer text-[#1f1e1e] dark:text-[#CBC7D1]">
                App
              </DropdownTrigger>
              <DropdownMenu aria-label="App Actions" variant="faded">
                <DropdownItem className="flex flex-col">
                  <div className="w-full rounded-2xl">
                    <div className="relative mx-auto h-[100px] w-[104px]">
                      <Image
                        src="/hero_section_image.png"
                        fill
                        style={{ objectFit: "cover" }}
                        alt="rev_soon_1"
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex w-full max-w-[18rem] items-center gap-2">
                    <Button
                      variant="bordered"
                      className="flex w-full items-center gap-3 rounded-md border border-[#050505] px-2 py-2 dark:border-border"
                    >
                      Get it on{" "}
                      <PlayStoreIcon size={{ width: 20, height: 20 }} />
                    </Button>
                    <Button
                      variant="bordered"
                      className="flex w-full items-center gap-3 rounded-md border border-[#050505] px-2 py-2 dark:border-border"
                    >
                      Get it on{" "}
                      <AppStoreIcon size={{ width: 20, height: 20 }} />
                    </Button>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Link
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-black dark:hover:text-white md:text-lg",
                route.active
                  ? "text-black dark:text-white"
                  : "text-[#1f1e1e] dark:text-[#CBC7D1]",
              )}
            >
              {route.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
