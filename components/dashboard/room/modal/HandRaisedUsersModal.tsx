import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Checkbox,
  Input,
  RadioGroup,
  Radio,
  Divider,
  User,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { RoomFactory } from "@/repository/RoomRepository";
import useRoomStore from "@/store/room/useRoomStore";
import { useQuery } from "@tanstack/react-query";
import { Check, SearchIcon, X } from "lucide-react";

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

export default function HandRaisedUsersModal(props: any) {
  const roomStore = useRoomStore();
  const { isOpen, onOpenChange } = props;

  const [page, setPage] = useState<Number>(0);
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [selectCoHost, setSelectedCohost] = useState<any>({});

  const getPermissions = (participant: any) => {
    const permissions = {
      ...optionsToPermissionsMap[selectedOptions[participant]],
      isCohost: selectCoHost[participant],
    };
    return permissions;
  };

  const handleRadioChange = (participant: any, value: any) => {
    setSelectedOptions((prevSelectedOptions: any) => ({
      ...prevSelectedOptions,
      [participant]: value,
    }));
  };

  const handleCoHostChange = (participant: any, checked: any) => {
    setSelectedCohost((prevSelectCoHost: any) => ({
      ...prevSelectCoHost,
      [participant]: !prevSelectCoHost[participant], // Toggle the value
    }));
  };

  const getHandRaisedParticipants = async () => {
    const room_id = roomStore.room?.id;
    const result = await RoomFactory.getInstance().getHandRaises({
      room_id,
      page,
    });
    return result.handRaisedUsers;
  };

  //Hand Raised Participants
  const {
    isSuccess,
    isError,
    error,
    data: handRaisedParticipants,
    isLoading,
    refetch,
  } = useQuery<any, Error>(
    ["handRaisedParticipants"],
    () => getHandRaisedParticipants(),
    { staleTime: 50000, retry: 1 }
  );

  const getUsername = (username: string) => {
    return `@${username}`;
  };

  const givePermission = async (participant: any) => {
    const userId = participant.userId._id;
    const room_id = roomStore.room?.id;

    const body = {
      participantId: userId,
      permissions: getPermissions(participant),
      room_id: room_id,
    };

    await RoomFactory.getInstance().updatePermissions(room_id, body);
    refetch();
    onOpenChange(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-sm">
                Hand Raised Requests
              </ModalHeader>
              <ModalBody>
                <Input
                  radius={"lg"}
                  variant="bordered"
                  type="text"
                  classNames={{
                    inputWrapper: ["h-11", "bg-input-100"],
                  }}
                  placeholder="Search users"
                  labelPlacement="outside"
                  startContent={
                    <SearchIcon className="pointer-events-none  mr-2 flex-shrink-0 text-2xl text-default-400" />
                  }
                />
                {handRaisedParticipants?.map((participant: any) => (
                  <div>
                    <Accordion
                      selectionMode="multiple"
                      variant="splitted"
                      fullWidth
                    >
                      <AccordionItem
                        key="1"
                        startContent={
                          <div className="flex justify-between">
                            <User
                              name={participant.userId.name}
                              description={getUsername(
                                participant.userId.username
                              )}
                              avatarProps={{
                                src:participant.userId.profile_photo,
                              }}
                            />
                            <div className="flex justify-between space-x-5 ml-24 mt-2">
                              <div className="rounded-full bg-white p-1 h-6">
                                <X className="text-2xl text-default-400 pointer-events-none flex-shrink-0 h-4 w-4 z-40" />
                              </div>
                              {!selectedOptions[participant] ? (
                                <div className="rounded-full bg-[grey] p-1 h-6">
                                  <Check
                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0 h-4 w-4"
                                    color="black"
                                  />
                                </div>
                              ) : (
                                <div
                                  className="rounded-full bg-[#4776E7] p-1 h-6"
                                  onClick={() => givePermission(participant)}
                                >
                                  <Check
                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0 h-4 w-4"
                                    color="black"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        }
                      >
                        <RadioGroup
                          color="success"
                          value={selectedOptions[participant] || ""}
                          onValueChange={(value) =>
                            handleRadioChange(participant, value)
                          }
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
                        <Divider className="my-4" />
                        <Checkbox
                          size="sm"
                          color="success"
                          defaultChecked={selectCoHost[participant]}
                          onChange={(checked) =>
                            handleCoHostChange(participant, checked)
                          }
                        >
                          Make Co-host
                        </Checkbox>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
