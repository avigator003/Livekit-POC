import {
  EgressData,
  EgressFactory,
} from "@/repository/EgressRepository";
import useRoomStore from "@/store/room/useRoomStore";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const schema = yup.object().shape({
  streamUrl: yup.string().required("Stream URL is required"),
  streamKey: yup.string().required("Stream Key is required"),
});

const defaultValues = {
  streamUrl: "",
  streamKey: "",
};

export interface EgressModalData {
  streamUrl: string;
  streamKey: string;
}

function CustomRoomBroadcastingModal(props: any) {
  const roomId = useRoomStore().room?.id || "";
  const { isOpen, onOpenChange } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [egress, setEgress] = useState<boolean>(false);

  const egressPublish = async (egressModalData: EgressModalData) => {
    const url: string = `${egressModalData.streamUrl}/${egressModalData.streamKey}`;
    const data: EgressData = {
      room_id: roomId,
      urls: [url],
      customBaseUrl: "https://whalesbook.vercel.app/youtube"
    };
    await EgressFactory.getInstance().publishEgress(data);
  };

  const { mutate, isLoading } = useMutation(egressPublish, {
    onSuccess: (response: any) => {
      setEgress(true);
    },
    onError: (err) => {
      toast.error("Unable to broadcast your stream")
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate(data);
  });

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
              Broadcast stream
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-3 space-y-3"
              >
                <Input
                  isRequired
                  {...register("streamKey")}
                  type="text"
                  placeholder="Stream Key"
                  variant="bordered"
                  radius="sm"
                  size="lg"
                  classNames={{
                    input: ["text-sm"],
                    inputWrapper: ["border-1"],
                  }}
                  startContent={
                    <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mr-3" />
                  }
                />
                <Input
                  isRequired
                  {...register("streamUrl")}
                  type="text"
                  placeholder="Stream URL"
                  variant="bordered"
                  radius="sm"
                  size="lg"
                  classNames={{
                    input: ["text-sm"],
                    inputWrapper: ["border-1"],
                  }}
                  startContent={
                    <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mr-3" />
                  }
                />
                <Button
                  type="submit"
                  className="mt-6 w-full rounded-lg bg-faceBlue py-3 text-center text-sm text-white ring-offset-slate-50 hover:bg-faceBlue/90 hover:opacity-90 "
                >
                 Start Streaming
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CustomRoomBroadcastingModal;


