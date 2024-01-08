"use client";
import React, { useEffect } from "react";
import useRoomStore from "@/store/room/useRoomStore";
import { useLocalParticipant } from "@livekit/components-react";
import HandRaisedUsersModal from "../modal/HandRaisedUsersModal";
import BlockedUsersModal from "../modal/BlockedUsersModal";
import CustomRoomBroadcastingModal from "../modal/CustomRoomBroadcastingModal";
import ImagePicker from "../RoomImagesPicker";
import ShadowModal from "@/components/custom-ui/modal/ShadowModal";
import DesktopRoomFooter from "./DesktopRoomFooter";
import MobileRoomFooter from "./MobileRoomFooter";

function RoomFooter() {
  const roomStore = useRoomStore();
  const { isScreenShareEnabled } = useLocalParticipant();

  const [handRaisedDialogOpen, setHandRaisedDialogOpen] = React.useState(false);
  const [blockedUserDialogOpen, setBlockedUserDialogOpen] = React.useState(
    false
  );
  const [egressDialogOpen, setEgressDialogOpen] = React.useState(false);
  const [imageUploadModal, setImageUploadModal] = React.useState(false);

  const [vw, setVw] = React.useState(window.innerWidth);

  const handleHandRaisedParticipantsDialogOpenChange = (value: boolean) => {
    setHandRaisedDialogOpen(value);
  };

  const handleBlockedUsersDialogOpenChange = (value: boolean) => {
    setBlockedUserDialogOpen(value);
  };

  const handleEgress = (value: boolean) => {
    setEgressDialogOpen(value);
  };

  const handleImageUpload = () => {
    setImageUploadModal(!imageUploadModal);
  };

  useEffect(() => {
    roomStore.setIsScreenSharing(isScreenShareEnabled);
  }, [isScreenShareEnabled]);

  useEffect(() => {
    window.addEventListener("resize", () => setVw(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setVw(window.innerWidth));
  }, []);

  return (
    <>
      <HandRaisedUsersModal
        isOpen={handRaisedDialogOpen}
        onOpenChange={handleHandRaisedParticipantsDialogOpenChange}
      />
      <BlockedUsersModal
        isOpen={blockedUserDialogOpen}
        onOpenChange={handleBlockedUsersDialogOpenChange}
      />
      <ShadowModal
        body={<ImagePicker />}
        isOpen={imageUploadModal}
        onClose={handleImageUpload}
      />
      <CustomRoomBroadcastingModal
        isOpen={egressDialogOpen}
        onOpenChange={handleEgress}
      />

      {vw > 1024 ? (
        <DesktopRoomFooter
          handleImageUpload={handleImageUpload}
          handleBlockedUsersDialogOpenChange={
            handleBlockedUsersDialogOpenChange
          }
          handleEgress={handleEgress}
          handleHandRaisedParticipantsDialogOpenChange={
            handleHandRaisedParticipantsDialogOpenChange
          }
        />
      ) : (
        <MobileRoomFooter
          handleImageUpload={handleImageUpload}
          handleBlockedUsersDialogOpenChange={
            handleBlockedUsersDialogOpenChange
          }
          handleEgress={handleEgress}
          handleHandRaisedParticipantsDialogOpenChange={
            handleHandRaisedParticipantsDialogOpenChange
          }
        />
      )}
    </>
  );
}

export default RoomFooter;
