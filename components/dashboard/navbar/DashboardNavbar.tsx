"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Tooltip,
} from "@nextui-org/react";
import {
  Bell,
  ChevronDown,
  History,
  MessageCircle,
  PlusCircle,
  SearchIcon,
  TrendingUp,
  UserCheck,
} from "lucide-react";

import useAuthenticationStore from "@/store/useAuthenticationStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MobileSidebar from "../sidebar/MobileSidebar";
import useLoginSignupStore from "@/store/useLoginSignupStore";
import useRoomStore from "@/store/room/useRoomStore";
import { useState } from "react";

const DashboardNavbar: React.FC = () => {
  const [
    openCreateRoomModal,
    setOpenCreateRoomModal,
  ] = useRoomStore((state) => [
    state.openCreateRoomModal,
    state.setOpenCreateRoomModal,
  ]);

  const [searchValue, setSearchValue] = useState<string>("");

  const loginSignupStore = useLoginSignupStore();
  const authStore = useAuthenticationStore();
  const user = authStore.user;
  const router = useRouter();
  const roomStore = useRoomStore();

  const handleLogout = () => {
    authStore.removeUser();
    roomStore.removeRoom();
    router.push("/");
  };

  const handleUpdateProfileModal = () => {
    loginSignupStore.setIsSignupFlow(true);
  };

  const handleSearch = (value: string) => {
    const search = value;
    setSearchValue(value);
    if ((value = "" && roomStore.rooms)) {
      roomStore.setFilteredRooms(roomStore?.rooms);
    } else {
      const allRooms: any = roomStore.rooms;
      // Filter rooms based on roomName containing the provided value
      const rooms = allRooms.filter((room: any) =>
        room.roomName.toLowerCase().includes(search.toLowerCase())
      );
      // Set the filtered rooms in your store or state
      roomStore.setFilteredRooms(rooms);
    }
  };

  return (
    <div className="bg-lightGrey container flex w-full items-center justify-between py-4">
      <div className="lg:hidden">
        <MobileSidebar />
      </div>

      <Dropdown placement="bottom-start">
        <DropdownTrigger className="mr-6 cursor-pointer rounded-lg bg-borderColor px-4 py-2.5">
          <div className="flex items-center gap-2">
            Following <ChevronDown size={20} />
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Following Actions" variant="faded">
          <DropdownItem key="latest">
            <div className="flex w-full items-center gap-3">
              <History />
              Latest
            </div>
          </DropdownItem>
          <DropdownItem key="following">
            <div className="flex w-full items-center gap-3">
              <UserCheck />
              Following
            </div>
          </DropdownItem>
          <DropdownItem key="trending">
            <div className="flex w-full items-center gap-3">
              <TrendingUp />
              Trending
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <div className="flex w-full items-center rounded-xl bg-borderColor">
        <Input
          radius={"lg"}
          type="text"
          classNames={{
            inputWrapper: ["h-11", "bg-input-100"],
            mainWrapper: ["bg-[#1F2232]", "rounded-xl"],
          }}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search rooms"
          labelPlacement="outside"
          startContent={
            <SearchIcon className="pointer-events-none ml-2 mr-4 flex-shrink-0 text-2xl text-default-400" />
          }
        />
      </div>

      <div className="mx-3 flex items-center space-x-3 md:mx-6">
        <Tooltip content="Feature Coming Soon">
          <Button isIconOnly className="h-fit rounded-full bg-borderColor p-2">
            <Bell size={25} className="text-gray-600 dark:text-white" />
          </Button>
        </Tooltip>

        <Tooltip content="Feature Coming Soon">
          <Button isIconOnly className="h-fit rounded-full bg-borderColor p-2">
            <MessageCircle
              size={25}
              className="text-gray-600 dark:text-white"
            />
          </Button>
        </Tooltip>

        <Button
          isIconOnly
          className="h-fit rounded-full bg-borderColor p-2"
          onClick={setOpenCreateRoomModal}
        >
          <PlusCircle size={25} className="text-gray-600 dark:text-white" />
        </Button>
      </div>

      <Dropdown placement="bottom-start">
        <DropdownTrigger className="border-b-2 border-borderColor rounded-md cursor-pointer">
          <div className="flex items-center justify-start gap-2 bg-borderColor px-2 py-1">
            {user?.profilePhoto !== "" ? (
              <Avatar src={user?.profilePhoto} size="sm" />
            ) : (
              <Avatar name={user?.name} color="secondary" />
            )}
            <h1 className="text-base font-medium text-gray-600 dark:text-white">
              {user?.name}
            </h1>
          </div>
        </DropdownTrigger>

        <DropdownMenu aria-label="User Actions" variant="faded">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@{user?.userName}</p>
          </DropdownItem>
          <DropdownItem key="update_profile" onClick={handleUpdateProfileModal}>
            Update Profile
          </DropdownItem>
          {/* <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
          <DropdownItem key="logout" color="danger" onClick={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* Logo  */}
    </div>
  );
};

export default DashboardNavbar;
