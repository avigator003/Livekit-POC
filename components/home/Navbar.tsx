"use client";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NavLinks } from "./NavLinks";
import { useDisclosure } from "@nextui-org/react";
import LoginSignup from "./LoginSignup";
import useLoginSignupStore from "@/store/useLoginSignupStore";

const Navbar: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => {
  const loginSignupStore = useLoginSignupStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCloseModal = () => {
    loginSignupStore.setCurrentLoginStep(1);
    loginSignupStore.setCurrentSignUpStep(1);
    loginSignupStore.resetIsSignUpModalOpen();
    onClose();
  };

  return (
    <>
      <LoginSignup isOpen={isOpen} onClose={onCloseModal} />
      <header
        className={cn("sticky top-0 z-30 w-full bg-white p-5 dark:bg-black", {
          "shadow-[0px_0px_12px_3px_rgba(0,0,0,0.20)] dark:shadow-[0px_0px_12px_3px_rgba(255,255,255,0.20)]": isScrolled,
        })}
      >
        {" "}
        <nav className="mx-auto flex w-full max-w-[85rem] items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="relative h-14 w-16 cursor-pointer">
              <Image src="/logo.png" fill alt="logo" />
            </Link>
            <span className="hidden text-xl font-bold lg:flex">Whalesbook</span>
          </div>
          <div className="flex items-center justify-between gap-5 lg:gap-20">
            <NavLinks className="hidden md:flex" />
            <div className="flex items-center gap-3">
              <Button
                className="hidden rounded-md bg-faceBlue px-3 py-2 text-white md:flex"
                onClick={onOpen}
              >
                Login/Register
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="bordered"
                    className="rounded-md border px-3 py-2 text-sm md:hidden"
                  >
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="border-gray-800 bg-white/90 dark:bg-black/90 md:hidden"
                >
                  <div className="grid gap-4 py-4">
                    <NavLinks className="flex-col space-x-0 space-y-5 py-5 text-center" />
                    <Button
                      className="hidden rounded-md bg-faceBlue px-3 py-2 text-white md:flex"
                      onClick={onOpen}
                    >
                      Login/Register
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
