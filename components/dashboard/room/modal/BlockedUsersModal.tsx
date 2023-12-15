import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Divider,
  User,
} from "@nextui-org/react";
import { RoomFactory } from "@/repository/RoomRepository";
import useRoomStore from "@/store/room/useRoomStore";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";

export default function BlockedUsersModal(props: any) {
  const roomStore = useRoomStore();
  const { isOpen, onOpenChange } = props;

  const getBlockedUsers = async () => {
    const room_id = roomStore.room?.id || "";
    const result = await RoomFactory.getInstance().getBlockedUsers(room_id);
    return result;
  };

  //Blocked Users
  const { data: blockedUsers } = useQuery<any, Error>(
    ["blockedUsers"],
    () => getBlockedUsers(),
    { staleTime: 50000, retry: 1 }
  );

  return (
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
              Blocked Users
            </ModalHeader>
            <ModalBody>
              <Input
                radius={"lg"}
                variant="bordered"
                type="text"
                classNames={{
                  inputWrapper: ["h-11", "bg-input-100", "mb-3"],
                }}
                placeholder="Search users"
                labelPlacement="outside"
                startContent={
                  <SearchIcon className="pointer-events-none  mr-2 flex-shrink-0 text-2xl text-default-400" />
                }
              />
              <Divider />
              {blockedUsers?.map((participant: any) => (
                <div className="flex justify-between">
                  <User
                    name="Jane Doe"
                    description="Product Designer"
                    avatarProps={{
                      src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                  />
                  <Button color="success">Unblock</Button>
                </div>
              ))}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
