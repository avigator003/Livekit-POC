"use client";

import RoomAd from "@/components/dashboard/room/RoomAd";
import RoomChat from "@/components/dashboard/room/RoomChat";
import RoomFooter from "@/components/dashboard/room/footer/RoomFooter";
import RoomHeader from "@/components/dashboard/room/RoomHeader";
import RoomUsers from "@/components/dashboard/room/users/RoomUsers";

const MobileRoomUi: React.FC = () => {
  return (
    <div className="px-2 lg:hidden">
      <div>
        <div className="flex flex-col">
          <RoomHeader />
        </div>
        {/* <Divider className="my-2" /> */}
        <div className="flex h-fit w-full flex-col">
          <RoomUsers />
        </div>
         <RoomFooter />
      </div>

      <div className="flex-col space-y-4 lg:mr-10 lg:space-y-10">
        <div className="hidden h-auto flex-col lg:flex">
          <RoomAd />
        </div>
        <div className="flex h-auto w-full flex-col">
          <RoomChat />
        </div>
      </div>
    </div>
  );
};

export default MobileRoomUi;
