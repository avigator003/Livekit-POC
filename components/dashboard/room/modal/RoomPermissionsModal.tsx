import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  RadioGroup,
  Radio,
  Divider,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { RoomFactory } from "@/repository/RoomRepository";
import useRoomStore from "@/store/room/useRoomStore";
import { useRemoteParticipants } from "@livekit/components-react";

export default function PermissionModal(props: any) {
  const roomStore = useRoomStore();
  const { isOpen, onOpenChange, userId } = props;
  console.log("isopen",isOpen)
   
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isCoHost, setIsCoHost] = useState<boolean>(false);
  const remoteParticipants =useRemoteParticipants();

  const optionsToPermissionsMap: any = {
    audio: {
      isSpeaker: true,
      isVideoOn: false,
      isPresenter: false,
    },
    audioVideo: {
      isSpeaker: true,
      isVideoOn: true,
      isPresenter: false,
    },
    audioVideoAndScreen: {
      isSpeaker: true,
      isVideoOn: true,
      isPresenter: true,
    },
  };

  const getPermissions = () => {
    const permissions = {
      ...optionsToPermissionsMap[selectedOption],
      isCohost: isCoHost,
    };
    return permissions;
  };

  const givePermission = async () => {
    const room_id = roomStore.room?.id;

    const body = {
      participantId: userId,
      permissions: getPermissions(),
      room_id: room_id,
    };

    // console.log("sjsnjfjsnfj",body)
    const result= await RoomFactory.getInstance().updatePermissions(room_id, body);
        // participant?.setPermissions({
        //         canPublish:
        //           data.permissions.isSpeaker ||
        //           data.permissions.isVideoOn ||
        //           data.permissions.isPresenter,
        //         canSubscribe: true,
        //         canPublishData: true,
        //       });
    onOpenChange(false);
  };

  const setUserPermission = () => {
    remoteParticipants.forEach((participant) => {
      // if (participant) {
      //   if (participant?.identity === data.identity) {
      //     participant?.setPermissions({
      //       canPublish:
      //         data.permissions.isSpeaker ||
      //         data.permissions.isVideoOn ||
      //         data.permissions.isPresenter,
      //       canSubscribe: true,
      //       canPublishData: true,
      //     });
      //   }
      // }
    });
  }

  const handleRadioChange = (value: any) => {
    setSelectedOption(value);
  };

  const handleCoHostChange = () => {
    setIsCoHost(!isCoHost);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-sm">
                Permissions
              </ModalHeader>
              <ModalBody>
                <RadioGroup
                  color="success"
                  value={selectedOption}
                  onValueChange={handleRadioChange}
                >
                  <Radio
                    value="audio"
                    classNames={{
                      base: cn("mb-1"),
                    }}
                    size="sm"
                  >
                    Audio Only
                  </Radio>
                  <Radio
                    value="audioVideo"
                    classNames={{
                      base: cn("mb-1"),
                    }}
                    size="sm"
                  >
                    Audio and Video
                  </Radio>
                  <Radio value="audioVideoAndScreen" size="sm">
                    Audio , Video and Share Screen
                  </Radio>
                </RadioGroup>
                <Divider className="mt-2" />

                <Checkbox
                  size="md"
                  color="success"
                  onChange={handleCoHostChange}
                >
                  Make Co-host
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  fullWidth
                  size="lg"
                  className="text-sm bg-faceBlue"
                  onPress={givePermission}
                >
                  Update Permission
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
