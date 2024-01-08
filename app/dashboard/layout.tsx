"use client";

import { useEffect } from "react";
import DashboardNavbar from "@/components/dashboard/navbar/DashboardNavbar";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { cn } from "@/lib/utils";
import { setupHeaderToken } from "@/setup/api";
import useRoomStore from "@/store/room/useRoomStore";
import { useDisclosure } from "@nextui-org/react";
import useLoginSignupStore from "@/store/useLoginSignupStore";
import ShadowModal from "@/components/custom-ui/modal/ShadowModal";
import ProfileInfo from "@/components/Signup/ProfileInfo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openCreateRoomModal] = useRoomStore((state) => [
    state.openCreateRoomModal,
  ]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const loginSignupStore = useLoginSignupStore();

  useEffect(() => {
    if (loginSignupStore.isSignUpFlow) {
      onOpen();
    }
  }, [loginSignupStore.isSignUpFlow]);

  const handleCloseModal = () => {
    loginSignupStore.setIsSignupFlow(false);
    onClose();
  };

  

  useEffect(() => {
    const handleRefresh = () => {
      setupHeaderToken();
    };

    window.addEventListener("beforeunload", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, []);

  return (
    <div
      className={cn("bg-background text-foreground", {
        "overflow-hidden blur-lg": openCreateRoomModal,
      })}
    >
      <ShadowModal
        body={<ProfileInfo />}
        isOpen={isOpen}
        onClose={handleCloseModal}
      />
      <div className="flex h-screen overflow-hidden">
        <div className="hidden h-full w-[15rem] border-r-2 border-borderColor bg-white  dark:border-none dark:bg-leftBg lg:flex">
          <Sidebar />
        </div>

        <div className="w-full flex-1 flex-col bg-white dark:bg-[#010101]">
          <DashboardNavbar />
          <main className="h-full overflow-y-auto pb-20">{children}</main>
        </div>
      </div>
    </div>
  );
}
